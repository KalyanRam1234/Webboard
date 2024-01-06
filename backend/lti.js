// #################################################################################################
// package imports and object definitions
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const lti = require('ltijs').Provider;
const e_app = express();

const {
  getPdf,
  addPdf,
  getImages,
  sendURL,
} = require('./controllers/boardController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// #################################################################################################

// Global Variable initialisation

let global_ltik, c_id, user_name;
var pdf_name='';

e_app.post("/beforeRefresh",(req,res)=>{
  res.send("Received Page")
});

e_app.get("/afterRefresh",(req,res)=>{
  res.send("Sending Page")
});

// #################################################################################################

// middleware functions

function passCourse_id(req, res, next) {
  req.body.course_id = c_id;
  next();
}

// #################################################################################################

// express app arrtibutes set and routes assigned to functions
e_app.use(express.json());
e_app.use(cors());
e_app.use(bodyParser.urlencoded({ extended: true }));
e_app.use(express.static('public'));

e_app.get('/', (req, res) => {
  res.send('Inside Port 4000.');
});

//e_app routes
e_app.get('/getUserName', (req, res) => {
  res.send({ name: user_name, course_id: c_id , pdf_name: pdf_name});
});

e_app.post('/api/getPdf', getPdf);

e_app.post('/api/getdownload', getImages);

e_app.post('/api/addPdf', [upload.single('file'), passCourse_id], addPdf);

e_app.listen(4000,() => {
  console.log('Listening on port 4000.');
});

// #################################################################################################

// LTI SETUP

lti.setup(
  process.env.LTI_KEY,
  {
    url:
      'mongodb://' +
      process.env.DB_HOST +
      '/' +
      process.env.DB_NAME +
      '?authSource=admin',
  },
  {
    staticPath: path.join(__dirname, './public'), // Path to static files
    cookies: {
      secure: false, // Set secure to true if the testing platform is in a different domain and https is being used
      sameSite: '', // Set sameSite to 'None' if the testing platform is in a different domain and https is being used
    },
    devMode: true, // Set DevMode to true if the testing platform is in a different domain and https is not being used
  }
);

const setup = async () => {
  await lti.deploy({ port: process.env.PORT });

  /**
   * Register platform
   */

  const platform = await lti.registerPlatform({
    url: 'https://'+process.env.MOODLE_IP,
    name: 'https://'+process.env.MOODLE_IP,
    clientId: 'BQua1jKKlYTEEet',
    authenticationEndpoint: 'https://'+process.env.MOODLE_IP+'/mod/lti/auth.php',
    accesstokenEndpoint: 'https://'+process.env.MOODLE_IP+'/mod/lti/token.php',
    authConfig: {
      method: 'JWK_SET',
      key: 'https://'+process.env.MOODLE_IP+'/mod/lti/certs.php',
    },
  });
  console.log('https://'+process.env.MOODLE_IP)
};

setup()

// #################################################################################################

// onConnect FUNCTION and LTI ROUTES

lti.onConnect(async (token, req, res, next) => {
  console.log("Inside on Connect.")
  c_id = token.platformContext.context.id;
  global_ltik = res.locals.ltik;
  user_name=res.locals.token.userInfo.name;
  console.log(c_id)
  return lti.redirect(res, '/dashboard?ltik=' + global_ltik);
  
});

lti.app.get('/dashboard', async (req, res, next) => {
  global_ltik = res.locals.ltik;
  res.redirect('http://' + process.env.HOST_IP +  ':3000/');
});

// #################################################################################################

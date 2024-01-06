const multer= require('multer');

const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

// const upload= multer({dest: "public/uploads/"})
const upload= multer({storage:storage});
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
app.get("/", function(req,res){
    // res.send("Hi, I am awesome");
    res.sendFile(__dirname + "/signup.html");
})
app.post("/",upload.single('file') ,(req,res)=>{

    console.log(req.file);
}
)

import './App.css';
import {React, useEffect,useState,useRef} from 'react';
import Canvas from './CanvasComponents/Canvas';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store';
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom';
const baseURL = "http://172.16.140.214:4000";

function Navigation(props){
  var pdf_name=window.location.href;
  var courseindex=pdf_name.indexOf("course_id=");
  var pdfindex=pdf_name.indexOf("pdf_name=");
  var emp=pdf_name.indexOf("&");
  if(courseindex!=-1 && pdfindex!=-1){
    var courseid=pdf_name.substring(courseindex+10,emp);
    if(courseid!=null && courseid!="null"){
      sessionStorage.setItem("course_id", courseid);
      var pdfname=pdf_name.substring(pdfindex+9);
      if(pdfname!=null && pdfname!=undefined && pdfname!=""){
        sessionStorage.setItem("pdf_name",pdfname);
      }
    }
  }
  return(
    <div>
        <Navigate to={"/course_id="+props.courseId+`&pdf_name=${props.pdf_name}`} replace />
    </div>
  )
}
function App(props){
  const [Userdata, setUserdata] = useState(null);
  const [courseId,changeCourseID] = useState(null);
  const [pdf_name, setPdf]=useState(" ");
  const [name,changeName] = useState(null);
  const firstUpdate = useRef(true);
  // const [path,setPath]=useState("/");
  const defined=(check) =>{
    return check!=null && check!=undefined && check!="" || check!=" ";
  }
  const getdata = async () =>{
    // console.log("Inside getData")
    const data = await axios.get(baseURL+"/getUserName");
    setUserdata(data.data);
    if(sessionStorage.getItem("course_id")!=null){

      changeCourseID(sessionStorage.getItem("course_id"));
    }
    else{
      console.log("Hi")
      changeCourseID(data.data.course_id)
    }


  }
  useEffect(()=>{
    if(firstUpdate.current){
      getdata();
      firstUpdate.current=false;
    }
    
  },[courseId,pdf_name])
  
  return(
    <>
     <Provider store={store}>
      <BrowserRouter >
        <Routes>
          <Route path={"/course_id="+courseId+`&pdf_name=${pdf_name}`} element={<Canvas url={baseURL} data={Userdata} setPdf={setPdf} pdf_name={pdf_name} course_id={courseId}/>} />
          <Route path="/error" element={<div>The board doesn't exist</div>}/>
          <Route path="*" element={<Navigation courseId={courseId} pdf_name={pdf_name} />}/>
        </Routes>
        </BrowserRouter>
      </Provider>
      
      </>
  )
}

export default App;

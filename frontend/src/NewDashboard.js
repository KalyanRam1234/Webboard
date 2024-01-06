import Sidebar from "./NewDashboard/Sidebar"
import Navbar from "./NewDashboard/Navbar"
import React from "react"
import { Link } from "react-router-dom";
export default function NewDashboard(props){
    
    const courses=[{id: 1, title: "Discrete Maths", Date: "15 Nov, 2022"},{id: 1, title: "Number Theory", Date: "15 Nov, 2022"},{id: 1, title: "Class 1", Date: "15 Nov, 2022"},{id: 1, title: "Class 1", Date: "15 Nov, 2022"},{id: 1, title: "Class 1", Date: "15 Nov, 2022"},{id: 1, title: "Class 1", Date: "15 Nov, 2022"},{id: 1, title: "Class 1", Date: "15 Nov, 2022"},{id: 1, title: "Class 1", Date: "15 Nov, 2022"},{id: 1, title: "Class 1", Date: "15 Nov, 2022"},{id: 1, title: "Class 1", Date: "15 Nov, 2022"},{id: 1, title: "Class 1", Date: "15 Nov, 2022"},{id: 1, title: "Class 1", Date: "12 Feb, 2023"},{id: 1, title: "Class 1", Date: "15 Nov, 2022"},]

    const coursescard=[{id: 1, title: "Term I [2022-23]", course: "T1-22-23 -CS 201 / Physics"}, {id: 1, title: "Term I [2022-23]", course: "T1-22-23 -CS 201 / Physics"},{id: 1, title: "Term I [2022-23]", course: "T1-22-23 -CS 201 / Physics"},{id: 1, title: "Term I [2022-23]", course: "T1-22-23 -CS 201 / Physics"},{id: 1, title: "Term I [2022-23]", course: "T1-22-23 -CS 201 / Physics"},{id: 1, title: "Term I [2022-23]", course: "T1-22-23 -CS 201 / Physics"},{id: 1, title: "Term I [2022-23]", course: "T1-22-23 -CS 201 / Physics"},{id: 1, title: "Term I [2022-23]", course: "T1-22-23 -CS 201 / Physics"},{id: 1, title: "Term I [2022-23]", course: "T1-22-23 -CS 201 / Physics"},{id: 1, title: "Term I [2022-23]", course: "T1-22-23 -CS 201 / Physics"},{id: 1, title: "Term I [2022-23]", course: "T1-22-23 -CS 201 / Physics"},{id: 1, title: "Term I [2022-23]", course: "T1-22-23 -CS 201 / Physics"},{id: 1, title: "Term I [2022-23]", course: "T1-22-23 -CS 201 / Physics"},]

    const [toggler, setToggler]= React.useState(false);
    const [page1, setPage1]= React.useState(false);
    return (
        <div className="NewDashboard">
                <Sidebar toggler={toggler} setToggler={setToggler} page1={page1} setPage1={setPage1}/>  
                
            <div className="Maincontent">
                <div className="Options">

                </div>
                    <Navbar toggler={toggler}/>
                    <div className="container-fluid">
                        
                        <div className="Recent Nodisplay">{page1? "Courses": "Recent Boards" }</div>
                        <div className="adjust">
                        {/* <div className="newcoursecard">
                                        
                                        </div> */}
                            {page1? <div className="row" style={{"marginLeft": "50px" , "marginRight": "50px"}}>
                                {coursescard.map((p)=>{
                                return(
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-12 newcoursecard">
                                        <div className="courseimg1">
                                            <img src="/images/ooshit.png" className="imgadj"></img>
                                        </div>
                                        <div className="details"> 
                                            <div className="detailtitle">{p.title}</div>
                                            <div className="detaildate">{p.course} </div>
                                        </div>
                                    </div>
                                )
                            })}  
                              </div>  : 
                              <div>
                            <div className="Nodisplay"> 
                                <div className="coursecard">
                                    <Link to={`/canvas`}><img src='/images/plus.png' alt='add board' className="plus"></img></Link>
                                </div>
                                <div>
                                        {courses.map((p)=>{
                                        return(
                                            <div className="coursecard">
                                                <div className="courseimg">
                                                    <img src="/images/pdf.png" className="imgadj"></img>
                                                </div>
                                                <div className="details"> 
                                                    <div className="detailtitle">{p.title}</div>
                                                    <div className="detaildate">{p.Date} </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="Yesdisplay">
                                <div className="Smallscreen">
                                    {page1? "Courses": "DASHBOARD" }
                                    <hr className="line"></hr>
                                    </div>
                            
                            <div id="carouselExampleControls" className="carousel slide editcarousel" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="NewAdj">Recent Boards</div>
                                    <div className="carousel-item active">
                                    {/* <img src="/images/Pink.png" class="d-block w-100" alt="..."/> */}
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="coursecard d-block">
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="coursecard d-block">
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="coursecard d-block">
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="carousel-item ">
                                    {/* <img src="/images/Pink.png" class="d-block w-100" alt="..."/> */}
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="coursecard d-block">
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="coursecard d-block">
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="coursecard d-block">
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <button className="carousel-control-next adjcarousel" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev"  style={{"marginRight": "35px"}}>
                                    <span className="carousel-control-prev-icon iconadj" aria-hidden="true" ></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next adjcarousel" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" style={{"opacity": "1"}}>
                                    <span className="carousel-control-next-icon iconadj" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                                </div>

                                <div className="row" style={{"marginTop": "40px"}}>
                                    
                                        {courses.map((p)=>{
                                        return(
                                            <div className="col-4" >
                                            <div className="coursecard" style={{"marginLeft": "8px",}}>
                                                {/* <div className="courseimg">
                                                    <img src="/images/pdf.png" className="imgadj"></img>
                                                </div>
                                                <div className="details"> 
                                                    <div className="detailtitle">{p.title}</div>
                                                    <div className="detaildate">{p.Date} </div>
                                                </div> */}
                                            </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                
                            </div>
                            </div>
                        }
                        
                        </div>
                    </div>
            </div>       
        </div>
    )
}
import React from "react"
function NewSidebar(props){
    return(
        
        <div className="NewNavbar1">
            <div className="Toggler" onClick={()=>{
                props.setToggler(false);
            }}>
                    <img src='/images/toggle.png' alt="toggle" style={{"marginTop":"30px"}}></img>
                </div>
                <div className="sideelem">
                    <div className="Others1" style={{"marginTop": "30px"}} onClick={()=>{
                        props.setPage1(false);
                    }}>
                        <span><img src='/images/Dashboard.png' alt='dashboard' style={{"marginTop": "-10px"}}></img></span><span className="info">Dashboard</span>
                    </div>
                    <div className="Others1" onClick={()=>{
                        props.setPage1(true);
                    }}>
                        <span><img src='/images/Course.png' alt='courses' style={{"marginTop": "-10px"}}></img></span><span className="info">Courses</span>
                    </div>
                    <div className="Other1">
                        <span><img src='/images/Settings.png' alt='settings' style={{"marginTop": "-10px"}}></img></span><span className="info">Settings</span>
                        {/* <span className="info">Settings</span> */}
                    </div>
                </div>
        </div>
    )
}

export default function Sidebar(props){
    return (
        <div>
        <div className="Nodisplay">
            {props.toggler ? <NewSidebar setToggler={props.setToggler} setPage1={props.setPage1}/> : <div>
            <div className="NewNavbar">
                <div className="Toggler" onClick={()=>{
                    props.setToggler(true);
                }}>
                    <img src='/images/toggle.png' alt="toggle" style={{"marginTop":"30px"}}></img>
                </div>
                <div className="sideelem">
                    <div className="Others" style={{"marginTop": "30px"}} onClick={()=>{
                        props.setPage1(false);
                    }}>
                        <img src='/images/Dashboard.png' alt='dashboard'></img>
                    </div>
                    <div className="Others" onClick={()=>{
                        props.setPage1(true);
                    }}>
                        <img src='/images/Course.png' alt='courses'></img>
                    </div>
                    <div className="Other">
                        <img src='/images/Settings.png' alt="settings"></img>
                    </div>
                </div>
            </div>
        </div>}
        </div>
        </div>
    )
}
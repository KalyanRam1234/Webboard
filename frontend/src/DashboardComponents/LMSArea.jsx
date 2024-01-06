import LMSCourse from "./LMSCourse";

function LMSArea(props){
    return (
            <div className="LMSArea border-gradient">
 
                <div className="LMSArea-Path">
                    <a>{props.path}</a>
                </div>
                
                <div className="LMSArea-Title">
                    <a>{props.title}</a>
                </div>
                
                {props.state==="Courses" && 
                
                    (props.courses).map((course,index) => (
                        <div style={{display:"inline-block","margin":"15px 0px 0px 50px"}}>
                            <LMSCourse
                                key={index}
                                classname={"LMSCourse-"+course.colour}
                                term="Term I [2022-2023]"
                                coursename="T1-22-23-SM203 / Physics"
                            />
                        </div>
                    ))
                
                }
            </div>
        
    )
}

export default LMSArea;
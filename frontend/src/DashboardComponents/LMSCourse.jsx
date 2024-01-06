function LMSCourse(props){
    
    const TermTextStyle={
        "width": "73px",
        "height": "12px",
        "fontFamily": 'Roboto',
        "fontStyle": "normal",
        "fontWeight": "400",
        "fontSize": "10px",
        "lineHeight": "12px",
        "color": "#575757"
    }
    
    const CourseTextStyle={
        "width": "221px",
        "height": "15px",
        "left": "501px",
        "top": "697px",
        "fontFamily": 'Roboto',
        "fontStyle": "normal",
        "fontWeight": "400",
        "fontSize": "12px",
        "lineHeight": "14px",
        "color": "#000000"
    }
    
    return(
        <div className="border-gradient" onClick={()=>{
            console.log("Div");
        }}>
            <div className={props.classname}>
                <div className="courseName">
                    <div style={{height: 12}}>
                    <a style={TermTextStyle}>{props.term}</a>
                    </div>
                    {/* <br></br> */}
                    <div style={{paddingTop: 5}}>
                    <a style={CourseTextStyle}>{props.coursename}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LMSCourse;
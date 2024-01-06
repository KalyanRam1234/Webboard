export default function SideBarText(props){
    return (
        <div>
            <a className="Dashboard-text" onClick={(event) => {
                event.preventDefault();
                props.change_dashboard_state("Dashboard");
                props.change_lms_path("Dashboard/");
                props.change_lms_title("Dashboard");
            }}>Dashboard</a>
            
            <a className="Courses-text" onClick={(event) => {
                event.preventDefault();
                props.change_dashboard_state("Courses");
                props.change_lms_path("Dashboard/Courses");
                props.change_lms_title("Courses");
            }}>Courses</a>
            
            <a className="Tasks-text" onClick={(event) => {
                event.preventDefault();
                props.change_dashboard_state("Tasks");
            }}>Tasks</a>
            
            <a className="Time-manager-text" onClick={(event) => {
                event.preventDefault();
                props.change_dashboard_state("Time");
            }}>Time manager</a>
            
            <a className="Settings-text" onClick={(event) => {
                event.preventDefault();
                props.change_dashboard_state("Settings");
            }}>Settings</a>
        </div>
    );
}
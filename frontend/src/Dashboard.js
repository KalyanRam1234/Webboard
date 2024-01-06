import Sidebar from "./DashboardComponents/Sidebar";
import SearchField from "./DashboardComponents/SearchField";
import LMSArea from "./DashboardComponents/LMSArea";
import TopRight from "./DashboardComponents/TopRight";
import SidebarText from "./DashboardComponents/SidebarText";
import React from "react";
function Dashboard() {

  const [dashboard_state,change_dashboard_state] = React.useState("Dashboard");
  const [lms_path,change_lms_path] = React.useState("Dashboard/");
  const [lms_title,change_lms_title] = React.useState("Dashboard");

  const courses=[
    {colour:"pink"},{colour:"purple"},{colour:"purple"},{colour:"orange"},
    {colour:"pink"},{colour:"purple"},{colour:"purple"},{colour:"orange"},
    {colour:"pink"},{colour:"purple"},{colour:"purple"},{colour:"orange"}
  ];

  return (
      <div className="Dashboard">
        <TopRight name="Mayank" designation="Professor"/>
        <Sidebar/>
        <SearchField/>  {/* SearchField component will display all the recent boards */}
        <LMSArea path={lms_path} title={lms_title} courses={courses} state={dashboard_state}/>
        <SidebarText change_dashboard_state={change_dashboard_state} change_lms_path={change_lms_path} change_lms_title={change_lms_title}/>
      </div>
  );
}

export default Dashboard;

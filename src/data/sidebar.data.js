import { HiHome } from "react-icons/hi";
import { GoProjectRoadmap } from "react-icons/go";
import { LuGraduationCap } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { SiHyperskill } from "react-icons/si";
import OverviewPage from "../pages/dashboardPages/overview/Overview";
import ViewProjectsPage from "../pages/dashboardPages/projects/viewProjects/ViewProjects";
import ViewQualificationsPage from "../pages/dashboardPages/qualifications/viewQualifications/ViewQualifications";
import TestimonialsPage from "../pages/dashboardPages/testimonials/Testimonials";
import ViewSkillsPage from "../pages/dashboardPages/skills/viewSkills/ViewSkills";
import ProfilePage from "../pages/dashboardPages/profile/Profile";
import { RiProfileLine } from "react-icons/ri";
import { AiOutlineDisconnect } from "react-icons/ai";
import WebApisPage from "../pages/dashboardPages/webApis/WebApis";



const sidebarData = [
    { title: "Home", icon: <HiHome />, link: "/overview", component: OverviewPage },
    { title: "Projects", icon: <GoProjectRoadmap />, link: "/projects", component: ViewProjectsPage },
    { title: "Qualifications", icon: <LuGraduationCap />, link: "/qualifications", component: ViewQualificationsPage },
    { title: "Testimonials", icon: <FaRegUser />, link: "/testimonials", component: TestimonialsPage },
    { title: "Skills", icon: <SiHyperskill />, link: "/skills", component: ViewSkillsPage },
    { title: "Profile", icon: <RiProfileLine  />, link: "/profile", component: ProfilePage },
    { title: "Web APIs", icon: <AiOutlineDisconnect   />, link: "/webapi", component: WebApisPage },
];

export default sidebarData;

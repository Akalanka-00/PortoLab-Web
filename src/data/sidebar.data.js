import { HiHome } from "react-icons/hi";
import { GoProjectRoadmap } from "react-icons/go";
import { LuGraduationCap } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { SiHyperskill } from "react-icons/si";
import OverviewPage from "../pages/dashboardPages/overview/Overview";
import ProjectsPage from "../pages/dashboardPages/projects/Projects";



const sidebarData = [
    { title: "Home", icon: <HiHome />, link: "/", component: OverviewPage },
    { title: "Projects", icon: <GoProjectRoadmap />, link: "/projects", component: ProjectsPage },
    // { title: "Qualifications", icon: <LuGraduationCap />, link: "/qualifications", component: QualificationsPage },
    // { title: "Testimonials", icon: <FaRegUser />, link: "/testimonials", component: TestimonialsPage },
    // { title: "Skills", icon: <SiHyperskill />, link: "/skills", component: SkillsPage },
];

export default sidebarData;

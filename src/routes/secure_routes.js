import { Route } from "react-router-dom";
import OverviewPage from "../pages/dashboardPages/overview/Overview";
import DashboardPage from "../pages/dashboard/Dashboard";
import { AuthorizeAdmin } from "../middleware/Auth";
import sidebarData from "../data/sidebar.data";
import CreateProjectPage from "../pages/dashboardPages/projects/createProjects/CreateProject";

function SecureRoutes() {

  const sidebarRoutes = sidebarData
    .filter(data => data.link !== "/")
    .map(data => ({
      ...data,
      link: data.link.startsWith("/") ? data.link.slice(1) : data.link,
    }));

  return (
    <>
      <Route path="/dashboard/*" element={<AuthorizeAdmin><DashboardPage /></AuthorizeAdmin>} >
        <Route index element={<OverviewPage />} />

        {sidebarRoutes.map(({ link, component: Component }) => (
          <Route key={link} path={link} element={<Component />} />
        ))}

        <Route  path="projects/new" element={<CreateProjectPage />} />


      </Route>
    </>
  );
}

export default SecureRoutes;

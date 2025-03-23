import { Route } from "react-router-dom";
import OverviewPage from "../pages/dashboardPages/overview/Overview";
import DashboardPage from "../pages/dashboard/Dashboard";
import { AuthorizeAdmin } from "../middleware/Auth";
import sidebarData from "../data/sidebar.data";
import CreateProjectPage from "../pages/dashboardPages/projects/createProjects/CreateProject";
import CreateEducationQualificationPage from "../pages/dashboardPages/qualifications/createEducationQualification/CreateEducationQualification";
import CreateWorkExperiencePage from "../pages/dashboardPages/qualifications/createWorkExperience/CreateWorkExperience";
import CreateSkillPage from "../pages/dashboardPages/skills/createSkill/CreateSkill";
import SettingsPage from "../pages/dashboardPages/webApis/WebApis";

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

        <Route path="projects/new" element={<CreateProjectPage />} />
        <Route path="projects/edit/:id" element={<CreateProjectPage />} />
        <Route path="projects/view/:id" element={<CreateProjectPage />} />

        <Route path="qualifications/education/new" element={<CreateEducationQualificationPage />} />
        <Route path="qualifications/education/edit/:id" element={<CreateEducationQualificationPage />} />
        <Route path="qualifications/education/view/:id" element={<CreateEducationQualificationPage />} />

        <Route path="qualifications/work/new" element={<CreateWorkExperiencePage />} />
        <Route path="qualifications/work/edit/:id" element={<CreateWorkExperiencePage />} />
        <Route path="qualifications/work/view/:id" element={<CreateWorkExperiencePage />} />

        <Route path="skills/new" element={<CreateSkillPage />} />

        <Route path="settings" element={<SettingsPage />} />

      </Route>
    </>
  );
}

export default SecureRoutes;

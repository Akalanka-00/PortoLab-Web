import { Navigate, Route } from "react-router-dom";

import { AuthorizeLogin } from "../middleware/Auth";
import HomePage from "../pages/home/Home";
import AuthPage from "../pages/auth/Auth";
import DocumentationPage from "../pages/documentation/Documentation";
import IntroductionPage from "../pages/documentation/documentationPages/generalPages/introduction/Introduction";
import SetupPage from "../pages/documentation/documentationPages/generalPages/setup/Setup";
import ApiPage from "../pages/documentation/documentationPages/api/Api";


function PublicRoutes() {
    return (
        <>
            <Route path="/" element={<HomePage />} />

            <Route path="/login" element={<AuthorizeLogin><AuthPage /></AuthorizeLogin>} />
            <Route path="/register" element={<AuthorizeLogin><AuthPage /></AuthorizeLogin>} />

            <Route path="/documentation" element={<Navigate to="/documentation/general" replace />} />
            <Route path="/documentation/general/*" element={<DocumentationPage />} >
                <Route index element={<IntroductionPage />} />
                <Route path="setup" element={<SetupPage />} />
            </Route>
            <Route path="/documentation/api/:name" element={<DocumentationPage />}>
                <Route index element={<ApiPage />} />
            </Route>
        </>
    );
}

export default PublicRoutes;

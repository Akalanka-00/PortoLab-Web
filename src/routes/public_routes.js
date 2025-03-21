import { Route } from "react-router-dom";

import { AuthorizeLogin } from "../middleware/Auth";
import HomePage from "../pages/home/Home";
import LoginPage from "../pages/auth/login/Login";
import RegisterPage from "../pages/auth/registration/Register";
import ApidocPage from "../pages/api/Apidoc";


function PublicRoutes() {
    return (
        <>
            <Route path="/" element={<HomePage />} />
            <Route path="/api" element={<ApidocPage />} />
            
            <Route path="/login" element={<AuthorizeLogin><LoginPage /></AuthorizeLogin>} />
            <Route path="/register" element={<AuthorizeLogin><RegisterPage /></AuthorizeLogin>} />
            <Route path="/apidoc" element={<ApidocPage />} />

            </>
    );
}

export default PublicRoutes;

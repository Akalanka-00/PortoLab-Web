import { Route } from "react-router-dom";

import { AuthorizeLogin } from "../middleware/Auth";
import HomePage from "../pages/home/Home";
import ApidocPage from "../pages/api/Apidoc";
import AuthPage from "../pages/auth/Auth";


function PublicRoutes() {
    return (
        <>
            <Route path="/" element={<HomePage />} />
            <Route path="/api" element={<ApidocPage />} />
            
            <Route path="/login" element={<AuthorizeLogin><AuthPage/></AuthorizeLogin>} />
            <Route path="/register" element={<AuthorizeLogin><AuthPage/></AuthorizeLogin>} />
            <Route path="/documentation" element={<ApidocPage />} />

            </>
    );
}

export default PublicRoutes;

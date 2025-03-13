import { Route } from "react-router-dom";

import { AuthorizeLogin } from "../middleware/Auth";
import HomePage from "../pages/home/Home";
import LoginPage from "../pages/auth/login/Login";
import RegisterPage from "../pages/auth/registration/Register";


function PublicRoutes() {
    return (
        <>
            <Route path="/" element={<HomePage />} />
            
            <Route path="/login" element={<AuthorizeLogin><LoginPage /></AuthorizeLogin>} />
            <Route path="/register" element={<AuthorizeLogin><RegisterPage /></AuthorizeLogin>} />
            </>
    );
}

export default PublicRoutes;

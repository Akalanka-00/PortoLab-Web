import { Navigate } from "react-router-dom";

export const AuthorizeLogin = ({children})=>{
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    // if(token && user){
    //     return <Navigate to="/dashboard" replace={true}></Navigate>
    // }

    return children;
}

export const AuthorizeAdmin = ({ children }) => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    // if(!token || !user){
    //     return <Navigate to={'/login'} replace={true}></Navigate>
    // }
    return children;
}
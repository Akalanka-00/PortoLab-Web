import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./authentication.scss"; // Import CSS styles
import logSvg from "../../assets/images/rocket.svg"; // Adjust paths as needed
import registerSvg from "../../assets/images/register.svg"; // Adjust paths as needed
import GoogleSignInBtn from "../../components/google/GoogleSignInBtn";
import { AuthAPI } from "../../api/auth/auth.api";

const AuthPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLoginMode = location.pathname.includes("/login");

    const [authMode, setAuthMode] = useState(isLoginMode);
    const authApi = new AuthAPI();

    useEffect(() => {
        // Delay the mode switch for smooth transition
        const timer = setTimeout(() => {
            setAuthMode(isLoginMode);
        }, 1000);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    const handleNavigate = (loginMode) => {
        setAuthMode(loginMode);
        navigate(loginMode ? "/login" : "/register");
    }

    const [loginformValues, setLoginformData] = useState({
        email: "",
        password: "",
    }); 

     const [formValues, setFormValues] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    
    function handleLoginChange(e) {
        const { name, value } = e.target;
        setLoginformData({ ...loginformValues, [name]: value });
    }
  
    async function handleLoginSubmit(e) {
        e.preventDefault();
    
        const response = await authApi.login(loginformValues);
        if(response){
            console.log(response);
            navigate('/dashboard');
        } else {
            setLoginformData({ email: "", password: "" });
        }
    }


    function handleChange(e) {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      }
    
      async function handleSubmit(e) {
        e.preventDefault();
        console.log(formValues);
        if (formValues.password !== formValues.confirmPassword) {
          return alert("Passwords do not match");
        }
        else {
          const response = await authApi.register(formValues);
          if (response && response.message === "Success") {
            navigate('/login');
          } else {
            setFormValues({
              name: "",
              fname: "",
              lname: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
          }
        }
      }

    return (
        <div className={`auth-container ${authMode ? "" : "sign-up-mode"}`}>
            <div className="forms-container">
                <div className="signin-signup">
                    {/* Sign In Form */}
                    <form className="sign-in-form">
                        <h2 className="title">Sign In</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="email" placeholder="Email" id="email" name='email' onChange={handleLoginChange} value={loginformValues.email} required/>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" id="password" name='password' onChange={handleLoginChange} value={loginformValues.password} required/>
                        </div>
                        <input type="submit" value="Login" onClick={handleLoginSubmit} className="auth-btn  solid" />
                        <p className="social-text">Or Sign in with social platforms</p>
                        <div className="social-media">
                            <GoogleSignInBtn text="Sign In with Google" />
                        </div>
                    </form>

                    {/* Sign Up Form */}
                    <form className="sign-up-form">
                        <h2 className="title">Sign Up</h2>
                        <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" placeholder="First Name"  id="fname" name='fname' onChange={handleChange} value={formValues.fname} autoFocus required />
                                </div>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" placeholder="Last Name"  id="lname" name='lname' onChange={handleChange} value={formValues.lname} autoFocus required />
                                </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" id="email" name='email' onChange={handleChange} value={formValues.email} autoFocus required />
                            </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password"  id="password" name='password' onChange={handleChange} value={formValues.password} required />
                            </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Confirm Password"  id="confirm-password" name='confirmPassword' onChange={handleChange} value={formValues.confirmPassword} required />
                            </div>
                        <input type="submit" onClick={handleSubmit} className="auth-btn" value="Sign Up" />
                        <p className="social-text">Or Sign up with social platforms</p>
                        <div className="social-media">
                           <GoogleSignInBtn text="Sign Up with Google" />
                        </div>
                    </form>
                </div>
            </div>

            {/* Panels for Switching Modes */}
            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here?</h3>
                        <p>Sign up to explore exciting opportunities.</p>
                        <button className="auth-btn transparent" onClick={() => handleNavigate(false)}>
                            Sign Up
                        </button>
                    </div>
                    <img src={logSvg} className="image" alt="Sign Up" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>Already a member?</h3>
                        <p>Sign in to continue.</p>
                        <button className="auth-btn transparent" onClick={() => handleNavigate(true)}>
                            Sign In
                        </button>
                    </div>
                    <img src={registerSvg} className="image" alt="Sign In" />
                </div>
            </div>
        </div>
    );
};

export default AuthPage;

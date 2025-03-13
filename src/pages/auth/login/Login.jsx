import React, { useState } from 'react'
import "../authentication.scss"
import { GiF1Car } from "react-icons/gi";
import Banner from "../../../assets/images/register_banner.jpg";
import GoogleSignInBtn from '../../../components/google/GoogleSignInBtn';
// import { AuthAPI } from '../../../api/auth/auth.api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    //   const authApi = new AuthAPI();
      const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  }); 
  
  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    //   const response = await authApi.login(formValues);
    //   if(response){
    //     navigate('/dashboard');
    //   }else{
    //     setFormValues({email: "", password: ""});
    //   }
      
    
  }
  
  return (
    <div className='container auth-container'>
      <div className="left-container">
        <div className="header">
          <GiF1Car className="header-icon" />
          <div className='header-text'>AutoShop</div>
        </div>

        <div className="sub-header">
          <div className="title">Login to your account</div>
          <div className="sub-title">Welcome back! Log in to the PortoLab to continue...</div>
        </div>

        <div className="form-group register-form">

            <div className="portolab-input-group">
            <input type="text" className='input-field' id="email" name='email' onChange={handleChange}  required/>
            <label className='input-label' htmlFor='email'>Your email address<span>*</span></label>
            </div>

            <div className="portolab-input-group">
            <input type="password" className='input-field' id="password" name='password' onChange={handleChange}  required/>
            <label className='input-label' htmlFor='password'>Create Password<span>*</span></label>
            </div>

            <div className="portolab-checkbox-input">
            <button className='portolab-btn mt-3' type='submit' onClick={handleSubmit}>Login</button>
            </div>
            <div className='auth-footer'>Don't you have an account? <span onClick={()=>navigate("/register")}>Register</span></div>

            <div className="seperator">
            <div className="line"></div>
            <div className="text">Or</div>
            <div className="line"></div>

            </div>

            <div className="alt-auths">
            <GoogleSignInBtn text={"Sign In with Google"}/>
            </div>

            

          </div>


      </div>
      <div className="right-container">
        <img src={Banner} alt="login" className="auth-image"/>
      </div>
      </div>
  )
}

export default LoginPage
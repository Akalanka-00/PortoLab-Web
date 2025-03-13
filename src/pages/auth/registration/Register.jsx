import React, { useState } from 'react'
import "../authentication.scss"
import { GiF1Car } from "react-icons/gi";
import Banner from "../../../assets/images/register_banner.jpg";
import GoogleSignInBtn from '../../../components/google/GoogleSignInBtn';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

    //   const authApi = new AuthAPI();
      const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  }); 
  
  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formValues);
    if(formValues.password !== formValues.confirmPassword) {
     return alert("Passwords do not match");
    }
    else{
    //   const response = await authApi.register(formValues);
    //   if(response){
    //     navigate('/dashboard');
    //   }else{
    //     setFormValues({name: "",
    //       email: "",
    //       password: "",
    //       confirmPassword: ""
    //     });
    //   }
    }
  }
  
  return (
    <div className='container auth-container'>
      <div className="left-container">
        <div className="header">
          <GiF1Car className="header-icon" />
          <div className='header-text'>PortoLab</div>
        </div>

        <div className="sub-header">
          <div className="title">Register your account</div>
          <div className="sub-title">New User? Complete the registration and setup your portfolio easily</div>
        </div>

        <div className="form-group register-form">
        <div className="portolab-input-group">
            <input type="text" className='input-field' id="name" name='name' onChange={handleChange}  autoFocus required/>
            <label className='input-label' htmlFor='name'>Name<span>*</span></label>
            </div>

            <div className="portolab-input-group">
            <input type="text" className='input-field' id="email" name='email' onChange={handleChange}  required/>
            <label className='input-label' htmlFor='email'>Your email address<span>*</span></label>
            </div>

            <div className="portolab-input-group">
            <input type="password" className='input-field' id="password" name='password' onChange={handleChange}  required/>
            <label className='input-label' htmlFor='password'>Create Password<span>*</span></label>
            </div>

            <div className="portolab-input-group">
            <input type="password" className='input-field' id="confirm-password" name='confirmPassword' onChange={handleChange} required/>
            <label className='input-label' htmlFor='confirm-password'>Re-Enter Password<span>*</span></label>
            </div>

            <div className="portolab-checkbox-input">
            <input type="checkbox" className='agreement-input-field' id="agreement" required/>
            <label className='agreement-input-label' htmlFor='agreement'>I agree to all terms, and privacy policy</label>
            </div>

            <div className="portolab-checkbox-input">
            <button className='portolab-btn mt-3' type='submit' onClick={handleSubmit}>Register</button>
            </div>

            <div className="seperator">
            <div className="line"></div>
            <div className="text">Or</div>
            <div className="line"></div>

            </div>

            <div className="alt-auths">
              <GoogleSignInBtn text={"Sign Up with Google"}/>
            </div>
            <div className='auth-footer'>Do you already have an account? <span onClick={()=>navigate("/login")}>Login</span></div>
          </div>


      </div>
      <div className="right-container">
        <img src={Banner} alt="register" className="auth-image"/>
      </div>
      </div>
  )
}

export default RegisterPage
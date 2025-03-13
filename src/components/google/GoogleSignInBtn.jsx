import React from "react";
import "./googleSignInBtn.scss";
import GoogleIcon from "../../assets/icons/google.png";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
// import { AuthAPI } from "../../api/auth/auth.api";
import { useNavigate } from "react-router-dom";

const GoogleSignInBtn = ({text}) => {
    // const authApi = new AuthAPI();
    const navigate = useNavigate();
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log("Token Response:", tokenResponse);

            // Fetch user info using the access token
            try {
                const { data } = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                });

                console.log("User Info:", data); // Contains email, name, picture, etc.
                // const res = await authApi.googleSignIn(data);
                // if(res) {
                //     navigate('/dashboard');
                // }
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        },
        onError: () => {
            console.log("Login Failed");
        },
        ux_mode: "popup",
    });

    return (
        <div className="google-sign-in-btn" onClick={login}>
            <div className="google-auth">
                <img src={GoogleIcon} alt="google-logo" />
                <div className="text">{text}</div>
            </div>
        </div>
    );
};

export default GoogleSignInBtn;

import Swal from "sweetalert2";
import BaseAPI from "../apiContext";

export class AuthAPI {
  
    constructor() {
        this._baseApi = new BaseAPI();
    }
  async googleSignIn(user) {

    const data = {
      Fname: user.given_name,
      Lname: user.family_name,
      Email: user.email,
      Avatar: user.picture,
      AuthenticationType: 'google',
      CreatedDate: new Date()
    }
    console.log(user);
    const response = await this._baseApi.post('api/auth/google',data);
    if(response.status === 200 && response.data.message ==="Success") {
        const res = response.data;
        console.log(res);
        // localStorage.setItem('token', JSON.stringify(res));
        // localStorage.setItem('user', JSON.stringify({name, picture, email}));
      return response.data;
    }else {
        Swal.fire({
            icon: "error",
            title: "Authentication Error!",
            text: response.data.message,
          });
          return null;
    }
  }

  async register(user) {
    const {name, email, password} = user;
    const data = {username: name, password:password, email:email, authentication_method: 'email', created_date: new Date()};

    const response = await this._baseApi.post('/auth/register', data);
    if(response.status === 200 && response.data.message ==="Success") {
        const res = response.data;
        localStorage.setItem('token', JSON.stringify(res));
        localStorage.setItem('user', JSON.stringify({name, picture:null, email}));
        return response.data;
    }else {
        Swal.fire({
            icon: "error",
            title: "Authentication Error!",
            text: response.data.message,
          });
          return null;
    }
  }

    async login(user) {
        const {email, password} = user;
        const data = {password:password, email:email};
    
        const response = await this._baseApi.post('/auth/login', data);
        if(response.status === 200 && response.data.message ==="Success") {
            const res = response.data;
            localStorage.setItem('token', JSON.stringify(res));
            localStorage.setItem('user', JSON.stringify({name:res.username, picture:null, email}));
            
            return response.data;
        }else {
            Swal.fire({
                icon: "error",
                title: "Authentication Error!",
                text: response.data.message,
              });
              return null;

        }
    }
}
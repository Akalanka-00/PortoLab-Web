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
    const response = await this._baseApi.post('api/auth/google',data);
    if(response.status === 200 && response.data.message ==="Success") {
        const res = response.data;
        console.log(res);
         localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify({id: res.userId, fname: data.Fname, lname: data.Lname, picture:data.Avatar, email:data.Email}));
      return response.data;
    }else {
      console.log(response);
        Swal.fire({
            icon: "error",
            title: "Authentication Error!",
            text: response.data.message,
          });
          return null;
    }
  }

  async register(user) {
    const {fname, lname, email, password} = user;
    const data = {Fname: fname, Lname:lname, Password:password, Email:email, AuthenticationType: 'email', CreatedDate: new Date()};

    const response = await this._baseApi.post('/api/auth/register', data);
    if(response.status === 200 && response.data.message ==="Success") {
        const res = response.data;
       
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
        const data = {Password:password, Email:email, AuthenticationType: 'email',};
    
        const response = await this._baseApi.post('/api/auth/login', data);
        if(response.status === 200 && response.data.message ==="Success") {
            const res = response.data;
            localStorage.setItem('token', res.token);
            // localStorage.setItem('user', JSON.stringify({name:res.username, picture:null, email}));
            localStorage.setItem('user', JSON.stringify({id: res.userId, fname: data.Fname, lname: data.Lname, picture:null, email:data.Email}));

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
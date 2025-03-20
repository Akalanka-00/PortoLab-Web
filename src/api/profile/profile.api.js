import BaseAPI from "../apiContext";
import Swal from "sweetalert2";

export class ProfileAPI {
  
    constructor() {
        this._baseApi = new BaseAPI();
    }

    // Get Profile by User ID
    async getProfile() {
        const user = localStorage.getItem('user');
        const userId = JSON.parse(user).id;

        const response = await this._baseApi.get(`api/profile/${userId}`);
        if (response.status === 200) {
            return response.data;
        } else {
            Swal.fire({
                icon: "error",
                title: "Error occurred!",
                text: response.data.message,
            });
            return null;
        }
    }

    // Update Bio
    async updateBio(newBio) {
        const user = localStorage.getItem('user');
        const userId = JSON.parse(user).id;

        const response = await this._baseApi.update(`api/profile/${userId}/bio`, newBio);
        console.log(response);
        if (response.status === 200) {
            return true;
        } else {
            Swal.fire({
                icon: "error",
                title: "Error occurred!",
                text: response.data.message,
            });
            return false;
        }
    }

    // Update CV
    async updateCv(newCv) {
        const user = localStorage.getItem('user');
        const userId = JSON.parse(user).id;

        const response = await this._baseApi.update(`api/profile/${userId}/cv`, newCv);
        if (response.status === 200) {
            return response.data;
        } else {
            Swal.fire({
                icon: "error",
                title: "Error occurred!",
                text: response.data.message,
            });
            return false;
        }
    }

    // Update Profile Picture
    async updateProfile(newProfile) {
        const user = localStorage.getItem('user');
        const userId = JSON.parse(user).id;

        const response = await this._baseApi.update(`api/profile/${userId}/profile`, newProfile);
        if (response.status === 200) {
            return true;
        } else {
            Swal.fire({
                icon: "error",
                title: "Error occurred!",
                text: response.data.message,
            });
            return false;
        }
    }

    // Update Personal Information (fname, lname, phone, address)
    async updatePersonalInfo(personalInfo) {
        const user = localStorage.getItem('user');
        const userId = JSON.parse(user).id;

        const response = await this._baseApi.update(`api/profile/${userId}/personal-info`, personalInfo);
        if (response.status === 200) {
            return true;
        } else {
            Swal.fire({
                icon: "error",
                title: "Error occurred!",
                text: response.data.message,
            });
            return false;
        }
    }
}

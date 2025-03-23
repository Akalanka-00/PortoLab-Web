import Swal from "sweetalert2";
import BaseAPI from "../apiContext";

export class EducationAPI {

    constructor() {
        this._baseApi = new BaseAPI();
    }

    async createEducation(education) {
        const user = localStorage.getItem('user');
        const userId = JSON.parse(user).id;
        const data = {
            CollegeName: education.college,
            CourseName: education.course,
            Result: education.result,
            UserId: userId,
            StartYear: education.startYear,
            EndYear: education.endYear,
            StartMonth: education.startMonth,
            EndMonth: education.endMonth,
            CreatedDate: new Date(),
        }
        const response = await this._baseApi.post('api/qualification/education', data);
        if (response.status === 201) {
            return response.data;
        } else {
            Swal.fire({
                icon: "error",
                title: "Error ocured!",
                text: response.data.message,
            });
            return null;
        }
    }

        async getEducationExps() {
            const response = await this._baseApi.get(`api/qualification/education/`);
            if(response.status === 200) {
                return response.data;
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "Error ocured!",
                    text: response.data.message,
                  });
                  return null;
            }
        }

        async getEducationById(id) {
            const response = await this._baseApi.get(`api/qualification/education/${id}`);
            if (response.status === 200) {
                return response.data;
            } else {
                Swal.fire({ icon: "error", title: "Error occurred!", text: response.data.message });
                return null;
            }
        }

        async updateEducation(id, education) {
            const data = {
                CollegeName: education.college,
                CourseName: education.course,
                Result: education.result,
                StartYear: education.startYear,
                EndYear: education.endYear,
                StartMonth: education.startMonth,
                EndMonth: education.endMonth,
                Status: education.status,
            };

            console.log(data);
            const response = await this._baseApi.update(`api/qualification/education/${id}`, data);
            if (response.status === 200) {
                return response.data;
            } else {
                Swal.fire({ icon: "error", title: "Error occurred!", text: response.data.message });
                return null;
            }
        }
    
        async deleteEducation(id) {
            const response = await this._baseApi.delete(`api/qualification/education/${id}`);
            if (response.status === 200) {
                return true;
            } else {
                Swal.fire({ icon: "error", title: "Error occurred!", text: response.data.message });
                return false;
            }
        }
}
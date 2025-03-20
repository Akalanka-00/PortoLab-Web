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
            const user = localStorage.getItem('user');
            const userId = JSON.parse(user).id;
            const response = await this._baseApi.get(`api/qualification/education/user/${userId}`);
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
}
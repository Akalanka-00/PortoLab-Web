import Swal from "sweetalert2";
import BaseAPI from "../apiContext";

export class ExperienceAPI {
    constructor() {
        this._baseApi = new BaseAPI();
    }

    async createExperience(experience) {
        const user = localStorage.getItem('user');
        const userId = JSON.parse(user).id;

        const data = {
            Company: experience.company,
            Role: experience.role,
            StartYear: experience.startYear,
            EndYear: experience.endYear,
            StartMonth: experience.startMonth,
            EndMonth: experience.endMonth,
            StillWorking: experience.isStillWorking,
            Description: experience.description,
            UserId: userId,
            CreatedDate: new Date(),
        };

        const response = await this._baseApi.post('api/qualification/experience', data);
        if (response.status === 201) {
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

    async getExperienceExps() {

        const response = await this._baseApi.get(`api/qualification/experience`);
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

    async getExperienceById(id) {
        const response = await this._baseApi.get(`api/qualification/experience/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            Swal.fire({ icon: "error", title: "Error occurred!", text: response.data.message });
            return null;
        }
    }

    async updateExperience(id, experience) {
        const data = {
            Company: experience.company,
            Role: experience.role,
            StartYear: experience.startYear,
            EndYear: experience.endYear,
            StartMonth: experience.startMonth,
            EndMonth: experience.endMonth,
            StillWorking: experience.isStillWorking,
            Description: experience.description,
            Status: experience.status,
        };

        console.log('Update Experience Data:', data);

        const response = await this._baseApi.update(`api/qualification/experience/${id}`, data);
        if (response.status === 200) {
            return response.data;
        } else {
            Swal.fire({ icon: "error", title: "Error occurred!", text: response.data.message });
            return null;
        }
    }

    async deleteExperience(id) {
        const response = await this._baseApi.delete(`api/qualification/experience/${id}`);
        if (response.status === 200) {
            return true;
        } else {
            Swal.fire({ icon: "error", title: "Error occurred!", text: response.data.message });
            return false;
        }
    }
}

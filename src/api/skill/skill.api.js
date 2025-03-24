import BaseAPI from "../apiContext";
import Swal from "sweetalert2";

export class SkillAPI {
    
    constructor() {
        this._baseApi = new BaseAPI();
    }

    // Get Skills by User ID
    async getSkills() {

        const response = await this._baseApi.get(`api/skill`);
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

    // Get Skill by ID
    async getSkillById(skillId) {

        const response = await this._baseApi.get(`api/skill/${skillId}`);
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

    // Add a New Skill
    async addSkill(skillData) {

        const data = {
            Name: skillData.name,
            Icon: skillData.icon,
            ExpertLevel: skillData.level,
            CreatedDate: new Date(),
        };
        const response = await this._baseApi.post(`api/skill`, data);
        if (response.status === 201) {
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

    // Update an Existing Skill
    async updateSkill(skillId, skillData) {

        console.log(skillData);
        const data = {
            Name: skillData.name,
            Icon: skillData.icon,
            ExpertLevel: skillData.level,
            Status: skillData.status,
        };

        console.log(data);
        console.log(skillId);
        const response = await this._baseApi.update(`api/skill/${skillId}`, data);
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

    // Delete a Skill
    async deleteSkill(skillId) {


        const response = await this._baseApi.delete(`api/skill/${skillId}`);
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

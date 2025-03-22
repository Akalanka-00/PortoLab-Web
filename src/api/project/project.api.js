import BaseAPI from "../apiContext";
import Swal from "sweetalert2";

export class ProjectAPI {
  
    constructor() {
        this._baseApi = new BaseAPI();
    }


    async createProject(project) {
        const user = localStorage.getItem('user');
        const userId = JSON.parse(user).id;
        const data = {
            Title: project.title,
            Description: project.description,
            StartYear: project.startYear,
            EndYear: project.endYear,
            StartMonth: project.startMonth,
            EndMonth: project.endMonth,
            IsCurrent: project.isStillWorking,
            UserId: userId,
            Banner: project.image,
            Technologies: project.technologies,
            Github: project.github,
            Web: project.demo,
            CreatedDate: new Date(),

        }
        const response = await this._baseApi.post('api/project', data);
        if(response.status === 201) {
            return response.data;
        }else{
            Swal.fire({
                        icon: "error",
                        title: "Error ocured!",
                        text: response.data.message,
                      });
                      return null;
        }
    }

    async getProjects() {
        const user = localStorage.getItem('user');
        const userId = JSON.parse(user).id;
        const response = await this._baseApi.get(`api/project/user/${userId}`);
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

    async getProjectById(id) {
        const response = await this._baseApi.get(`api/project/${id}`);
        if(response.status === 200) {
            return response.data;
        }else{
            Swal.fire({
                icon: "error",
                title: "Error ocured!",
                text: response.data.message,
              });
              return null;
        }
    }

    async updateProject(project, id) {
        const data = {
            Title: project.title,
            Description: project.description,
            StartYear: project.startYear,
            EndYear: project.endYear,
            StartMonth: project.startMonth,
            EndMonth: project.endMonth,
            IsCurrent: project.isStillWorking,
            Banner: project.image,
            Technologies: project.technologies,
            GitHub: project.github,
            Web: project.demo,

        }
        const response = await this._baseApi.update(`api/project/${id}`, data);
        if(response.status === 200) {
            return response.data;
        }else{
            Swal.fire({
                icon: "error",
                title: "Error ocured!",
                text: response.data.message,
              });
              return null;
        }
    }

    async deleteProject(id) {
        const response = await this._baseApi.delete(`api/project/${id}`);
        if(response.status === 200) {
            return response.data;
        }else{
            Swal.fire({
                icon: "error",
                title: "Error ocured!",
                text: response.data.message,
              });
              return null;
        }
    }
}
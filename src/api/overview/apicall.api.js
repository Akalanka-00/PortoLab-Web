import BaseAPI from "../apiContext";


export class ApiCallAPI {
  
    constructor() {
        this._baseApi = new BaseAPI();
    }

    async getByTimeRange(range) {
        const response = await this._baseApi.get(`api/apicall/time/${range}`);
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
}
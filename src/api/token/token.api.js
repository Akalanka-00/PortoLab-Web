import BaseAPI from "../apiContext";

export class TokenAPI {
  
    constructor() {
        this._baseApi = new BaseAPI();
    }

    async generateToken(origin) {
        const data = {
            origin: origin,};
        const response = await this._baseApi.post(`api/token`, data);
        console.log(response);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        }
    }
}
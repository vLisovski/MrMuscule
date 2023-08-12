import axios from "axios";

class UsersApiWorker{
    #axios;

    constructor() {
        this.#axios = axios.create({
            baseURL: "http://localhost:8080/user"
        });
    }

    async getIdByToken(token) {
        return await this.#axios.get("/getIdByToken", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
    }
}
export default UsersApiWorker;
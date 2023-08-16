import axios from "axios";

class UsersApiWorker {
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

    async getFavorites(userId, limit, offset) {
        return await this.#axios.get(`/getFavorites?userId=${userId}&limit=${limit}&offset=${offset}`)
    }

    async addFavorite(insertedItem) {
        return await this.#axios.post("/addFavorite", insertedItem)
    }

    async deleteFavorite(deletedItem) {
        return await this.#axios.delete("/deleteFavorite", deletedItem)
    }

    async getPurchases(userId, limit, offset) {
        return await this.#axios.get(`/getPurchases?userId=${userId}&limit=${limit}&offset=${offset}`)
    }
}

export default UsersApiWorker
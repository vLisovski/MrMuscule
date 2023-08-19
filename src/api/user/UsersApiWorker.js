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

    async getFavorites(userId, limit, offset, token) {
        return await this.#axios.get(`/getFavorites?userId=${userId}&limit=${limit}&offset=${offset}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    }

    async addFavorite(insertedItem, token) {
        return await this.#axios.post("/addFavorite", insertedItem, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    }

    async deleteFavorite(deletedItem, token) {
        return await this.#axios.delete("/deleteFavorite", deletedItem, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    }

    async getPurchases(userId, limit, offset, token) {
        return await this.#axios.get(`/getPurchases?userId=${userId}&limit=${limit}&offset=${offset}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    }
}

export default UsersApiWorker
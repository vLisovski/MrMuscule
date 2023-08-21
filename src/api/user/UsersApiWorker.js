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

    async getFavoritesIds(userId, limit, offset, token) {
        return await this.#axios.get(`/getFavoritesIds?userId=${userId}&limit=${limit}&offset=${offset}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    }

    async getFavorites(userId, limit, offset, token) {
        return await this.#axios.get(`/getFavorites?userId=${userId}&limit=${limit}&offset=${offset}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    }

    async getUserInfo(userId, token) {
        return await this.#axios.get(`/getById?userId=${userId}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    }

    async updateEmail(userId, email, token){
        return await this.#axios.get(`/updateEmail?userId=${userId}&email=${email}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    }

    async updatePhoneNumber(userId, phoneNumber, token){
        return await this.#axios.get(`/updatePhoneNumber?userId=${userId}&phoneNumber=${phoneNumber}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    }

    async updateAvatarPath(userId, avatarPath, token){
        return await this.#axios.get(`/updatePhotoPath?userId=${userId}&avatarPath=${avatarPath}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    }

    async updateName(userId, name, token){
        return await this.#axios.get(`/updateName?userId=${userId}&name=${name}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    }

    async addFavorite(insertedItem, token) {
        await this.#axios.post("/addFavorite", insertedItem, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    }

    async getTotalFavorites(userId, token){
        await this.#axios.get(`/getTotalFavorite?userId=${userId}`,{
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    }

    async deleteFavorite(deletedItem, token) {
        await this.#axios.delete("/deleteFavorite", {
            headers: {
                "Authorization": "Bearer " + token
            },
            data: deletedItem
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
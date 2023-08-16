import axios from "axios";

class ShopPageApi {
    #axios

    constructor() {
        this.#axios = axios.create({
            baseURL: "http://localhost:8080/products"
        })
    }

    async getAllInventory(limit, offset) {
        return await this.#axios.get(`/getAll/inventory?limit=${limit}&offset=${offset}`);
    }

    async getAllFood(limit, offset) {
        return await this.#axios.get(`/getAll/food?limit=${limit}&offset=${offset}`);
    }

    async getAllClothes(limit, offset) {
        return await this.#axios.get(`/getAll/clothes?limit=${limit}&offset=${offset}`);
    }
}

export default ShopPageApi
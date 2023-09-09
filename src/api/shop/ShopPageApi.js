import axios from "axios";

class ShopPageApi {

    #axios

    constructor() {
        this.#axios = axios.create({
            baseURL: "http://localhost:8080/free/products"
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

    async getTotalInventory() {
        return await this.#axios.get("/getTotal/inventory");
    }

    async getTotalFood() {
        return await this.#axios.get("/getTotal/food");
    }

    async getTotalClothes() {
        return await this.#axios.get("/getTotal/clothes");
    }

    async getAllByProductsIds(productsIds) {
        return await this.#axios.post(`/getAllByIdList`, productsIds)
    }

    async getTotalByTag(tag1,tag2) {
        return await this.#axios.get(`/getTotal/target?tag1=${tag1}&tag2=${tag2}`)
    }

    async getAllByTag(tag1,tag2,limit,offset) {
        return await this.#axios.get(`/getAll/target?tag1=${tag1}&tag2=${tag2}&limit=${limit}&offset=${offset}`)
    }
}

export default ShopPageApi
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

    async getTotalInventory(){
        return await this.#axios.get("/getTotal/inventory");
    }

    async getTotalFood(){
        return await this.#axios.get("/getTotal/food");
    }

    async getTotalClothes(){
        return await this.#axios.get("/getTotal/clothes");
    }

    async getAllByProductsIds(productsIds){

        console.log("PRODUCTS IDS " + productsIds)

        return await this.#axios.post(`/getAllByIdList`, productsIds)
    }
}

export default ShopPageApi
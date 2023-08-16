import axios from "axios";

class CartApi {
    #axios;

    constructor() {
        this.#axios = axios.create({
            baseURL: "http://localhost:8080/cart"
        });
    }

    async deleteProduct(deletedItem) {
        return await this.#axios.delete("/deleteProduct", deletedItem);
    }

    async clearCart(userId) {
        return await this.#axios.delete(`/clearCart?userId=${userId}`);
    }

    async addProduct(insertedItem) {
        return await this.#axios.post("/addProduct", insertedItem);
    }

    async getByUserId(userId) {
        return await this.#axios.get(`/getByUserId?userId=${userId}`);
    }
}

export default CartApi;
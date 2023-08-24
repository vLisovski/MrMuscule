import axios from "axios";

class CartApi {

    #axios;

    constructor() {
        this.#axios = axios.create({
            baseURL: "http://localhost:8080/cart"
        });
    }

    async deleteProduct(deletedItem, token) {
        return await this.#axios.delete("/deleteProduct", {
            headers: {
                "Authorization": "Bearer " + token
            },
            data: deletedItem
        });
    }

    async getTotalProduct(userId, token){
        return await this.#axios.get(`/getTotal?userId=${userId}`,{
            headers: {
                "Authorization": "Bearer " + token
            }
        });
    }

    async clearCart(userId, token) {
        return await this.#axios.delete(`/clearCart?userId=${userId}`,{
            headers: {
                "Authorization": "Bearer " + token
            }
        });
    }

    async addProduct(insertedItem, token) {
        return await this.#axios.post("/addProduct", insertedItem,{
            headers: {
                "Authorization": "Bearer " + token
            }
        });
    }

    async getByUserId(userId, token) {
        return await this.#axios.get(`/getCart?userId=${userId}`,{
            headers: {
                "Authorization": "Bearer " + token
            }
        });
    }
}

export default CartApi;
import axios from "axios";

class OrderApi {

    #axios

    constructor() {
        this.#axios = axios.create({
            baseURL: "http://localhost:8080/order"
        })
    }

    async getOrdersByUserId(userId){
        await this.#axios.get(`/getAll?userId=${userId}`)
    }

    async addNewOrder(insertedItem){
        await this.#axios.post(`/addOrder`,insertedItem)
    }

    async deleteOrder(deletedItem){
        await this.#axios.post(`/deleteOrder`,deletedItem)
    }
}


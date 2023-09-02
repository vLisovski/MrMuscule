import axios from "axios";
import ShopPageApi from "../shop/ShopPageApi";

class OrderApi {

    #axios

    constructor() {
        this.#axios = axios.create({
            baseURL: "http://localhost:8080/order"
        })
    }

    async getOrdersByUserId(userId, token){
      return await this.#axios.get(`/getAll?userId=${userId}`,{
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    }

    async makeOrderByUserId(token, order){
        return await this.#axios.post("/addOrder",order,{
            headers: {
                "Authorization": "Bearer " + token
            }
        });
    }

    async deleteOrder(deletedItem){
        await this.#axios.post(`/deleteOrder`,deletedItem)
    }
}

export default OrderApi
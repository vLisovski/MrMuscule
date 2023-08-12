import axios from "axios";

class AuthOrRegister{
    #axios

    constructor() {
        this.#axios = axios.create({
            baseURL: "http://localhost:8080/auth"
        })
    }

    async authentication(credentials){
        return await this.#axios.post("/authenticate",credentials);
    }

    async registration(credentials){
        return await this.#axios.post("/register",credentials);
    }
}
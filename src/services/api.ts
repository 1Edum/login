import axios from "axios";

export const APi = axios.create({
    baseURL: "https://reqres.in/api/"
})
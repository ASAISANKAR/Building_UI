import axios from "axios";

const API_BASE = '/data/myjwt';
const auth = localStorage.getItem("auth");
export const getJWT_TOKEN = () => {
    return axios.get(API_BASE, {
        headers: {
            Authorization: 'Basic '+auth
        }
    })
}
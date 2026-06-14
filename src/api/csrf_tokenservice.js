import axios from "axios";

const API_BASE = `/data/csrf-token`;
const jwt_token = localStorage.getItem("jwt");
const getAuthHeaders = () => ({
    Authorization: 'Bearer '+jwt_token,
});

export const getCSRF_TOKEN = () => {
    return axios.get(API_BASE, {
        headers: getAuthHeaders()
    })
}
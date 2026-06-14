import axios from "axios";

const API_BASE = `/data/csrf-token`;
const getAuthHeaders = () => ({
    Authorization: 'Bearer '+localStorage.getItem("jwt"),
});

export const getCSRF_TOKEN = () => {
    return axios.get(API_BASE, {
        headers: getAuthHeaders()
    })
}
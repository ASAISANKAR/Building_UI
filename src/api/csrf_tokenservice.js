import axios from "axios";

const API_BASE = `${process.env.REACT_APP_DEV_API}/csrf-token`;
const getAuthHeaders = () => ({
    Authorization: `Bearer ${process.env.REACT_APP_Token}`,
});

export const getCSRF_TOKEN = () => {
    return axios.get(API_BASE, {
        headers: getAuthHeaders()
    })
}
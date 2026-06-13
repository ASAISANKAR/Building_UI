import axios from "axios";

const API_BASE = `${process.env.REACT_APP_DEV_API}/building`;
const getAuthHeaders = () => ({
    Authorization: `Bearer ${process.env.REACT_APP_Token}`,
});


export const getBuildings = () => {
    return axios.get(API_BASE, {
        headers: getAuthHeaders()
    })
}

export const createBuilding = (body, csrfToken) => {
    return axios.post(API_BASE, body, {
        headers: {
            ...getAuthHeaders(),
            [csrfToken.data.headerName]: csrfToken.data.token
        }
    });
};

export const deleteBuilding = (id, csrfToken) =>
    axios.delete(`${API_BASE}/${id}`, {
        headers: {
            ...getAuthHeaders(),
            [csrfToken.data.headerName]: csrfToken.data.token
        }
});
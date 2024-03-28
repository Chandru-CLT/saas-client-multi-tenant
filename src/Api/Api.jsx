import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:1997/" })

API.interceptors.request.use(request => {

    const token = localStorage.getItem("authToken")
    if (token) {
        request.headers.token = `Bearer ${token}`;
    }
    return request
})

API.interceptors.response.use(response => {
    return response
})

export default API;
import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://localhost:8000'
});

// Tambahkan JWT ke setiap request
Api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Kalau JWT expired / tidak valid
Api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const requestUrl = error.config?.url;

        if (
            error.response?.status === 401 &&
            requestUrl !== "/api/auth/login"
        ) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default Api;
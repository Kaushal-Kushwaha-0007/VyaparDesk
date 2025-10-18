// src/api/auth.js
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

export function login(email, password) {
    return axios.post(`${BASE_URL}/api/auth/login`, { email, password });
}

export function register(data) {
    return axios.post(`${BASE_URL}/api/auth/register`, data);
}

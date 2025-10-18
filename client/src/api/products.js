import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

// Get all products (optionally, you can add token to headers)
export function getProducts(token) {
    return axios.get(`${BASE_URL}/api/products`, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

// Add one product
export function addProduct(data, token) {
    return axios.post(`${BASE_URL}/api/products`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

// Update a product
export function updateProduct(id, data, token) {
    return axios.put(`${BASE_URL}/api/products/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
}
// Delete a product by ID
export function deleteProduct(id, token) {
    return axios.delete(`${BASE_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

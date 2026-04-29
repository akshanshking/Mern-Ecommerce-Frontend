import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mern-ecommerce-backend-lh6n.onrender.com/api',
});

export default api;
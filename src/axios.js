// src/axios.js

import axios from 'axios';
import { useTokenStore } from '@/stores/token.js';

axios.defaults.baseURL = 'http://localhost:8009';

axios.interceptors.request.use(config => {
    const authStore = useTokenStore();
    const token = authStore.token;
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});
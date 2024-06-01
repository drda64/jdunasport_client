// src/axios.js

import axios from 'axios';
import { useTokenStore } from '@/stores/token.js';
import {notify} from "@kyvg/vue3-notification";

axios.defaults.baseURL = 'http://localhost:8009';

axios.interceptors.request.use(config => {
    const authStore = useTokenStore();
    const token = authStore.token;
    console.log('Token:', token);
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (!error.response) {
        // Network error (server not reachable, etc)
        notify('Chyba připojení k serveru', 'error');
    }
    return Promise.reject(error);
});
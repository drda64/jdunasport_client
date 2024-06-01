// src/stores/token.js

import { defineStore } from 'pinia';
import axios from 'axios';

export const useTokenStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || '',
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        async login(user) {
            try {
                const response = await axios.post('/login', user);
                const token = response.data.access_token;
                localStorage.setItem('token', token);
                this.token = token;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } catch (error) {
                localStorage.removeItem('token');
                throw new Error('Invalid username or password');
            }
        },
        logout() {
            this.token = '';
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        },
    },
});

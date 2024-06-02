// src/stores/token.js

import { defineStore } from 'pinia';
import axios from 'axios';
import router from "@/router/index.js";

// store for storing jwt token
export const useTokenStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || '',
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        // login func
        async login(user) {
            try {
                // posting the user data to the server
                const response = await axios.post('/login', user);

                // setting the token to the local storage and to the store
                const token = response.data.access_token;
                localStorage.setItem('token', token);
                this.token = token;

                // setting the token to the axios headers
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } catch (error) {
                // removing the token from the local storage
                localStorage.removeItem('token');

                // catching error
                if (error.response && error.response.data && error.response.data.message) {
                    // Return the actual error message from the response
                    return error.response.data.message
                } else {
                    // Fallback error message
                    return 'Něco se pokazilo'
                }
            }
        },
        async register(user) {
            try {
                const response = await axios.post('/register', user);
                const token = response.data.access_token;
                localStorage.setItem('token', token);
                this.token = token;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                return null; // Indicate success with no error
            } catch (error) {
                localStorage.removeItem('token');

                console.error(error.response?.data);
                if (error.response && error.response.data) {
                    return error.response.data;
                } else {
                    return 'Něco se pokazilo...';
                }
            }
        },
        // logout function
        logout() {
            this.token = '';
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        },
    },
});

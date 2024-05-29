import { defineStore } from 'pinia';
import axios from 'axios';

export const useTokenStore = defineStore('auth', {
    // define the store properties
    state: () => ({
        token: localStorage.getItem('token') || '',
    }),
    // we only need one getter
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    // two actions for login and logout
    actions: {
        async login(user) {
            try {
                const response = await axios.post('http://127.0.0.1:8009/login', user);
                const token = response.data.access_token;
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                this.token = token;
                console.log('Login successful');
                console.log(token)
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

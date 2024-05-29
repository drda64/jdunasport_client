import { defineStore } from 'pinia';
import axios from 'axios';

export const useTokenStore = defineStore('auth', {
    // define the store properties
    state: () => ({
        token: localStorage.getItem('token') || '',
        refresh_token: localStorage.getItem('refresh_token') || '',
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
                const refreshToken = response.data.refresh_token;
                localStorage.setItem('token', token);
                localStorage.setItem('refresh_token', refreshToken);
                this.token = token;
                this.refreshToken = refreshToken;

                console.log('Login successful');
                console.log(token)
                console.log(refreshToken)
            } catch (error) {
                localStorage.removeItem('token');
                localStorage.removeItem('refresh_token');
                throw new Error('Invalid username or password');
            }
        },
        async refreshToken() {
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }
                axios.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`;
                const response = await axios.post('http://127.0.0.1:8009/refresh', { refresh_token: refreshToken });
                const newToken = response.data.access_token;
                // nastavime header axiousu
                axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

                localStorage.setItem('token', newToken);
                this.token = newToken;
                console.log('Token refreshed');
            } catch (error) {
                localStorage.removeItem('token');
                throw new Error('Failed to refresh token');
            }
        },
        logout() {
            this.token = '';
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        },
    },
});

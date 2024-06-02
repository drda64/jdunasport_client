import { defineStore } from 'pinia';

export const useLoaderStore = defineStore('loader', {
    state: () => ({
        loading: false,
    }),
    actions: {
        startLoading() {
            this.loading = true;
        },
        stopLoading() {
            this.loading = false;
        }
    }
});

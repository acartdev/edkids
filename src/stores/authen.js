import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import { authenKey } from "src/boot/utils/config";
export const useAuthenStore = defineStore("authenStore", {
  state: () => ({
    auth: undefined,
  }),
  getters: {},
  actions: {
    setAuthen(userData) {
      if (userData && userData.apiKey) {
        LocalStorage.set(authenKey, userData.apiKey);
      }

      this.auth = userData;
    },
    logout() {
      this.auth = undefined;
      LocalStorage.remove(authenKey);
    },
  },
});

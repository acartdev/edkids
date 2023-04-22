import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import { authenKey, teacherKey } from "src/boot/utils/config";

export const useAuthenStore = defineStore("authenStore", {
  state: async () => ({
    auth: undefined,
  }),
  getters: {},
  actions: {
    setAuthen(userData) {
      if (userData && userData.apiKey) {
        LocalStorage.set(authenKey, userData.apiKey);
      }

      this.auth = userData.teacher_id;
    },
    logout() {
      this.auth = undefined;
      LocalStorage.remove(authenKey);
    },
  },
});

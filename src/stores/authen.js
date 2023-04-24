import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import { authenKey, studentKey, teacherKey } from "src/boot/utils/config";
export const useAuthenStore = defineStore("authenStore", {
  state: () => ({
    auth: undefined,
  }),
  getters: {},
  actions: {
    setAuthen(userData) {
      if (userData && userData.apiKey) {
        LocalStorage.set(authenKey, userData.apiKey);
        LocalStorage.set(teacherKey, userData.teacher_id);
      }

      this.auth = userData.teacher_id;
      // console.log(this.auth);
    },
    setUserAuthen(userData) {
      if (userData && userData.apiKey) {
        LocalStorage.set(authenKey, userData.apiKey);
        LocalStorage.set(studentKey, userData.std_id);
        LocalStorage.set(teacherKey, userData.teacher_id);
      }

      this.auth = userData.teacher_id;
      // console.log(this.auth);
    },
    logout() {
      this.auth = undefined;
      LocalStorage.remove(teacherKey);
      LocalStorage.remove(authenKey);
    },
  },
});

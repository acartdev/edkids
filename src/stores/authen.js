import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import {
  authenKey,
  teacherKey,
  studentKey,
  teacher_id,
} from "src/boot/utils/config";

export const useAuthenStore = defineStore("authenStore", {
  state: async () => ({
    auth: undefined,
    student: undefined,
    Useid: undefined,
  }),
  getters: {
    checkUser: (state) => state.student,
  },
  actions: {
    setAuthen(userData) {
      if (userData && userData.apiKey) {
        LocalStorage.set(authenKey, userData.apiKey);
        console.log(userData);
      }

      this.auth = userData.teacher_id;
    },
    async setUserAuthen(userData) {
      if (userData && userData.apiKey) {
        LocalStorage.set(authenKey, userData.apiKey);
        const stdId = LocalStorage.set(studentKey, userData.std_id);

        // const response = await readSingle(userData.std_id);
        // const data = response.entity;
        // for (let i = 0; i < data.length; i++) {
        //   this.student = response.entity[i];
        // }
      }
    },
    setUserId(id) {
      LocalStorage.set(teacher_id, id);
      this.Useid = id;
    },
    logout() {
      this.auth = undefined;
      this.student = undefined;
      this.Useid = undefined;
      LocalStorage.remove(teacherKey);
      LocalStorage.remove(studentKey);
      LocalStorage.remove(authenKey);
      LocalStorage.remove(teacher_id);
    },
  },
});

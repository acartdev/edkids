import { boot } from "quasar/wrappers";
import { LocalStorage } from "quasar";
import { authenKey, studentKey } from "src/boot/utils/config";
export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    // console.log("from", from, "to", to);
    const requiresAuth = to.matched.some((record) => record.meta.requireAuth);
    if (
      requiresAuth &&
      LocalStorage.getItem(studentKey) == "" &&
      LocalStorage.getItem(authenKey) == ""
    ) {
      next({ path: "/login", replace: true });
    } else {
      next();
    }
  });
});

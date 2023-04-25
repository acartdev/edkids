import { boot } from "quasar/wrappers";
import { LocalStorage } from "quasar";
import { authenKey, teacherKey } from "src/boot/utils/config";

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    // console.log("from", from, "to", to);
    const requiresAuth = to.matched.some((record) => record.meta.requireAdmin);
    if (requiresAuth && LocalStorage.getItem(authenKey) == null) {
      next({ path: "/login" });
    } else if (LocalStorage.getItem(teacherKey)) {
      next();
    } else {
      next();
    }
  });
});

import { boot } from "quasar/wrappers";
import { LocalStorage } from "quasar";
import { authenKey, teacherKey, studentKey } from "src/boot/utils/config";

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    // console.log("from", from, "to", to);
    const requiresAuth = to.matched.some((record) => record.meta.emptyLogin);
    if (
      requiresAuth &&
      LocalStorage.getItem(authenKey) == null &&
      LocalStorage.getItem(teacherKey) == null
    ) {
      next();
    } else if (requiresAuth && LocalStorage.getItem(teacherKey) != null) {
      next({ path: "/" });
    } else if (requiresAuth && LocalStorage.getItem(studentKey) != null) {
      next({ path: "/user" });
    } else {
      next();
    }
  });
});

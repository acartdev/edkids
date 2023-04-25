import { boot } from "quasar/wrappers";
import { LocalStorage } from "quasar";
import { authenKey } from "src/boot/utils/config";
import { teacherKey } from "src/boot/utils/config";

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    // console.log("from", from, "to", to);
    const requiresAuth = to.matched.some((record) => record.meta.requireAuth);
    // console.log(requiresAuth);
    if (requiresAuth) {
      if (LocalStorage.getItem(authenKey) != null) {
        next();
      } else {
        next({
          path: "/login",
          replace: true,
        });
      }
    } else {
      next();
    }
  });
});

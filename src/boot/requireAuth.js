import { boot } from "quasar/wrappers";
import { LocalStorage } from "quasar";
import { authenKey } from "src/boot/utils/config";
import { teacherKey } from "src/boot/utils/config";

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    // console.log("from", from, "to", to);
    if (to.matched.some((record) => record.meta.requireAuth)) {
      if (
        LocalStorage.getItem(authenKey) != null &&
        LocalStorage.getItem(teacherKey) != null
      ) {
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

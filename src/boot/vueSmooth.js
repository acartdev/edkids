import Vue3SmoothScroll from "vue3-smooth-scroll";
import { boot } from "quasar/wrappers";
export default boot(({ app }) => {
  app.use(Vue3SmoothScroll);
});

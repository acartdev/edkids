const routes = [
  {
    path: "/login",
    component: () => import("layouts/LoginForm.vue"),
    beforeEach(to, from, next) {
      console.log("to", to);
      console.log("form", from);
      console.log("next", next);
    },
    children: [
      {
        path: "",
        component: () => import("pages/LoginPage.vue"),
      },
    ],
  },
  {
    path: "/",
    meta: { requireAuth: true },

    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/" },
      { path: "/admin/", component: () => import("pages/IndexPage.vue") },
      { path: "/list", component: () => import("pages/ListStudent.vue") },
      {
        path: "/register",
        component: () => import("pages/Register.vue"),
      },
      {
        path: "/point",
        component: () => import("pages/PointForm.vue"),
      },
      {
        path: "/history",
        component: () => import("pages/HistoryList.vue"),
      },
      {
        path: "/post",
        component: () => import("pages/Post.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

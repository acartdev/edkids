const routes = [
  {
    path: "/login",
    component: () => import("layouts/LoginForm.vue"),

    children: [
      {
        path: "",
        component: () => import("pages/LoginPage.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: { requireAdmin: true },

    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
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
      {
        path: "/teacher",
        component: () => import("pages/EditTeacher.vue"),
      },
      {
        path: "/edit-student/:action/:id",
        component: () => import("pages/EditStudent.vue"),
      },
    ],
  },
  {
    path: "/user",
    component: () => import("layouts/UserLayout.vue"),
    meta: { requireAuth: true },
    children: [
      {
        path: "",
        component: () => import("pages/Student/UserPage.vue"),
      },
      {
        path: "/post-list",
        component: () => import("pages/Student/PostPage.vue"),
      },
      {
        path: "/conduct-list",
        component: () => import("pages/Student/ConductPage.vue"),
      },
      {
        path: "/teacher-info",
        component: () => import("pages/Student/TeacherPage.vue"),
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

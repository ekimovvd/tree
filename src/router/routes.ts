import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/default.vue"),
    children: [{ path: "", component: () => import("pages/home.vue") }],
  },
];

export default routes;

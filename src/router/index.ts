import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Welcome from "../views/welcome.vue";
import Index from "../views/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "welcome",
    component: Welcome,
    meta: {
      background: "#323232",
    },
  },
  {
    path: "/index",
    name: "Index",
    component: Index,
    children: [],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta && to.meta.background)
    document.body.style.setProperty(
      "--background-color",
      to.meta.background as string
    );
});

export default router;

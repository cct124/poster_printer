import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Welcome from "../views/Welcome.vue";
import WorkArea from "../views/WorkArea.vue";
import { beforeEach } from "./beforeEach";
import { ROUTER } from "./config";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: ROUTER.welcome,
    component: Welcome,
    meta: {
      background: "#323232",
    },
  },
  {
    path: "/work-area",
    name: ROUTER.workArea,
    component: WorkArea,
    children: [],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

beforeEach(router);

export default router;

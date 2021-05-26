import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Welcome from "@/views/Welcome.vue";
import WorkArea from "@/views/WorkArea.vue";
import CreateCanvas from "@/views/CreateCanvas.vue";
import Main from "@/views/Main.vue";
import { beforeEach } from "./beforeEach";
import { ROUTER } from "./config";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: ROUTER.main,
    component: Main,
    meta: {
      background: "#323232",
    },
    children: [
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
      },
    ],
  },
  {
    path: "/create-canvas",
    name: ROUTER.createCanvas,
    component: CreateCanvas,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

beforeEach(router);

export default router;

import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { beforeEach } from "./beforeEach";
import { ROUTER } from "./config";
/**
 * Components
 */
import Welcome from "@/views/Welcome.vue";
import WorkArea from "@/views/WorkArea.vue";
import CreateCanvas from "@/views/CreateCanvas.vue";
import ColorPicker from "@/views/ColorPicker.vue";
import Main from "@/views/Main.vue";

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
    path: `/${ROUTER.createCanvas}`,
    name: ROUTER.createCanvas,
    component: CreateCanvas,
  },
  {
    path: `/${ROUTER.colorPicker}`,
    name: ROUTER.colorPicker,
    component: ColorPicker,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

beforeEach(router);

export default router;

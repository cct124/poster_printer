import Canvas from "@/views/canvas.vue";
import router from "@/router";
import { APP } from "@/store/config";
import { AppStore } from "@/types/store/app";

export const App = {
  state: {
    canvas: [],
  },
  mutations: {
    [APP.createCanvas](state: AppStore.State): void {
      const index = state.canvas.length;
      const id = index.toString();

      state.canvas.push({
        path: id,
        name: id,
        // eslint-disable-next-line
        component: Canvas as any,
        meta: {
          title: `新建画布 ${index + 1}`,
          desc: `新建画布 ${index + 1}`,
          active: false,
        },
      });

      router.addRoute("Index", state.canvas[index]);

      router.push({ name: id });
    },
  },
  actions: {},
};

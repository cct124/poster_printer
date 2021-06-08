import router from "@/router";
import { ROUTER } from "@/router/config";
import { TabsConctrol } from "@/store/config";
import { AppStore } from "@/types/store/app";
import { VARIABLE } from "@/script/config/variable";

export const tabsConctrol = {
  state: {
    canvas: [],
    destroyCanvas: [],
    activeCanvasHistory: new Set(),
  },
  mutations: {
    async [TabsConctrol.createCanvas](
      state: AppStore.State,
      payload: AppStore.CreateCanvas
    ): Promise<void> {
      const index = state.canvas.length;
      state.canvas.push({
        id: index,
        name: payload.title,
        desc: payload.title,
        active: false,
        meta: payload,
      });

      const canvas = await window.variables.get(VARIABLE.canvas);
      const num = canvas || 0;
      await window.variables.set(VARIABLE.canvas, num + 1);

      // eslint-disable-next-line
      (this as any).commit(TabsConctrol.tabsActiveChange, index);

      if (index === 0) router.push({ name: ROUTER.workArea });
    },
    [TabsConctrol.tabsActiveChange](state: AppStore.State, id: number): void {
      state.canvas.forEach((tab) => {
        if (tab.active)
          // eslint-disable-next-line
          (this as any).commit(TabsConctrol.setActiveCanvasHistory, tab.id);
        tab.active = tab.id === id;
      });
    },
    async [TabsConctrol.destroyCanvas](
      state: AppStore.State,
      id: number
    ): Promise<void> {
      const index = state.canvas.findIndex((item) => item.id === id);
      const destroyCanvas = state.canvas.splice(index, 1);
      state.destroyCanvas.push(destroyCanvas[0]);
      if (state.activeCanvasHistory.has(id))
        state.activeCanvasHistory.delete(id);
      const history = [...state.activeCanvasHistory];
      const historyId = history[history.length - 1];

      const canvas = await window.variables.get(VARIABLE.canvas);
      const num = canvas || 0;
      await window.variables.set(VARIABLE.canvas, num - 1);

      if (historyId !== undefined) {
        // eslint-disable-next-line
        (this as any).commit(TabsConctrol.tabsActiveChange, historyId);
      } else {
        router.push({ name: ROUTER.welcome });
      }
    },
    [TabsConctrol.currentTabsActive](
      state: AppStore.State
    ): AppStore.Canvas | undefined {
      return state.canvas.find((tab) => tab.active);
    },
    [TabsConctrol.setActiveCanvasHistory](
      state: AppStore.State,
      id: number
    ): void {
      if (state.activeCanvasHistory.has(id))
        state.activeCanvasHistory.delete(id);
      state.activeCanvasHistory.add(id);
    },
  },
};

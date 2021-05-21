import router from "@/router";
import { ROUTER } from "@/router/config";
import { APP } from "@/store/config";
import { AppStore } from "@/types/store/app";

export const tabsConctrol = {
  [APP.createCanvas](state: AppStore.State): void {
    const index = state.canvas.length;
    state.canvas.push({
      id: index,
      name: `新建画布 ${index + 1}`,
      desc: `新建画布 ${index + 1}`,
      active: false,
    });

    // eslint-disable-next-line
    (this as any).commit(APP.tabsActiveChange, index);

    if (index === 0) router.push({ name: ROUTER.workArea });
  },
  [APP.tabsActiveChange](state: AppStore.State, id: number): void {
    state.canvas.forEach((tab) => {
      // eslint-disable-next-line
      if (tab.active) (this as any).commit(APP.setActiveCanvasHistory, tab.id);
      tab.active = tab.id === id;
    });
  },
  [APP.destroyCanvas](state: AppStore.State, id: number): void {
    const index = state.canvas.findIndex((item) => item.id === id);
    const destroyCanvas = state.canvas.splice(index, 1);
    state.destroyCanvas.push(destroyCanvas[0]);
    if (state.activeCanvasHistory.has(id)) state.activeCanvasHistory.delete(id);
    const history = [...state.activeCanvasHistory];
    const historyId = history[history.length - 1];
    if (historyId !== undefined) {
      // eslint-disable-next-line
      (this as any).commit(APP.tabsActiveChange, historyId);
    } else {
      router.push({ name: ROUTER.welcome });
    }
  },
  [APP.currentTabsActive](state: AppStore.State): AppStore.Canvas | undefined {
    return state.canvas.find((tab) => tab.active);
  },
  [APP.setActiveCanvasHistory](state: AppStore.State, id: number): void {
    if (state.activeCanvasHistory.has(id)) state.activeCanvasHistory.delete(id);
    state.activeCanvasHistory.add(id);
  },
};

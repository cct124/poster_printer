import { AppStore } from "@/types/store/app";

interface StoreState {
  App: AppStore.State;
}

export default {
  canvas: (state: StoreState): AppStore.Canvas[] => state.App.canvas,
  currentCanvas: (state: StoreState): AppStore.Canvas[] =>
    state.App.canvas.filter((tab) => tab.active),
  destroyCanvas: (state: StoreState): AppStore.Canvas[] =>
    state.App.destroyCanvas,
};

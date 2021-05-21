import { AppStore } from "@/types/store/app";

interface StoreState {
  App: AppStore.State;
}

export default {
  canvas: (state: StoreState): AppStore.Route[] => state.App.canvas,
};

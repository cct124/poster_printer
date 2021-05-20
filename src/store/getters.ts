import { AppStore } from "@/types/store/app";

interface StoreState {
  app: AppStore.State;
}

export default {
  canvas: (state: StoreState): AppStore.Route[] => state.app.canvas,
};

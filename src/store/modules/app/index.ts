import { tabsConctrol } from "./tabsConctrol";
import { toolsStore } from "./tools";
import { MutationTree } from "vuex";
import { AppStore } from "@/types/store/app";

interface AppMutationTree {
  state: AppStore.State;
  mutations: {
    activeTool(state: AppStore.State, id: number): void;
    createCanvas(state: AppStore.State, name: string, desc: string): void;
    tabsActiveChange(state: AppStore.State, id: number): void;
    destroyCanvas(state: AppStore.State, id: number): void;
    currentTabsActive(state: AppStore.State): AppStore.Canvas | undefined;
    setActiveCanvasHistory(state: AppStore.State, id: number): void;
  };
}

export const App: MutationTree<AppMutationTree> = {
  state: () => ({ ...toolsStore.state, ...tabsConctrol.state }),
  mutations: () => ({
    ...toolsStore.mutations,
    ...tabsConctrol.mutations,
  }),
  actions: () => ({}),
};

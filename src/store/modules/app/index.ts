import { tabsConctrol } from "./tabsConctrol";
import { toolsStore } from "./tools";
import { Module } from "vuex";

// eslint-disable-next-line
export const App: Module<any, any> = {
  state: { ...toolsStore.state, ...tabsConctrol.state },
  mutations: {
    ...toolsStore.mutations,
    ...tabsConctrol.mutations,
  },
  actions: {},
};

import { tabsConctrol } from "./tabsConctrol";
import { toolsStore } from "./tools";

export const App = {
  state: {
    ...toolsStore.state,
    ...tabsConctrol.state,
  },
  mutations: {
    ...toolsStore.mutations,
    ...tabsConctrol.mutations,
  },
  actions: {},
};

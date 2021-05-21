import { tabsConctrol } from "./tabsConctrol";
export const App = {
  state: {
    canvas: [],
    destroyCanvas: [],
    activeCanvasHistory: new Set(),
  },
  mutations: {
    ...tabsConctrol,
  },
  actions: {},
};

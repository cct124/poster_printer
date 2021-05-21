import { createStore } from "vuex";
import { App } from "./modules/app/index";
import getters from "./getters";

export default createStore({
  modules: { App },
  getters,
});

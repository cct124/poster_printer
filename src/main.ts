import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/main.scss";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "@/icons/index";
import SvgIcon from "@/components/Basic/SvgIcon/index.vue"; // svg component

createApp({
  ...App,
  globalProperties: {
    $ipcRenderer: window.ipcRenderer,
  },
})
  .component("SvgIcon", SvgIcon)
  .use(store)
  .use(router)
  .mount("#app");

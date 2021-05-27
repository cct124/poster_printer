import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/main.scss";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "@/icons/index";
import { registereComponent } from "@/plugin/registereComponent";
import { ElInput } from "element-plus";
const app = createApp(App);

app.config.globalProperties = {
  $ipcRenderer: window.ipcRenderer,
};

registereComponent(app);

app.use(store).use(ElInput).use(router).mount("#app");

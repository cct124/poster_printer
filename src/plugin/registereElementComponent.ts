import { App } from "vue";
import {
  ElButton,
  ElColorPicker,
  ElInput,
  ElOption,
  ElSelect,
} from "element-plus";
// import "@/styles/element-variables.scss";

const elements = [ElInput, ElSelect, ElOption, ElColorPicker, ElButton];

/**
 * 注册Element组件
 * @param app
 */
export function registereElementComponent(app: App<Element>): void {
  elements.forEach((item) => {
    app.use(item);
  });
}

import { App } from "vue";
import { session, local } from "@/utils/storage";
/**
 * 注册 globalProperties 变量
 * @param app
 */
export function registereGlobalProperties(app: App<Element>): void {
  app.config.globalProperties = {
    $ipcRenderer: window.ipcRenderer,
    $variable: window.variables,
    $openColorPicker: window.openColorPicker,
    $static: __static,
    $session: session,
    $local: local,
  };
}

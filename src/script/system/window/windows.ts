import { app } from "electron";
import WINDOWS from "@/script/config/windows";
import path from "path";
import { VALIDCHANNELS } from "../events";

/**
 * 窗口列表类
 */
class Windows {
  /**
   * 窗口配置项保存到 Map 对象
   */
  private windowsMap: Map<WINDOWS, MainWindow.WindowConfig>;

  constructor(windows?: [[WINDOWS, MainWindow.WindowConfig]]) {
    this.windowsMap = new Map(windows);
  }

  /**
   * 设置窗口配置项
   * @param key
   * @param value
   * @returns
   */
  set(key: WINDOWS, value: MainWindow.WindowConfig) {
    return this.windowsMap.set(key, value);
  }

  /**
   * 获取窗口配置项
   * @param key
   * @returns
   */
  get(key: WINDOWS) {
    return this.windowsMap.get(key);
  }

  /**
   * 方法返回一个布尔值，表示某个键是否在当前 Map 对象之中
   * @param key
   * @returns
   */
  has(key: WINDOWS) {
    return this.windowsMap.has(key);
  }
}

export default new Windows([
  [
    WINDOWS.MAIN,
    {
      loadURL: "app://./index.html",
      options: {
        width: 1280,
        height: 720,
        frame: false,
        webPreferences: {
          // Required for Spectron testing
          enableRemoteModule: !!process.env.IS_TEST,

          // Use pluginOptions.nodeIntegration, leave this alone
          // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
          nodeIntegration: process.env
            .ELECTRON_NODE_INTEGRATION as unknown as boolean,
          contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
          preload: path.join(app.getAppPath(), "preload.js"),
        },
      },
      ready(window) {
        window.on("maximize", () => {
          window.webContents.send(VALIDCHANNELS.imizeChange, true);
        });
        window.on("unmaximize", () => {
          window.webContents.send(VALIDCHANNELS.imizeChange, false);
        });
        window.on("blur", () => {
          window.webContents.send(VALIDCHANNELS.windowBlur, "blur");
        });
      },
    },
  ],
]);

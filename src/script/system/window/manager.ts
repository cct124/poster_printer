import { BrowserWindow } from "electron";
import WINDOWS from "@/script/config/windows";
import windows from "@/script/system/window/windows";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import { queryParams } from "@/utils/tool";
class WindowManager {
  private windowMap: Map<number, MainWindow.WindowMapValue> = new Map();
  private windowIdMap: Map<WINDOWS, number[]> = new Map();

  /**
   * 创建 window 窗口
   * @param key
   * @returns
   */
  createWindow(key: WINDOWS, options: WindowManager.options = { options: {} }) {
    return new Promise<MainWindow.WindowMapValue | undefined>(
      async (resolve, reject) => {
        if (!windows.has(key)) return reject(null);
        const windowConfig = windows.get(key)!;

        if (windowConfig.unique) {
          for (const [_key, value] of this.windowMap) {
            if (value.type === key) return reject(null);
          }
        }

        const window = new BrowserWindow({
          ...windowConfig.options,
          ...options.options,
        });

        this.windowMap.set(window.id, {
          type: key,
          window,
        });

        if (windowConfig.ready) windowConfig.ready(window);

        let query = "";

        if (options.query) query = "?" + queryParams(options.query);

        if (process.env.WEBPACK_DEV_SERVER_URL) {
          let baseUrl = process.env.WEBPACK_DEV_SERVER_URL;
          if (windowConfig.dev && windowConfig.dev.hash)
            baseUrl = baseUrl + windowConfig.dev.hash;
          // Load the url of the dev server if in development mode
          await window.loadURL((baseUrl as string) + query);

          if (
            !process.env.IS_TEST &&
            (!windowConfig.dev ||
              !windowConfig.dev.devTools ||
              windowConfig.dev.devTools.open !== false)
          ) {
            const options =
              windowConfig.dev &&
              windowConfig.dev.devTools &&
              windowConfig.dev.devTools.options;

            window.webContents.openDevTools(options);
          }

          if (!windowConfig.dev || windowConfig.dev.reload !== false)
            window.webContents.on("before-input-event", (event, input) => {
              if (input.key === "F5") window.webContents.reload();
            });
        } else {
          createProtocol("app");
          // Load the index.html when not in development
          window.loadURL(windowConfig.loadURL + query);
        }

        if (!this.windowIdMap.has(key)) this.windowIdMap.set(key, []);
        this.windowIdMap.get(key)!.push(window.id);

        // // window.once("ready-to-show", () => {
        // //   resolve(this.windowMap.get(window.id));
        // // });

        // window.webContents.once("did-frame-finish-load", () => {
        //   resolve(this.windowMap.get(window.id));
        // });

        const windowId = window.id;

        window.once("closed", () => {
          this.windowMap.delete(windowId);
        });

        resolve(this.windowMap.get(window.id));

      }
    );
  }

  get(key: number) {
    return this.windowMap.get(key);
  }

  has(key: number) {
    return this.windowMap.has(key);
  }

  getIds(key: WINDOWS) {
    return this.windowIdMap.get(key);
  }

  hasIds(key: WINDOWS) {
    return this.windowIdMap.has(key);
  }
}

export default new WindowManager();

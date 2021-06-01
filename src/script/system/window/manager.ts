import { BrowserWindow } from "electron";
import WINDOWS from "@/script/config/windows";
import windows from "@/script/system/window/windows";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";

class WindowManager {
  private windowMap: Map<number, MainWindow.WindowMapValue> = new Map();
  private windowIdMap: Map<WINDOWS, number[]> = new Map();

  /**
   * 创建 window 窗口
   * @param key
   * @returns
   */
  createWindow(
    key: WINDOWS,
    options: Electron.BrowserWindowConstructorOptions = {}
  ) {
    return new Promise<MainWindow.WindowMapValue | undefined>(
      async (resolve, reject) => {
        if (!windows.has(key)) return reject(null);
        const windowConfig = windows.get(key)!;

        // if (process.env.WEBPACK_DEV_SERVER_URL) {
        //   if (
        //     !process.env.IS_TEST &&
        //     (!windowConfig.dev ||
        //       !windowConfig.dev.devTools ||
        //       windowConfig.dev.devTools.open !== false)
        //   ) {
        //     const options =
        //       windowConfig.dev &&
        //       windowConfig.dev.devTools &&
        //       windowConfig.dev.devTools.options;
        //     if (!options || (options && options.mode !== "detach")) {
        //       windowConfig.options.width = windowConfig.options.width! + 474;
        //     }
        //   }
        // }

        const window = new BrowserWindow({
          ...windowConfig.options,
          ...options,
        });

        this.windowMap.set(window.id, {
          type: key,
          window,
        });

        if (windowConfig.ready) windowConfig.ready(window);

        if (process.env.WEBPACK_DEV_SERVER_URL) {
          let baseUrl = process.env.WEBPACK_DEV_SERVER_URL;
          if (windowConfig.dev && windowConfig.dev.hash)
            baseUrl = baseUrl + windowConfig.dev.hash;
          // Load the url of the dev server if in development mode
          await window.loadURL(baseUrl as string);

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
          window.loadURL(windowConfig.loadURL);
        }

        if (!this.windowIdMap.has(key)) this.windowIdMap.set(key, []);
        this.windowIdMap.get(key)!.push(window.id);

        window.once("ready-to-show", () => {
          resolve(this.windowMap.get(window.id));
        });
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

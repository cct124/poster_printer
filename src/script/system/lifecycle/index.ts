import { app, protocol, BrowserWindow, nativeTheme } from "electron";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";
import windowManager from "@/script/system/window/manager";
import WINDOW from "@/script/config/windows";
import WindowMenu from "@/script/system/menu";

/**
 * app 生命周期
 */
export default class Lifecycle {
  constructor() {
    this.init();
  }

  /**
   * 生命周期初始化
   */
  private init() {
    this.beforeReady();
    this.ready();
  }

  private beforeReady() {
    // Scheme must be registered before the app is ready
    protocol.registerSchemesAsPrivileged([
      { scheme: "app", privileges: { secure: true, standard: true } },
    ]);
  }

  private ready() {
    // Quit when all windows are closed.
    app.on("window-all-closed", () => {
      // On macOS it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    app.on("activate", () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0)
        windowManager.createWindow(WINDOW.MAIN);
    });

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.whenReady().then(async () => {
      if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
          await installExtension(VUEJS3_DEVTOOLS)
            .then((name) => {
              console.log(`Added Extension:  ${name}`);
            })
            .catch((err) => console.log("An error occurred: ", err));
        } catch (e) {
          console.error("Vue Devtools failed to install:", e.toString());
        }
      }
      windowManager.createWindow(WINDOW.MAIN);
      new WindowMenu();
    });

    // Exit cleanly on request from parent process in development mode.
    if (isDevelopment) {
      if (process.platform === "win32") {
        process.on("message", (data) => {
          if (data === "graceful-exit") {
            app.quit();
          }
        });
      } else {
        process.on("SIGTERM", () => {
          app.quit();
        });
      }
    }
  }
}

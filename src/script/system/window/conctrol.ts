import { ipcMain, ipcRenderer } from "electron";
import { VALIDCHANNELS } from "../events";
import windowManager from "./manager";

export enum WINDOW_CONCTROL {
  /**
   * 左按钮，最小化
   */
  left = "left",
  /**
   * 中间按钮，窗口最大化
   */
  middle = "middle",
  /**
   * 右按钮，关闭窗口
   */
  right = "right",
}

export class WindowConctrol {
  constructor() {
    this.init();
  }

  init() {
    this.listener();
  }

  listener() {
    ipcMain.on(VALIDCHANNELS.windowConctrol, (event, args: WINDOW_CONCTROL) => {
      const window = windowManager.get(event.frameId)!.window;
      switch (args) {
        case WINDOW_CONCTROL.left:
          this.left(window);
          break;

        case WINDOW_CONCTROL.middle:
          this.middle(window);
          break;

        case WINDOW_CONCTROL.right:
          this.right(window);
          break;

        default:
          break;
      }
    });
  }

  /**
   * 最小化窗口
   * @param window
   */
  left(window: Electron.BrowserWindow) {
    window.minimize();
  }
  middle(window: Electron.BrowserWindow) {
    /**
     * 判断是否最大化
     */
    if (window.isMaximized()) {
      window.restore();
      window.webContents.send(VALIDCHANNELS.imizeChange, false);
    } else {
      window.maximize();
      window.webContents.send(VALIDCHANNELS.imizeChange, true);
    }
  }
  /**
   * 关闭窗口
   * @param window 
   */
  right(window: Electron.BrowserWindow) {
    window.destroy();
  }
}

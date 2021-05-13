import { app, BrowserWindow, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import path from 'path';

class WindowManager {
  private windowMap: Map<number, BrowserWindow> = new Map();

  async createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
      width: 1280,
      height: 720,
      // frame: false,
      title: 'Electron Vue3',
      webPreferences: {
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: (process.env
          .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
        contextIsolation: true, // protect against prototype pollution
        enableRemoteModule: false, // turn off remote
        preload: path.join(__dirname, 'preload.js')
      },
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
      if (!process.env.IS_TEST) win.webContents.openDevTools();
    } else {
      createProtocol("app");
      // Load the index.html when not in development
      win.loadURL("app://./index.html");
    }

    this.windowMap.set(win.id, win);

    win.webContents.on('new-window', (event) => {
      event.preventDefault()
    })
  }

  get(id: number) {
    return this.windowMap.get(id)
  }
}

export const windowManager = new WindowManager()

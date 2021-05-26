import { MENUS_ID } from "@/script/config/menu";
import WindowMenu from "@/script/system/menu/windowMenu";
import windowManager from "@/script/system/window/manager";
import WINDOWS from "@/script/config/windows";
import { app } from "electron";

export default new WindowMenu([
  [
    MENUS_ID.exit,
    (event: Electron.IpcMainEvent, args: MenuList.MenusConfig) => {
      app.exit();
    },
  ],
  [
    MENUS_ID.devtools,
    (event: Electron.IpcMainEvent, args: MenuList.MenusConfig) => {
      const window = windowManager.get(event.frameId)!.window;
      window.webContents.openDevTools();
    },
  ],
  [
    MENUS_ID.create,
    (event: Electron.IpcMainEvent, args: MenuList.MenusConfig) => {
      const parent = windowManager.get(event.frameId)!.window;
      windowManager.createWindow(WINDOWS.CREATE_CANVAS, { parent });
    },
  ],
]);

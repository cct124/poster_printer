import { MENUS_ID } from "@/script/config/menu";
import WindowMenu from "@/script/system/menu/windowMenu";
import { app } from "electron";

export default new WindowMenu([
  [
    MENUS_ID.create,
    (event: Electron.IpcMainEvent, args: MenuList.MenusConfig) => {
      console.log(args);
    },
  ],
  [
    MENUS_ID.exit,
    (event: Electron.IpcMainEvent, args: MenuList.MenusConfig) => {
      app.exit();
    },
  ],
]);

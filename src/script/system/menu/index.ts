import { ipcMain } from "electron";
import { MENUS_ID } from "@/script/config/menu";
import { VALIDCHANNELS } from "@/script/system/events";

class WindowMenu {
  private menuMap: Map<MENUS_ID, Function>;
  constructor(maps?: [[MENUS_ID, Function]]) {
    this.menuMap = maps ? new Map(maps) : new Map();
  }

  /**
   * 注册与菜单id绑定的函数
   * @param key
   * @param fn
   */
  registered(key: MENUS_ID, fn: Function) {
    if (this.menuMap.has(key)) return false;
    this.menuMap.set(key, fn);
  }

  /**
   * 获取与id绑定的函数
   * @param key
   * @returns
   */
  get(key: MENUS_ID) {
    return this.menuMap.get(key);
  }

  /**
   * 删除 map
   * @param key
   * @returns
   */
  delete(key: MENUS_ID) {
    return this.menuMap.delete(key);
  }

  /**
   * 判断是否已注册函数
   * @param key
   * @returns
   */
  has(key: MENUS_ID) {
    return this.menuMap.has(key);
  }

  onIpcMsg(channel: VALIDCHANNELS) {
    ipcMain.on(channel, (event, args) => {
      console.log(args);
    });
  }
}

export default new WindowMenu();

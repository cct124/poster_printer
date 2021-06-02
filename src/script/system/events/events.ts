import { ipcMain } from "electron";
import { VALIDCHANNELS } from "@/script/config/ipcChannels";

export default class IpcEvent {
  private ipcEventMap: Map<VALIDCHANNELS, Set<Function>>;

  constructor(maps?: [VALIDCHANNELS, Set<Function>][]) {
    this.ipcEventMap = maps ? new Map(maps) : new Map();
  }

  /**
   * 注册与模块id绑定的Set对象
   * @param key
   * @param fn
   */
  reg(
    key: VALIDCHANNELS,
    fn: (event: Electron.IpcMainEvent, ...args: any[]) => void
  ) {
    if (!VALIDCHANNELS[key]) return false;
    if (this.has(key)) {
      const set = this.get(key)!;
      set.add(fn);
    } else {
      this.ipcEventMap.set(key, new Set([fn]));
      this.listener(key);
    }
  }

  /**
   * 获取与id绑定的Set对象
   * @param key
   * @returns
   */
  get(key: VALIDCHANNELS) {
    return this.ipcEventMap.get(key);
  }

  /**
   * 删除 map
   * @param key
   * @returns
   */
  delete(key: VALIDCHANNELS) {
    return this.ipcEventMap.delete(key);
  }

  /**
   * 判断是否已注册Set对象
   * @param key
   * @returns
   */
  has(key: VALIDCHANNELS) {
    return this.ipcEventMap.has(key);
  }

  /**
   * 监听消息
   * @param key
   */
  listener(key: VALIDCHANNELS) {
    ipcMain.on(key, (event, ...args) => this.run(key, event, ...args));
  }

  /**
   * 执行函数组
   * @param key
   * @param event
   * @param args
   * @returns
   */
  run(key: VALIDCHANNELS, event: Electron.IpcMainEvent, ...args: any[]) {
    if (!this.has(key)) return false;
    const set = this.get(key)!;
    for (const iterator of set.values()) {
      iterator(event, ...args);
    }
  }
}

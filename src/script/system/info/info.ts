import { INFO } from "@/script/config/info";
import { VALIDCHANNELS } from "@/script/system/events/config";
import { ipcMain } from "electron";
import windowManager from "@/script/system/window/manager";

/**
 * 开发获取信息通信频道
 */
export class Info {
  private infoMap: Map<INFO, Function>;

  constructor(infos?: [INFO, Function][]) {
    this.infoMap = infos ? new Map(infos) : new Map();
  }

  registered(key: INFO, fn: Function) {
    return this.infoMap.set(key, fn);
  }

  listener() {
    ipcMain.on(VALIDCHANNELS.info, (event, key: INFO) => {
      if (this.infoMap.has(key)) {
        const info = this.infoMap.get(key)!();
        if (windowManager.has(event.frameId)) {
          const window = windowManager.get(event.frameId)!.window;
          window.webContents.send(key, info);
        }
      }
    });
  }
}

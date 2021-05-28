import { contextBridge, ipcRenderer } from "electron";
import { VALIDCHANNELS } from "@/script/system/events/config";
import { INFO } from "@/script/config/info";

/**
 * Expose protected methods that allow the renderer process to use
 * the ipcRenderer without exposing the entire object
 */
export function exposeIpcRendererMethods() {
  contextBridge.exposeInMainWorld("ipcRenderer", {
    send: (channel: VALIDCHANNELS, data: any) => {
      if (VALIDCHANNELS[channel]) {
        ipcRenderer.send(channel, data);
      }
    },
    get: (channel: VALIDCHANNELS, data: any) => {
      return new Promise<any>((resolve, reject) => {
        if (VALIDCHANNELS[channel]) {
          ipcRenderer.send(channel, data);
          ipcRenderer.once(channel, (event, args) =>
            resolve({
              event,
              args,
            })
          );
        } else {
          reject(new Error("无效 channel"));
        }
      });
    },
    info: (channel: VALIDCHANNELS, id: INFO) => {
      return new Promise<any>((resolve, reject) => {
        if (VALIDCHANNELS[channel]) {
          ipcRenderer.send(channel, id);
          ipcRenderer.once(id, (event, args) =>
            resolve({
              event,
              args,
            })
          );
        } else {
          reject(new Error("无效 channel"));
        }
      });
    },
    on: (channel: VALIDCHANNELS, listener: Function) => {
      if (VALIDCHANNELS[channel]) {
        // Deliberately strip event as it includes `sender`
        const subscription = (
          event: Electron.IpcRendererEvent,
          ...args: any[]
        ) => listener(...args);
        ipcRenderer.on(channel, subscription);
        return () => {
          ipcRenderer.removeListener(channel, subscription);
        };
      }
    },
    once: (channel: VALIDCHANNELS, listener: Function) => {
      if (VALIDCHANNELS[channel]) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => listener(...args));
      }
    },
    removeAllListeners: (channel: VALIDCHANNELS) => {
      if (VALIDCHANNELS[channel]) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.removeAllListeners(channel);
      }
    },
    /**
     * 
     * @param hexadecimal 打开拾色器窗口
     * @param desc 
     */
    openColorPicker: (hexadecimal: string, desc: string) => {
      ipcRenderer.send(VALIDCHANNELS.openColorPicker, hexadecimal, desc);
    },
  });
}

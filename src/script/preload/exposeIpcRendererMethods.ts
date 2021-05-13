import { contextBridge, ipcRenderer } from "electron";
import { VALIDCHANNELS } from "@/script/system/events";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel: VALIDCHANNELS, data: any) => {
    if (VALIDCHANNELS[channel]) {
      ipcRenderer.send(channel, data);
    }
  },
  on: (channel: VALIDCHANNELS, listener: Function) => {
    if (VALIDCHANNELS[channel]) {
      // Deliberately strip event as it includes `sender`
      const subscription = (event: Electron.IpcRendererEvent, ...args: any[]) =>
        listener(...args);
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
});
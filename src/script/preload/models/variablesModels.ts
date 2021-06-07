import { VALIDCHANNELS } from "@/script/config/ipcChannels";
import { VARIABLE } from "@/script/config/variable";
import { ipcRenderer } from "electron";
/**
 * 公共变量
 */
export default {
  get: (key: VARIABLE, ...args: any[]) => {
    return new Promise<any>((resolve, reject) => {
      ipcRenderer.send(VALIDCHANNELS.variableGet, key, ...args);
      ipcRenderer.on(VALIDCHANNELS.variableReply, (event, res) => {
        resolve(res);
      });
    });
  },

  set: (key: VARIABLE, value: any) => {
    return new Promise<any>((resolve, reject) => {
      ipcRenderer.send(VALIDCHANNELS.variableSet, key, value);
      ipcRenderer.on(VALIDCHANNELS.variableReply, (event, res) => {
        resolve(res);
      });
    });
  },

  reg: (key: VARIABLE, value: any) => {
    return new Promise<any>((resolve, reject) => {
      ipcRenderer.send(VALIDCHANNELS.variableReg, key, value);
      ipcRenderer.on(VALIDCHANNELS.variableReply, (event, res) => {
        resolve(res);
      });
    });
  },

  delete: (key: VARIABLE) => {
    return new Promise<any>((resolve, reject) => {
      ipcRenderer.send(VALIDCHANNELS.variableDelete, key);
      ipcRenderer.on(VALIDCHANNELS.variableReply, (event, res) => {
        resolve(res);
      });
    });
  },

  has: (key: VARIABLE) => {
    return new Promise<any>((resolve, reject) => {
      ipcRenderer.send(VALIDCHANNELS.variableHas, key);
      ipcRenderer.on(VALIDCHANNELS.variableReply, (event, res) => {
        resolve(res);
      });
    });
  },
};

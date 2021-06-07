import { VARIABLE } from "@/script/config/variable";
import { variable } from "./variable";
import os from "os";
import { app, ipcMain } from "electron";
import { VALIDCHANNELS } from "@/script/config/ipcChannels";

export default function () {
  variable.reg(VARIABLE.info, () => {
    return {
      platform: process.platform,
      versions: process.versions,
      systemType: os.type(),
      arch: os.arch(),
      systemVersion: os.release(),
      appVersion: app.getVersion(),
    };
  });

  ipcMain.on(VALIDCHANNELS.variableGet, (event, key: VARIABLE, ...args) => {
    event.reply(VALIDCHANNELS.variableReply, variable.get(key, args));
  });

  ipcMain.on(VALIDCHANNELS.variableReg, (event, key: VARIABLE, value: any) => {
    event.reply(VALIDCHANNELS.variableReply, variable.reg(key, value));
  });

  ipcMain.on(VALIDCHANNELS.variableHas, (event, key: VARIABLE) => {
    event.reply(VALIDCHANNELS.variableReply, variable.has(key));
  });

  ipcMain.on(VALIDCHANNELS.variableSet, (event, key: VARIABLE, value: any) => {
    event.reply(VALIDCHANNELS.variableReply, variable.set(key, value));
  });

  ipcMain.on(VALIDCHANNELS.variableDelete, (event, key: VARIABLE) => {
    event.reply(VALIDCHANNELS.variableReply, variable.delete(key));
  });
}

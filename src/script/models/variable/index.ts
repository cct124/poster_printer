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

  variable.reg(VARIABLE.canvas, 0);

  ipcMain.on(VALIDCHANNELS.variableGet, (event, key: VARIABLE, ...args) => {
    const value = variable.get(key, ...args);
    event.reply(VALIDCHANNELS.variableReply, value);
  });

  ipcMain.on(VALIDCHANNELS.variableReg, (event, key: VARIABLE, value: any) => {
    variable.reg(key, value);
    event.reply(VALIDCHANNELS.variableReply, variable.get(key));
  });

  ipcMain.on(VALIDCHANNELS.variableHas, (event, key: VARIABLE) => {
    event.reply(VALIDCHANNELS.variableReply, variable.has(key));
  });

  ipcMain.on(VALIDCHANNELS.variableSet, (event, key: VARIABLE, value: any) => {
    variable.set(key, value);
    event.reply(VALIDCHANNELS.variableReply, variable.get(key));
  });

  ipcMain.on(VALIDCHANNELS.variableDelete, (event, key: VARIABLE) => {
    event.reply(VALIDCHANNELS.variableReply, variable.delete(key));
  });
}

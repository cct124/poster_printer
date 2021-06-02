import { ipcRenderer } from "electron";
import { VALIDCHANNELS } from "@/script/config/ipcChannels";

/**
 * 打开拾色器窗口
 * @param hex 十六进制色值
 * @param desc 窗口描述
 */
export default function (hex: string = "#ffffff", desc: string = "") {
  return new Promise((resolve, reject) => {
    try {
      ipcRenderer.send(VALIDCHANNELS.openColorPicker, hex, desc);
      ipcRenderer.once(VALIDCHANNELS.colorPickerValue, (event, hex) => {
        resolve(hex);
      });
    } catch (err) {
      reject(err);
    }
  });
}

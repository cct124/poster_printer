import { ipcRenderer } from "electron";
import { VALIDCHANNELS } from "@/script/system/events/config";

/**
 * 打开拾色器窗口
 * @param hexadecimal 十六进制色值
 * @param desc 窗口描述
 */
export default function (hexadecimal: string, desc: string) {
  ipcRenderer.send(VALIDCHANNELS.openColorPicker, hexadecimal, desc);
}

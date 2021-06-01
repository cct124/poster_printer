import ipcEvent from "@/script/system/events/index";
import { VALIDCHANNELS } from "@/script/config/ipcChannels";
import windowManager from "@/script/system/window/manager";
import WINDOWS from "@/script/config/windows";

export default function () {
  ipcEvent.reg(VALIDCHANNELS.openColorPicker, (event) => {
    const parent = windowManager.get(event.frameId)!.window;
    windowManager.createWindow(WINDOWS.COLOR_PICKER, { parent });
  });
}

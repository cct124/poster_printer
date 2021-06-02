import ipcEvent from "@/script/system/events/index";
import { VALIDCHANNELS } from "@/script/config/ipcChannels";
import windowManager from "@/script/system/window/manager";
import WINDOWS from "@/script/config/windows";

export default function () {
  ipcEvent.reg(
    VALIDCHANNELS.openColorPicker,
    (event, color: string, desc: string) => {
      const parent = windowManager.get(event.frameId)!.window;
      windowManager.createWindow(WINDOWS.COLOR_PICKER, {
        options: { parent },
        query: { color, desc },
      });
    }
  );
}

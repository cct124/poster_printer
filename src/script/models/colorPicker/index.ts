import ipcEvent from "@/script/system/events/index";
import { VALIDCHANNELS } from "@/script/config/ipcChannels";

export default function () {
  ipcEvent.reg(VALIDCHANNELS.openColorPicker, () => {
    console.log("open");
  });
}

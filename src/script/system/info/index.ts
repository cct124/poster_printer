import os from "os";
import { Info } from "./info";
import { INFO } from "@/script/config/info";
import { app } from "electron";

export const info = new Info([
  [INFO.platform, () => process.platform],
  [INFO.versions, () => process.versions],
  [INFO.systemType, () => os.type()],
  [INFO.arch, () => os.arch()],
  [INFO.systemVersion, () => os.release()],
  [INFO.appVersion, () => app.getVersion()],
]);

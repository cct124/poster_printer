import { Info } from "./info";
import { INFO } from "@/script/config/info";
import os from "os";

export const info = new Info([[INFO.platform, () => os.platform()]]);

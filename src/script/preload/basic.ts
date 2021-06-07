import { MODELS } from "./models/config";
import { models } from "./models/model";

models.exposes([MODELS.ipcRenderer, MODELS.openColorPicker, MODELS.variables]);

import ModelsManager from "./modelsManager";
import colorPicker from "./colorPicker";
import variable from "./variable";
import MODELS from "@/script/config/models";

export default new ModelsManager([
  [MODELS.colorPicker, colorPicker],
  [MODELS.variable, variable],
]);

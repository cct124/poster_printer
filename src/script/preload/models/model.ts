import { MODELS } from "./config";
import ipcRenderer from "./ipcRenderer";
import variables from "./variablesModels";
import openColorPicker from "./openColorPicker";
import { contextBridge } from "electron";

export class Models {
  private models: Map<MODELS, any>;

  constructor(maps?: [MODELS, any][]) {
    this.models = maps ? new Map(maps) : new Map();
  }

  /**
   * 注册与模块id绑定的对象
   * @param key
   * @param fn
   */
  reg(key: MODELS, fn: Function) {
    if (this.models.has(key)) return false;
    this.models.set(key, fn);
  }

  /**
   * 获取与id绑定的对象
   * @param key
   * @returns
   */
  get(key: MODELS) {
    return this.models.get(key);
  }

  /**
   * 删除 map
   * @param key
   * @returns
   */
  delete(key: MODELS) {
    return this.models.delete(key);
  }

  /**
   * 判断是否已注册模块
   * @param key
   * @returns
   */
  has(key: MODELS) {
    return this.models.has(key);
  }

  /**
   * 暴露模块
   * @param name
   * @returns
   */
  expose(name: MODELS) {
    if (!this.has(name)) return;
    const model = this.get(name);
    contextBridge.exposeInMainWorld(name, model);
  }

  /**
   * 暴露模块组
   * @param name
   * @returns
   */
  exposes(models: MODELS[]) {
    models.forEach((model) => {
      this.expose(model);
    });
  }
}

export const models = new Models([
  [MODELS.ipcRenderer, ipcRenderer],
  [MODELS.openColorPicker, openColorPicker],
  [MODELS.variables, variables],
]);

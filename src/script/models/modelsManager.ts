import MODELS from "@/script/config/models";

export default class ModelsManager {
  private models: Map<MODELS, any>;

  constructor(maps?: [MODELS, any][]) {
    this.models = maps ? new Map(maps) : new Map();
  }

  /**
   * 注册与id绑定的模块函数
   * @param key
   * @param fn
   */
  reg(key: MODELS, fn: any) {
    if (this.models.has(key)) return false;
    this.models.set(key, fn);
  }

  /**
   * 获取与id绑定的模块函数
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
   * 判断是否已注册模块函数
   * @param key
   * @returns
   */
  has(key: MODELS) {
    return this.models.has(key);
  }

  /**
   * 执行模块函数
   * @param key
   * @param args
   * @returns
   */
  run(key: MODELS, ...args: any[]) {
    if (!this.has(key)) return false;
    return this.get(key)!(args);
  }
}

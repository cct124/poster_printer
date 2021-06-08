import { VARIABLE } from "@/script/config/variable";
import { isFunction } from "@/utils/tool";

export class Variable {
  private variable: Map<VARIABLE, any>;

  constructor(maps?: [VARIABLE, any][]) {
    this.variable = maps ? new Map(maps) : new Map();
  }

  /**
   * 注册与id绑定的变量函数
   * @param key
   * @param fn
   */
  reg(key: VARIABLE, fn: any) {
    if (this.variable.has(key)) return false;
    return this.variable.set(key, fn);
  }

  /**
   * 获取与id绑定的函数
   * @param key
   * @returns
   */
  get(key: VARIABLE, ...args: any[]) {    
    if (!this.has(key)) return undefined;
    const value = this.variable.get(key);
    if (isFunction(value)) return value(...args);
    return value;
  }

  set(key: VARIABLE, value: any) {
    if (!this.has(key)) return undefined;
    return this.variable.set(key, value);
  }

  /**
   * 删除 map
   * @param key
   * @returns
   */
  delete(key: VARIABLE) {
    return this.variable.delete(key);
  }

  /**
   * 判断是否已注册函数
   * @param key
   * @returns
   */
  has(key: VARIABLE) {
    return this.variable.has(key);
  }
}

export const variable = new Variable();

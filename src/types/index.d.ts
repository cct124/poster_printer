import { VALIDCHANNELS } from "@/script/config/ipcChannels";
import { MENUS_ID } from "@/script/config/menu";
import WINDOWS from "@/script/config/windows";
import { INFO } from "@/script/config/info";
import { DefineComponent } from "vue";

interface IpcRenderer {
  /**
   * 通过`channel`将异步消息发送到主进程，以及
   * 参数。参数将使用结构化克隆算法序列化，
   * 与`window.postMessage`一样，因此原型链将不包括在内。
   * 发送函数，承诺，符号，WeakMap或WeakSet将引发
   *  例外。
   *
   * > **注意：**发送非标准的JavaScript类型，例如DOM对象或特殊
   * 电子对象将引发异常。
   *
   * 由于主进程不支持DOM对象，例如
   * `ImageBitmap`，`File`，`DOMMatrix`等，此类对象无法通过
   * 将Electron的IPC移至主要过程，因为主要过程将无法
   * 解码它们。尝试通过IPC发送此类对象将导致错误。
   *
   * 主进程通过使用`ipcMain`监听`channel`来处理它
   *  模块。
   *
   * 如果您需要将`MessagePort`转移到主进程，请使用
   * `ipcRenderer.postMessage`。
   *
   * 如果您想从主流程中收到单个答复，例如结果
   * 对于方法调用，请考虑使用`ipcRenderer.invoke`。
   */
  send: (channel: VALIDCHANNELS, data: any) => void;
  /**
   * 监听频道，当有新消息到达时，将使用listener（event，args ...）调用监听器
   */
  on: (channel: VALIDCHANNELS, listener: Function) => Function;
  /**
   * 为事件添加一次性监听器功能。仅在下一次将消息发送到通道时才调用此侦听器，然后将其删除
   */
  once: (channel: VALIDCHANNELS, listener: Function) => void;
  /**
   * 删除所有侦听器，或指定通道的侦听器
   */
  removeAllListeners: (channel: VALIDCHANNELS) => void;
  /**
   * 通过`channel`将异步消息发送到主进程
   *
   * 返回 Promise 并携带传回的参
   */
  get: (channel: VALIDCHANNELS, data: any) => Promise<unknown>;
  /**
   * 通过`channel`将异步消息发送到主进程
   *
   * 返回 Promise 并携带传回的参
   *
   * @param id 将作为回程的 channel
   */
  info: (channel: VALIDCHANNELS, id: INFO) => Promise<IPC.PromiseIpcInfo>;
}

/**
 * 获取定义在main进程的变量
 */
interface Variables {
  get: (key: VARIABLE, ...args: any[]) => Promise<any>;
  set: (key: VARIABLE, value: any) => Promise<any>;
  reg: (key: VARIABLE, value: any) => Promise<any>;
  delete: (key: VARIABLE) => Promise<any>;
  has: (key: VARIABLE) => Promise<any>;
}

declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
    openColorPicker: (hex?: string, desc?: string) => Promise<string>;
    /**
     * 获取定义在main进程的变量
     */
    variables: Variables;
  }

  module IPC {
    interface PromiseIpcInfo {
      event: Electron.IpcRendererEvent;
      args: any;
    }
  }

  /**
   * 应用菜单
   */
  module MenuList {
    interface MenusConfig {
      label?: string;
      id?: MENUS_ID;
      submenu?: MenusConfig[];
    }
  }

  module MainWindow {
    /**
     * 开发环境相关配置
     */
    interface DevConfig {
      hash?: string;
      devTools?: {
        open?: boolean;
        options?: Electron.OpenDevToolsOptions;
      };
      reload?: boolean;
    }

    /**
     * 窗口配置
     */
    interface WindowConfig {
      /**
       * 窗口加载的 URL
       */
      loadURL: string;
      /**
       * 窗口配置
       */
      options: Electron.BrowserWindowConstructorOptions;
      /**
       * 只能存在一个这种类型的窗口
       */
      unique?: boolean;
      /**
       * 开发环境相关配置
       */
      dev?: DevConfig;
      /**
       * 窗口创建后执行此函数
       */
      ready?: (window: Electron.BrowserWindow) => void;
    }

    interface WindowMapValue {
      /**
       * 窗口枚举类型
       */
      type: WINDOWS;
      /**
       * window 实例
       */
      window: Electron.BrowserWindow;
    }
  }

  module WindowManager {
    interface options {
      query?: {
        [key: string]: any;
      };
      options: Electron.BrowserWindowConstructorOptions;
    }
  }

  module Layer {
    interface BackgroundLayer {
      color: string;
    }

    interface TextLayer {
      draw: "fill" | "stroke";
      text: string;
      size: number;
      color: string;
      translateX: number;
      translateY: number;
      width: number;
      height: number;
      style: string;
      weight: number | string;
      variant: string;
      align: "start" | "end" | "left" | "right" | "center";
      baseline:
        | "top"
        | " hanging"
        | " middle"
        | " alphabetic"
        | " ideographic"
        | " bottom";
      direction: "ltr" | "rtl" | "inherit";
    }

    interface Constructor {
      canvas: CanvasClass;
    }

    interface LayerMeta {
      name: string;
      index: number;
      type: LayerType;
      meta: BackgroundLayer | TextLayer;
    }
  }

  var __static: string;

  interface ObjKey {
    [key: string]: any;
  }
}

interface Storage {
  get(key: string): any;
  set(key: string, data: any): void;
  delete(key: string): void;
  clear(): void;
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $ipcRenderer: IpcRenderer;
    $openColorPicker: (hex?: string, desc?: string) => Promise<string>;
    $static: string;
    $session: Storage;
    $local: Storage;
    $variables: Variables;
  }
}

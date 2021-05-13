import { VALIDCHANNELS } from "@/script/system/events";
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
}

interface Window {
  ipcRenderer: IpcRenderer;
}

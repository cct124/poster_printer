/**
 * whitelist channels
 * 有效的ipc频道
 */
export enum VALIDCHANNELS {
  /**
   * 向主进程发送消息
   */
  toMain = "toMain",
  /**
   * 来自主进程的消息
   */
  fromMain = "fromMain",
  /**
   * 菜单向渲染进程发送消息
   */
  menu = "menu",

  /**
   * 窗口控制按钮
   */
  windowConctrol = "windowConctrol",

  /**
   * 窗口最大最小化发生改变
   */
  imizeChange = "imizeChange",
}

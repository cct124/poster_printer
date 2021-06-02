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

  /**
   * 获取信息
   */
  info = "info",

  /**
   * 当窗口失去焦点时触发
   */
  windowBlur = "windowBlur",

  /**
   * 打开拾色器
   */
  openColorPicker = "openColorPicker",

  /**
   * 拾色器色值传输
   */
  colorPickerValue = "colorPickerValue",
}

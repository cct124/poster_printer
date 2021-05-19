export enum INFO {
  /**
   * APP 版本号
   */
  appVersion = "appVersion",

  /**
   * 返回标识操作系统平台的字符串。 该值在编译时设置。
   *
   * 可能的值有 'aix'、'darwin'、'freebsd'、'linux'、'openbsd'、'sunos'、'win32'。
   */
  platform = "platform",

  /**
   * Electron Node.js 及其依赖的版本字符串的对象
   */
  versions = "versions",

  /**
   * 获取操作系统类型
   */
  systemType = "systemType",

  /**
   * 获取操作系统版本号
   */
  systemVersion = "systemVersion",

  /**
   * 获取CPU架构
   */
  arch = "arch",
}

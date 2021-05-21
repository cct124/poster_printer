export enum APP {
  /**
   * 创建画布
   */
  createCanvas = "createCanvas",

  /**
   * 销毁画布
   */
  destroyCanvas = "destroyCanvas",

  /**
   * 改变标签页状态
   */
  tabsActiveChange = "tabsActiveChange",

  /**
   * 获取当前被选中的标签
   */
  currentTabsActive = "currentTabsActive",

  /**
   * 保存标签选择记录
   */
  setActiveCanvasHistory = "setActiveCanvasHistory",
}

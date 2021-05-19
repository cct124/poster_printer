/**
 * 菜单对应的id枚举
 */
export enum MENUS_ID {
  /**
   * 新建画布
   */
  create = "create",
  /**
   * 退出应用
   */
  exit = "exit",

  /**
   * 打开开发人员工具
   */
  devtools = "devtools",
}

export const menus = [
  {
    id: "file",
    label: "文件",
    submenu: [
      {
        id: MENUS_ID.create,
        label: "新建",
      },
      {
        type: "separator",
      },
      {
        id: MENUS_ID.exit,
        label: "退出",
      },
    ],
  },
  {
    id: "edit",
    label: "编辑",
    submenu: [
      {
        id: "revoke",
        label: "撤销",
      },
      {
        id: "restore",
        label: "恢复",
      },
    ],
  },
  {
    id: "image",
    label: "图像",
  },
  {
    id: "help",
    label: "帮助",
    submenu: [
      {
        id: "about",
        label: "关于",
      },
    ],
  },
  {
    id: "debug",
    label: "调试",
    submenu: [
      {
        id: MENUS_ID.devtools,
        label: "开发人员工具",
      },
    ],
  },
];

import { Menu } from "electron";

export default class WindowMenu {
  private defaultMenuItem: (
    | Electron.MenuItemConstructorOptions
    | Electron.MenuItem
  )[] = [
    {
      label: "文件",
      submenu: [
        { label: "新建" },
        { type: "separator" },
        { label: "退出", role: "quit" },
      ],
    },
  ];
  private menuItem: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[];
  constructor(
    menuItem: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] = []
  ) {
    this.menuItem = menuItem;
    this.init();
  }

  init() {
    const menu = Menu.buildFromTemplate([
      ...this.defaultMenuItem,
      ...this.menuItem,
    ]);
    Menu.setApplicationMenu(menu);
  }
}

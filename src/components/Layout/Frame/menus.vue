<template>
  <div class="menus ft-sm z-100" @click="clickMenusArea">
    <div
      class="menu relative"
      v-for="(menu, index) in menus"
      :key="index"
      @blur="menuBlur(menu)"
    >
      <div
        class="label flex-center"
        @click="activeMenu(menu)"
        @mouseover="mouseoverMenu(menu, menus)"
      >
        <span class="text" :class="{ active: menu.active }">{{
          menu.label
        }}</span>
      </div>
      <div
        class="submenus popups-window-shadow"
        v-if="menu.submenu && menu.active"
      >
        <template v-for="(submenu, index) in menu.submenu" :key="index">
          <div
            class="submenu"
            @click="clickSubmenu(submenu)"
            v-if="submenu.type !== 'separator'"
          >
            <div class="label pad-lr-20">{{ submenu.label }}</div>
          </div>
          <div class="separator" v-else></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { ref } from "vue";
import { menus, MENUS_ID } from "@/script/config/menu";
import { VALIDCHANNELS } from "@/script/system/events";

interface Menu {
  active: boolean;
  bottom: string;
  id: string;
  label: string;
}

interface MenusEvent extends MouseEvent {
  menus: boolean;
}

@Options({
  created() {
    this.registered();
  },
})
export default class Menus extends Vue {
  submenu = false;

  menus = setup(() =>
    ref(menus.map((menu) => ({ ...menu, active: false, bottom: "" })))
  );

  registered(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    document.addEventListener("click", (event: any) => {
      if (!event.menus) {
        this.closeAllSubmenu();
      }
    });

    this.$ipcRenderer.on(VALIDCHANNELS.windowBlur, () => {
      this.closeAllSubmenu();
    });
  }

  /**
   * 点击菜单
   */
  activeMenu(menu: Menu): void {
    menu.active = !menu.active;
    this.submenu = menu.active;
  }

  /**
   * 关闭所有子菜单
   */
  closeAllSubmenu(): void {
    this.menus.forEach((menu) => {
      menu.active = false;
    });
    this.submenu = false;
  }

  /**
   * 发送ipc消息到主进程执行动作
   */
  clickSubmenu(submenu: Menu): void {
    if (MENUS_ID[submenu.id as MENUS_ID]) {
      this.$ipcRenderer.send(
        VALIDCHANNELS.menu,
        JSON.parse(JSON.stringify(submenu))
      );
    }

    this.closeAllSubmenu();
  }

  /**
   * 鼠标移动事件
   */
  mouseoverMenu(menu: Menu, menus: Menu[]): void {
    if (!menu.active && this.submenu) {
      menus.forEach((item) => {
        item.active = item.id === menu.id;
      });
    }
  }

  clickMenusArea(event: MenusEvent): void {
    event.menus = true;
  }
}
</script>
<style lang="scss" scoped>
.menus {
  color: $frame-text;
  -webkit-app-region: no-drag;

  .menu {
    outline: none;
    display: inline-block;

    > .label {
      height: $frame-item-height;

      .text {
        padding: 5px 10px;
        &:hover {
          background: $frame-item-hover;
        }

        &.active {
          background: $frame-item-hover;
        }
      }
    }

    .submenus {
      position: absolute;
      left: 0;
      min-width: 180px;
      background: $frame-submenu-background;
      padding: 10px 2px;
      box-sizing: border-box;

      .submenu {
        &:hover {
          background: $frame-submenu-active-background;
        }

        .label {
          line-height: 25px;
        }
      }

      .separator {
        $m: 5px;
        width: calc(100% - $m * 2);
        height: 1px;
        background: #ccc;
        margin: $m;
        transform: scaleY(0.5);
      }
    }
  }
}
</style>

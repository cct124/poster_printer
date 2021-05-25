<template>
  <div class="frame w-100p flex-jcfs-aic select-none">
    <div class="logo flex-center mar-r-5">
      <SvgIcon svg="printer" />
    </div>
    <Menus />
    <div class="titlebar grow-1"></div>
    <WindowConctrol />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Menus from "./menus.vue";
import WindowConctrol from "./windowConctrol.vue";

@Options({
  components: {
    Menus,
    WindowConctrol,
  },
})
export default class Frame extends Vue {}
</script>
<style lang="scss" scoped>
.frame {
  background: $frame-background;
  -webkit-app-region: drag;

  .logo {
    width: $frame-item-height;
    height: $frame-item-height;
    .svg-icon {
      width: $frame-logo-size;
      height: $frame-logo-size;
      fill: $frame-logo;
    }
  }

  .titlebar {
    height: $frame-item-height;
  }
}
</style>

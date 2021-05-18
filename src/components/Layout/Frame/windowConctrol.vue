<template>
  <div class="window-conctrol flex-center">
    <div
      class="left conctrol-item flex-center grow-1"
      @click="windowConctrol('left')"
    >
      <SvgIcon iconClass="horizontal_line" />
    </div>
    <div
      class="middle conctrol-item flex-center grow-1"
      @click="windowConctrol('middle')"
    >
      <SvgIcon v-if="maximize" iconClass="maximize" />
      <SvgIcon v-else iconClass="maximize_normal" />
    </div>
    <div
      class="right conctrol-item flex-center grow-1"
      @click="windowConctrol('right')"
    >
      <SvgIcon iconClass="close" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { WINDOW_CONCTROL } from "@/script/system/window/conctrol";
import { VALIDCHANNELS } from "@/script/system/events";

@Options({
  created() {
    /**
     * 监听窗口最大化改变事件
     */
    this.$ipcRenderer.on(VALIDCHANNELS.imizeChange, (args: boolean) => {
      this.maximize = args;
    });
  },
})
export default class WindowConctrol extends Vue {
  maximize = false;
  windowConctrol(type: WINDOW_CONCTROL): void {
    this.$ipcRenderer.send(VALIDCHANNELS.windowConctrol, type);
  }
}
</script>
<style lang="scss" scoped>
.window-conctrol {
  width: $frame-item-height * 3;
  height: $frame-item-height;
  -webkit-app-region: no-drag;

  .conctrol-item {
    height: $frame-item-height;
    $s: 12px;
    .svg-icon {
      width: $s;
      height: $s;
      fill: $frame-text;
    }

    &:hover {
      background: $frame-item-hover;
    }
  }
}
</style>

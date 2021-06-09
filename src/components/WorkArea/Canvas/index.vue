<template>
  <div class="canvas" ref="canvas">
    <div class="group" ref="group"></div>
  </div>
</template>

<script lang="ts">
import { AppStore } from "@/types/store/app";
import { Options, Vue, prop } from "vue-class-component";
import CanvasClass from "@/plugin/canvas/Canvas";

@Options({})
export default class Canvas extends Vue.with(
  class {
    meta = prop<AppStore.CreateCanvas>({ type: Object });
  }
) {
  private value = "";

  private canvas: CanvasClass | null = null;

  created(): void {
    // console.log(this.meta);
  }

  mounted(): void {
    this.init();
  }

  unmounted(): void {
    console.log("unmounted");
  }

  private init() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const meta = this.meta!;
    this.canvas = new CanvasClass({
      width: meta.width,
      height: meta.height,
      background: meta.backgroundColor,
    });

    (this.$refs.group as HTMLElement).appendChild(this.canvas.canvasElement);
  }
}
</script>
<style lang="scss" scoped>
.canvas {
  height: calc(100% - #{$tabs-height});
}
</style>

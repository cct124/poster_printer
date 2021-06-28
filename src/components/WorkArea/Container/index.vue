<template>
  <div class="canvas-container flex">
    <div class="grow-1">
      <div class="container hidden" :ref="`container_${id}`">
        <div class="group inline-block" :ref="`group_${id}`"></div>
      </div>
      <div class="canvas-info">
        <div class="scale flex-center ft-essm">
          {{ canvasScale }}
        </div>
      </div>
    </div>
    <div class="conctrol-window">
      <LayerContainer :layer="layer" />
    </div>
  </div>
</template>

<script lang="ts">
// import { ref, Ref } from "vue";
import { AppStore } from "@/types/store/app";
import { Options, Vue, prop } from "vue-class-component";
import CanvasClass from "@/plugin/canvas/Canvas";
import Drop from "@/plugin/drop/Drop";
import Layer from "@/plugin/layer/Layer";
import ConctrolMatrix from "@/utils/conctrolMatrix";

@Options({})
export default class Container extends Vue.with(
  class {
    meta = prop<AppStore.CreateCanvas>({ type: Object });
    id = prop<number>({ type: Number });
  }
) {
  private canvas: CanvasClass | null = null;
  private conctrolMatrix: ConctrolMatrix | null = null;
  private layer: Layer | null = null;
  private canvasScale = "100%";

  mounted(): void {
    this.init();
  }

  unmounted(): void {
    console.log("unmounted");
  }

  private init() {
    const container = this.$refs[`container_${this.id}`] as HTMLElement;
    const targer = this.$refs[`group_${this.id}`] as HTMLElement;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const meta = this.meta!;
    this.canvas = new CanvasClass({
      width: meta.width,
      height: meta.height,
      background: meta.backgroundColor,
    });

    targer.appendChild(this.canvas.canvasElement);

    this.conctrolMatrix = new ConctrolMatrix({
      container,
      targer,
      matrixChange: (matrix) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.canvasScale = this.conctrolMatrix!.fp(matrix[0] * 100) + "%";
      },
    });

    this.layer = new Layer({ canvas: this.canvas });

    this.layer.createBackground(meta.backgroundColor);

    new Drop({ container });
  }
}
</script>
<style lang="scss" scoped>
.canvas-container {
  height: calc(100% - #{$tabs-height});
  .container {
    height: calc(100% - #{$canvas-info-height});
  }

  .canvas-info {
    height: $canvas-info-height;
    background-color: $frame-background;

    .scale {
      width: 50px;
      height: $canvas-info-height;
      background-color: $canvas-scale-background;
    }
  }

  .conctrol-window {
    width: $conctrol-window-width;
    background-color: $frame-background;
  }
}
</style>

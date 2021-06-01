<template>
  <div class="color-picker flex-jcfs-aic w-100vw h-100vh hidden">
    <div class="color-pool flex-center mar-l-20">
      <div class="canvas-block mar-r-20">
        <canvas
          id="block"
          ref="block"
          class="block"
          width="300"
          height="300"
          @mousedown="blockPointMousedown"
          @mousemove="blockPointMousemove($event)"
          @mouseup="blockPointMouseup"
          @mouseout="blockPointMouseout"
        ></canvas>
      </div>
      <div class="canvas-strip relative">
        <canvas
          id="strip"
          ref="strip"
          class="strip"
          width="30"
          height="300"
          @mousedown="stripPointMousedown"
          @mousemove="stripPointMousemove($event)"
          @mouseup="stripPointMouseup"
          @mouseout="stripPointMouseout"
          @click="stripPointChange($event)"
        ></canvas>
        <div class="conctrol flex-center" :style="stripConctrolStyleComputed">
          <SvgIcon svg="chevron_right" />
          <div class="transparent"></div>
          <SvgIcon svg="chevron_left" />
        </div>
      </div>
    </div>
    <div class="conctrol"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Color from "@/utils/color";

@Options({})
export default class ColorPicker extends Vue {
  private ctxBlock: CanvasRenderingContext2D | null = null;
  private ctxStrip: CanvasRenderingContext2D | null = null;
  private widthBlock = 0;
  private heightBlock = 0;
  private widthStrip = 0;
  private heightStrip = 0;
  private stripConctrolStyle = {
    top: -4,
    left: -8,
  };
  private dragStrip = false;
  private dragBlock = false;
  private color = new Color();

  mounted(): void {
    this.initCanvas();
    this.color.fromString("#986825");
    console.log(this.color);
  }

  private get stripConctrolStyleComputed() {
    return {
      top: this.stripConctrolStyle.top + "px",
      left: this.stripConctrolStyle.left + "px",
    };
  }

  private initCanvas() {
    const block = this.$refs.block as HTMLCanvasElement;
    const strip = this.$refs.strip as HTMLCanvasElement;
    this.ctxBlock = block.getContext("2d");
    this.ctxStrip = strip.getContext("2d");

    if (this.ctxBlock && this.ctxStrip) {
      this.widthBlock = block.width;
      this.heightBlock = block.height;

      this.ctxBlock.rect(0, 0, this.widthBlock, this.heightBlock);

      this.fillGradient(
        this.ctxBlock,
        this.ctxStrip,
        "rgba(255,0,0,1)",
        this.widthBlock,
        this.heightBlock
      );
    }

    if (this.ctxStrip) {
      this.widthStrip = strip.width;
      this.heightStrip = strip.height;

      this.ctxStrip.rect(0, 0, this.widthStrip, this.heightStrip);

      const clgStrip = this.ctxStrip.createLinearGradient(
        0,
        0,
        0,
        this.heightStrip
      );

      clgStrip.addColorStop(0, "rgba(255, 0, 0, 1)");
      clgStrip.addColorStop(0.17, "rgba(255, 0, 255, 1)");
      clgStrip.addColorStop(0.34, "rgba(0, 0, 255, 1)");
      clgStrip.addColorStop(0.51, "rgba(0, 255, 255, 1)");
      clgStrip.addColorStop(0.68, "rgba(0, 255, 0, 1)");
      clgStrip.addColorStop(0.85, "rgba(255, 255, 0, 1)");
      clgStrip.addColorStop(1, "rgba(255, 0, 0, 1)");
      this.ctxStrip.fillStyle = clgStrip;
      this.ctxStrip.fill();
    }
  }

  private fillGradient(
    ctx1: CanvasRenderingContext2D,
    ctx2: CanvasRenderingContext2D,
    rgbaColor: string,
    width: number,
    height: number
  ) {
    ctx1.fillStyle = rgbaColor;
    ctx1.fillRect(0, 0, width, height);

    var grdWhite = ctx2.createLinearGradient(0, 0, width, 0);
    grdWhite.addColorStop(0, "rgba(255,255,255,1)");
    grdWhite.addColorStop(1, "rgba(255,255,255,0)");
    ctx1.fillStyle = grdWhite;
    ctx1.fillRect(0, 0, width, height);

    var grdBlack = ctx2.createLinearGradient(0, 0, 0, height);
    grdBlack.addColorStop(0, "rgba(0,0,0,0)");
    grdBlack.addColorStop(1, "rgba(0,0,0,1)");
    ctx1.fillStyle = grdBlack;
    ctx1.fillRect(0, 0, width, height);
  }

  private stripPointChange(event: MouseEvent) {
    if (this.ctxStrip && this.ctxBlock) {
      const data = this.ctxStrip.getImageData(1, event.offsetY, 1, 1).data;

      this.stripConctrolStyle.top = event.offsetY - 4;

      console.log(data[0], data[1], data[2]);

      const rgbaColor = `rgba( ${data[0]}, ${data[1]}, ${data[2]}, 1 )`;

      this.fillGradient(
        this.ctxBlock,
        this.ctxStrip,
        rgbaColor,
        this.widthBlock,
        this.heightBlock
      );
    }
  }

  private stripPointMousedown() {
    this.dragStrip = true;
  }

  private stripPointMousemove(event: MouseEvent) {
    if (this.dragStrip) this.stripPointChange(event);
  }

  private stripPointMouseup() {
    this.dragStrip = false;
  }

  private stripPointMouseout() {
    this.dragStrip = false;
  }

  private blockPointMousedown() {
    this.dragBlock = true;
  }

  private blockPointMousemove(event: MouseEvent) {
    if (this.dragBlock) console.log(event);
  }

  private blockPointMouseup() {
    this.dragBlock = false;
  }

  private blockPointMouseout() {
    this.dragBlock = false;
  }
}
</script>
<style lang="scss" scoped>
.color-picker {
  .color-pool {
    .canvas-strip {
      width: 30px;
      height: 300px;

      .strip {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
      }

      .conctrol {
        position: absolute;

        .transparent {
          width: 26px;
        }

        .svg-icon {
          $s: 10px;
          width: $s;
          height: $s;
        }
      }
    }
  }
}
</style>

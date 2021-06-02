<template>
  <div
    class="
      color-picker
      flex-jcfs-aic
      w-100vw
      h-100vh
      hidden
      pad-l-20 pad-r-40
      bs-bb
    "
  >
    <div class="color-pool flex-center">
      <div class="canvas-block">
        <canvas
          id="block"
          ref="block"
          class="block"
          width="300"
          height="300"
          @mousedown="blockPointMousedown"
          @mousemove="blockPointMousemove($event)"
          @mouseup="blockPointMouseup"
          @mouseleave="blockPointMouseout"
          @click="blockPointChange($event)"
        ></canvas>
      </div>
      <div class="canvas-strip relative mar-l-20">
        <canvas
          id="strip"
          ref="strip"
          class="strip"
          width="30"
          height="300"
          @mousedown="stripPointMousedown"
          @mousemove="stripPointMousemove($event)"
          @mouseup="stripPointMouseup"
          @mouseleave="stripPointMouseout"
          @click="stripPointChange($event)"
        ></canvas>
        <div class="conctrol flex-center" :style="stripConctrolStyleComputed">
          <SvgIcon svg="chevron_right" :style="chevronStyle" />
          <div class="transparent"></div>
          <SvgIcon svg="chevron_left" :style="chevronStyle" />
        </div>
      </div>
    </div>
    <div
      class="color-picker-conctrol mar-l-20 flex-jcsb-aifs flex-column grow-1"
    >
      <div class="color-info">
        <div class="new-old-color mar-b-20">
          <p class="mar-tb-5 ft-sm text-center">新的</p>
          <div class="color-block" :style="newColorStyle"></div>
          <div class="color-block" :style="currentColorStyle"></div>
          <p class="mar-tb-5 ft-sm text-center">当前</p>
        </div>
        <div class="hex w-100">
          <PrInput
            v-model.trim="currentColor"
            @keyup.enter="colorInputValueChange"
          />
        </div>
      </div>
      <div class="button w-100p flex-jcfe-aic">
        <PrButton type="dark" round bold>确定</PrButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Color, toHex } from "@/utils/color";

@Options({})
export default class ColorPicker extends Vue {
  private ctxBlock: CanvasRenderingContext2D | null = null;
  private ctxStrip: CanvasRenderingContext2D | null = null;
  private widthBlock = 0;
  private heightBlock = 0;
  private widthStrip = 0;
  private heightStrip = 0;
  private canvasBlockSize = 10;
  private canvasStripSize = 10;
  private stripConctrolStyle = {
    top: -this.canvasStripSize / 2,
    left: -8,
  };
  private blockConctrolStyle = {
    top: 0,
    left: 0,
  };
  private dragStrip = false;
  private dragBlock = false;
  private color = new Color();
  private rgbaColor = "rgba( 255, 0, 0, 1)";

  private chevronStyle = {
    width: this.canvasStripSize,
    height: this.canvasStripSize,
  };
  private newColorStyle = {
    backgroundColor: "",
  };
  private currentColorStyle = {
    backgroundColor: "#ffffff",
  };

  private currentColor = "";

  private colorPickerDesc = "";

  created(): void {
    this.createdColorPicker();
  }

  mounted(): void {
    this.initCanvas();
    this.setColor(this.currentColorStyle.backgroundColor);
    this.colorChange();
  }

  private createdColorPicker() {
    if (this.$route.query.color)
      this.currentColorStyle.backgroundColor = this.$route.query
        .color as string;
    if (this.$route.query.desc) {
      this.colorPickerDesc = this.$route.query.desc as string;
      document.title += `（${this.colorPickerDesc}）`;
    }
  }

  /**
   * 设置色值
   */
  private setColor(value: string) {
    this.color.fromString(value);
    this.hueChangeStripConctrolStyle();
    this.saturationLightnessChangeBlockConctrolStyle();
  }

  private get stripConctrolStyleComputed() {
    return {
      top: this.stripConctrolStyle.top + "px",
      left: this.stripConctrolStyle.left + "px",
    };
  }

  /**
   * 色值的改变会触发这个函数
   */
  private colorChange() {
    if (this.ctxStrip && this.ctxBlock) {
      const x =
        this.blockConctrolStyle.left > 0 ? this.blockConctrolStyle.left : 0;
      const y =
        this.blockConctrolStyle.top > 0 ? this.blockConctrolStyle.top : 0;

      const data = this.ctxBlock.getImageData(x, y, 1, 1).data;

      this.newColorStyle.backgroundColor = toHex({
        r: data[0],
        g: data[1],
        b: data[2],
      });

      this.currentColor = this.newColorStyle.backgroundColor;

      this.randerBlock(x, y);
    }
  }

  private randerBlock(x: number, y: number) {
    if (this.ctxStrip && this.ctxBlock) {
      this.fillGradient(
        this.ctxBlock,
        this.ctxStrip,
        this.rgbaColor,
        this.widthBlock,
        this.heightBlock
      );

      this.ctxBlock.strokeStyle = "#000";

      this.ctxBlock.beginPath();
      this.ctxBlock.arc(x, y, this.canvasBlockSize / 2, 0, Math.PI * 2, true);
      this.ctxBlock.stroke();

      this.ctxBlock.strokeStyle = "#fff";
      this.ctxBlock.beginPath();
      this.ctxBlock.arc(
        x,
        y,
        this.canvasBlockSize / 2 - 1,
        0,
        Math.PI * 2,
        true
      );
      this.ctxBlock.stroke();
    }
  }

  /**
   * 初始化canvas画布
   */
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
        this.rgbaColor,
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

  /**
   * sl 块渲染
   */
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

  /**
   * 监听点击strip点击事件
   */
  private stripPointChange(event: MouseEvent) {
    this.hueStripChange(event.offsetY);
  }

  private blockPonitChange(event: MouseEvent) {
    this.blockConctrolStyle.top = event.offsetY;
    this.blockConctrolStyle.left = event.offsetX;
    this.colorChange();
  }

  /**
   * 根据strip条高度改变色相值
   */
  private hueStripChange(y: number) {
    if (this.ctxStrip && this.ctxBlock) {
      const data = this.ctxStrip.getImageData(1, y, 1, 1).data;

      this.stripConctrolStyle.top = y - this.canvasStripSize / 2;

      this.rgbaColor = `rgba( ${data[0]}, ${data[1]}, ${data[2]}, 1 )`;

      this.colorChange();
    }
  }

  /**
   * 依据色相值设定高度
   */
  private hueChangeStripConctrolStyle() {
    if (this.color.get("hue") !== undefined) {
      this.stripConctrolStyle.top = this.hueConvertsLength(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.color.get("hue")!,
        this.heightStrip
      );

      this.hueStripChange(this.stripConctrolStyle.top);
    }
  }

  /**
   * 依据饱和度和明度设定 选择点的位置
   */
  private saturationLightnessChangeBlockConctrolStyle() {
    if (
      this.color.get("saturation") !== undefined &&
      this.color.get("value") !== undefined
    ) {
      this.blockConctrolStyle.left =
        Math.round(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          this.widthBlock * (this.color.get("saturation")! / 100)
        ) -
        this.canvasBlockSize / 2;

      this.blockConctrolStyle.top =
        Math.round(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          this.heightBlock - this.heightBlock * (this.color.get("value")! / 100)
        ) -
        this.canvasBlockSize / 2;
    }
  }

  /**
   * 色相值转换为长度值
   */
  private hueConvertsLength(hue: number, length: number) {
    return length - Math.round((hue * length) / 360);
  }

  private colorInputValueChange() {
    const color = this.currentColor;
    this.setColor(color);
    const x =
      this.blockConctrolStyle.left > 0 ? this.blockConctrolStyle.left : 0;
    const y = this.blockConctrolStyle.top > 0 ? this.blockConctrolStyle.top : 0;
    this.randerBlock(x, y);

    this.newColorStyle.backgroundColor = color;
    this.currentColor = color;
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

  private blockPointChange(event: MouseEvent) {
    this.blockPonitChange(event);
  }

  private blockPointMousedown() {
    this.dragBlock = true;
  }

  private blockPointMousemove(event: MouseEvent) {
    if (this.dragBlock) {
      this.blockPonitChange(event);
    }
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
    .canvas-block {
      cursor: url(http://saas.static.zhongjingapi.com/dev/images/202106/01/2e7f94e5a5b661d282eeb8fba02712d8.cur)
          8 7.4,
        auto;
      .conctrol {
        position: absolute;
        filter: invert(1) grayscale(1);
      }
    }
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
      }
    }
  }

  .color-picker-conctrol {
    height: 300px;
    .new-old-color {
      width: 80px;
      .color-block {
        height: 35px;
        border: 1px solid #323232;
        background-color: aquamarine;
      }
    }
  }
}
</style>

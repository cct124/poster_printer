<template>
  <div class="create-canvas">
    <PrInput
      class="title"
      mode="bottom-line"
      v-model="title"
      placeholder="标题"
      @change="titleChange"
    />
    <p class="ft-esm">宽度</p>
    <div class="width flex-jcsb-aic">
      <PrInput
        class="col-gray-6 ft-bs"
        type="number"
        mode="dark"
        v-model="width"
        @change="(v) => inputNumberChange(v, 'width')"
      />
      <PrSelect class="w-150" v-model="widthUnit" placeholder="请选择">
        <el-option
          v-for="item in widthUnitOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </PrSelect>
    </div>
    <p class="ft-esm">高度</p>
    <div class="width flex-jcsb-aic">
      <PrInput
        class="col-gray-6 ft-bs"
        type="number"
        mode="dark"
        v-model="height"
        @change="(v) => inputNumberChange(v, 'height')"
      />
    </div>
    <p class="ft-esm">背景内容</p>
    <div class="width flex-jcsb-aic">
      <PrSelect class="w-200" v-model="backgroundColor" placeholder="请选择">
        <el-option
          v-for="item in backgroundOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </PrSelect>
      <PrColorPicker v-model="backgroundColor" />
    </div>
    <div class="width mar-t-30 flex-jcfe-aic">
      <PrButton type="dark" round bold @click="close">关闭</PrButton>
      <PrButton type="primary" round bold @click="createCanvas">创建</PrButton>
    </div>
  </div>
</template>

<script lang="ts">
import { AppStore } from "@/types/store/app";
import { Options, Vue } from "vue-class-component";
import { PrSelect, PrColorPicker } from "@/components/Form";
import store from "@/store";
import { VALIDCHANNELS } from "@/script/config/ipcChannels";
import { VARIABLE } from "@/script/config/variable";

@Options({
  components: {
    PrSelect,
    PrColorPicker,
  },
})
export default class CreateCanvas extends Vue {
  async created(): Promise<void> {
    document.title = "创建画布";

    this.length = await this.$variables.get(VARIABLE.canvas);
    this.titleChange("");
  }

  mounted(): void {
    this.title = this.defaultCanvasName();
  }

  private length = 0;

  private title = "";
  private width = 300;
  private height = 300;
  private widthUnit = "pixel";
  private backgroundColor = "#ffffff";

  readonly canvas: AppStore.Canvas[] = store.getters.canvas;

  private widthUnitOptions = [
    {
      label: "像素",
      value: "pixel",
    },
  ];

  private backgroundOptions = [
    {
      label: "白色",
      value: "#ffffff",
    },
    {
      label: "黑色",
      value: "#000000",
    },
  ];

  private inputNumberChange(value: string, key: string) {
    switch (key) {
      case "width":
        this.width = value ? parseInt(value) : 300;
        break;
      case "height":
        this.height = value ? parseInt(value) : 300;
        break;
    }
  }

  private defaultCanvasName() {
    return `新建画布 ${this.length + 1}`;
  }

  private titleChange(v: string) {
    this.title = v ? v : this.defaultCanvasName();
  }

  private createCanvas() {
    this.$ipcRenderer.send(VALIDCHANNELS.createCanvas, {
      title: this.title,
      width: this.width,
      height: this.height,
      widthUnit: this.widthUnit,
      backgroundColor: this.backgroundColor,
    });
    window.close();
  }

  private close() {
    window.close();
  }
}
</script>
<style lang="scss" scoped>
.create-canvas {
  color: $gray-7;
  padding: 20px 30px 0;
  overflow: hidden;

  .title {
    color: $white;
  }

  .width {
    .pr-input {
      width: 100px;
    }
  }

  .color {
    width: 200px;
    height: 200px;
  }
}
</style>

<template>
  <div class="create-canvas">
    <PrInput
      class="title"
      mode="bottom-line"
      v-model="title"
      placeholder="标题"
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
    </div>
    <div class="width mar-t-30 flex-jcfe-aic">
      <PrButton type="dark" round bold>关闭</PrButton>
      <PrButton type="primary" round bold>创建</PrButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { PrSelect } from "@/components/Form";

@Options({
  components: {
    PrSelect,
  },
})
export default class CreateCanvas extends Vue {
  created(): void {
    document.title = "创建画布";
  }

  private title = "";
  private width = 0;
  private height = 0;
  private widthUnit = "pixel";
  private backgroundColor = "#ffffff";

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
        this.width = parseInt(value);
        break;
      case "height":
        this.height = parseInt(value);
        break;
    }
  }
}
</script>
<style lang="scss" scoped>
.create-canvas {
  color: $gray-7;
  padding: 20px 30px;
  .title {
    color: $white;
  }

  .width {
    .pr-input {
      width: 100px;
    }
  }
}
</style>

<template>
  <div class="create-canvas">
    <PrInput
      class="title"
      mode="bottom-line"
      v-model="title"
      placeholder="标题"
    />
    <p class="ft-esm">宽度</p>
    <div>
      <PrInput
        class="width col-gray-6 ft-bs"
        type="number"
        mode="dark"
        v-model="width"
        @change="inputNumberChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  created() {
    document.title = "创建画布";
  },
})
export default class CreateCanvas extends Vue {
  private title = "";
  private width = 0;
  private inputNumberChange(event: Event) {
    this.width = parseInt((event.target as HTMLInputElement).value);
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
    width: 100px;
  }
}
</style>

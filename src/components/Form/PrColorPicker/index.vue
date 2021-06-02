<template>
  <div
    class="pr-color-picker"
    @click="openColorPicker"
    :style="{ background: modelValue }"
  ></div>
</template>

<script lang="ts">
import { Options, Vue, prop } from "vue-class-component";

@Options({})
export default class PrColorPicker extends Vue.with(
  class {
    modelValue = prop<string>({ default: "#ffffff" });
    desc = prop<string>({ default: "" });
  }
) {
  private openColorPicker() {
    this.$openColorPicker(this.modelValue, this.desc).then((res) => {
      this.$emit("update:modelValue", res);
    });
  }
}
</script>
<style lang="scss" scoped>
.pr-color-picker {
  $s: 32px;
  width: $s;
  height: $s;
  background-color: #fff;
  border-radius: 2px;
}
</style>

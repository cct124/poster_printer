<template>
  <ElInput class="pr-input" :class="mode" :size="size" v-bind="$attrs" />
</template>

<script lang="ts">
import { Options, Vue, prop } from "vue-class-component";

@Options({})
export default class PrInput extends Vue.with(
  class {
    size = prop<string>({ default: "small" });
    mode = prop<string>({ default: "normal" });
  }
) {}
</script>
<style lang="scss" scoped>
.pr-input {
  outline: none;
  transition: all 0.25s;

  // &.bottom-line {
  // }
  &::v-deep(.el-input__inner) {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
}
</style>

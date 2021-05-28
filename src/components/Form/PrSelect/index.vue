<template>
  <el-select class="pr-select" :size="size" v-bind="$attrs">
    <slot></slot>
  </el-select>
</template>

<script lang="ts">
import { Options, Vue, prop } from "vue-class-component";

@Options({})
export default class PrSelect extends Vue.with(
  class {
    size = prop<string>({ default: "small" });
  }
) {}
</script>
<style lang="scss" scoped></style>

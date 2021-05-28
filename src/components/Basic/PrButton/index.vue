<template>
  <el-button
    class="pr-button"
    :class="className"
    :size="size"
    :type="type"
    v-bind="$attrs"
    ><slot></slot
  ></el-button>
</template>

<script lang="ts">
import { Options, Vue, prop } from "vue-class-component";

@Options({})
export default class PrButton extends Vue.with(
  class {
    bold?: string;
    type?: string;
    size = prop<string>({ default: "small" });
  }
) {
  private className: string[] = [];
  private handleClassName() {
    if (this.bold !== undefined) this.className.push("bold");
  }

  created(): void {
    this.handleClassName();
  }
}
</script>
<style lang="scss" scoped>
.pr-button {
  &.el-button--dark {
    color: $white;
    background-color: $background-color;
    border: 2px solid $background-hover-color;

    &:hover {
      color: $background-color;
      background-color: $background-hover-color;
    }
  }

  &.bold {
    font-weight: bold;
  }
}
</style>

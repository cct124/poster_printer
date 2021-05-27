<template>
  <ElInput class="pr-input" :size="size" v-bind="$attrs" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  props: {
    mode: {
      default: "normal",
    },
    size: {
      default: "small",
    },
  },
})
export default class PrInput extends Vue {}
</script>
<style lang="scss" scoped>
.pr-input {
  outline: none;
  transition: all 0.25s;

  &.bottom-line {
    $h: 30px;
    border: none;
    background-color: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding: 0 2px;
    height: $h;
    line-height: $h;

    &:hover {
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    }
  }

  &.dark {
    $h: 30px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: #2a2a2a;
    padding: 0 5px;
    border-radius: 4px;
    height: $h;
    line-height: $h;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    &:hover {
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
}
</style>

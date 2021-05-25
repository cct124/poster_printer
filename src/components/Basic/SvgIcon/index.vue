<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-bind="$attrs"
  />
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal } from "@/utils/validate";
import { defineComponent } from "vue";
export default defineComponent({
  name: "SvgIcon",
  props: {
    svg: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  computed: {
    isExternal(): boolean {
      return isExternal(this.svg);
    },
    iconName(): string {
      return `#icon-${this.svg}`;
    },
    svgClass(): string {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    },
    // eslint-disable-next-line
    styleExternalIcon(): any {
      return {
        mask: `url(${this.svg}) no-repeat 50% 50%`,
        "-webkit-mask": `url(${this.svg}) no-repeat 50% 50%`,
      };
    },
  },
});
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>

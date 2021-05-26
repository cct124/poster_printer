<template>
  <div class="tools flex-jcfs-aic flex-column pad-t-10 bs-bb">
    <div
      class="tool flex-center"
      :class="{ active: item.active }"
      v-for="item in tools"
      :key="item.id"
      :title="item.name"
      @click="toolActive(item)"
    >
      <SvgIcon :svg="item.icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { AppStore } from "@/types/store/app";
import store from "@/store";
import { Tools as _Tools } from "@/store/config";

@Options({})
export default class Tools extends Vue {
  readonly tools: AppStore.Tool[] = store.getters.tools;

  private toolActive(item: AppStore.Tool) {
    store.commit(_Tools.activeTool, item.id);
  }
}
</script>
<style lang="scss" scoped>
.tools {
  width: $tools-width;
  min-height: calc(100vh - #{$frame-item-height});
  background-color: $tools-background-color;

  .tool {
    $w: calc(#{$tools-width} - 8px);
    $h: calc(#{$tools-width} - 16px);
    width: $w;
    height: $h;

    &:not(:last-child) {
      margin-bottom: 5px;
    }

    &:hover {
      background-color: $tools-hover-item;
    }

    &.active {
      background-color: $tools-active-item;
    }

    .svg-icon {
      $si: calc(#{$h} - 8px);
      width: $si;
      height: $si;
      fill: $tools-svg-color;
    }
  }
}
</style>

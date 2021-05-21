<template>
  <div class="tabs select-none">
    <div
      class="tab pointer flex-center pad-l-10"
      v-for="tab in canvas"
      :key="tab.name"
    >
      <div class="label ft-sm mar-r-5" :title="tab.meta.desc">
        {{ tab.meta.title }}
      </div>
      <div class="close flex-center" title="关闭">
        <SvgIcon iconClass="close" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { AppStore } from "@/types/store/app";
import { Options, Vue } from "vue-class-component";
import store from "@/store";

@Options({})
export default class Tabs extends Vue {
  readonly canvas: AppStore.Route[] = store.getters.canvas;
}
</script>
<style lang="scss" scoped>
.tabs {
  box-sizing: border-box;
  padding: 0 5px;
  min-width: 100%;
  color: $tabs-text-color;
  height: $tabs-height;
  background-color: $tabs-background-color;

  display: flex;
  justify-content: flex-start;
  align-items: flex-end;

  .tab {
    $mt: 4px;
    border-radius: 2px 2px 0 0;
    background-color: $tabs-item-background-color;
    height: $tabs-height - $mt;
    margin-top: $mt;
    margin-bottom: 1px;
    padding-right: 6px;

    &:not(:last-child) {
      margin-right: 5px;
    }

    &:hover {
      color: $tabs-text-hover-color;
      .close {
        opacity: 1;
      }
    }

    .close {
      $s: 12px;
      width: $s;
      height: $s;
      opacity: 0;
      padding: 2px;

      .svg-icon {
        width: $s - 4px;
        height: $s - 4px;
      }
    }
  }
}
</style>

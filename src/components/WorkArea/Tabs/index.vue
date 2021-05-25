<template>
  <div class="tabs select-none">
    <div
      class="tab pointer flex-center pad-l-10"
      v-for="tab in canvas"
      :key="tab.name"
      :class="{ active: tab.active }"
      @click="open(tab)"
    >
      <div class="label ft-sm mar-r-5" :title="tab.desc">
        {{ tab.name }}
      </div>
      <div class="close flex-center" title="关闭" @click.stop="close(tab)">
        <SvgIcon svg="close" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { AppStore } from "@/types/store/app";
import { Options, Vue } from "vue-class-component";
import store from "@/store";
import { APP } from "@/store/config";

@Options({})
export default class Tabs extends Vue {
  readonly canvas: AppStore.Canvas[] = store.getters.canvas;

  private open(tab: AppStore.Canvas) {
    store.commit(APP.tabsActiveChange, tab.id);
  }

  private close(tab: AppStore.Canvas) {
    store.commit(APP.destroyCanvas, tab.id);
  }
}
</script>
<style lang="scss" scoped>
.tabs {
  $li: 1px;
  box-sizing: border-box;
  padding: 0 $li * 2;
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
    margin-bottom: $li;
    padding-right: 6px;

    &:not(:last-child) {
      margin-right: $li;
    }

    &.active {
      color: $tabs-text-active-color;
      background-color: $tabs-item-active-background-color;
    }

    &:hover {
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

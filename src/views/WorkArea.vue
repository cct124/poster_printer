<template>
  <div class="flex">
    <Tools />
    <div class="work-area grow-1">
      <Tabs />
      <Canvas
        v-for="item in canvas"
        :meta="item.meta"
        :key="item.id"
        v-show="item.active"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { AppStore } from "@/types/store/app";
import { Options, Vue } from "vue-class-component";
import { Tabs, Canvas, Tools } from "@/components/WorkArea";
import store from "@/store";

@Options({
  components: {
    Tabs,
    Canvas,
    Tools,
  },
})
export default class WorkArea extends Vue {
  readonly canvas: AppStore.Canvas[] = store.getters.canvas;
  readonly destroyCanvas: AppStore.Canvas[] = store.getters.destroyCanvas;
}
</script>
<style lang="scss" scoped>
.navigation {
  .create {
    width: $tools-width;
  }
}
.work-area {
  min-height: calc(
    100vh - #{$frame-item-height} - #{$tabs-height} - #{$frame-margin-bottom}
  );
}
</style>

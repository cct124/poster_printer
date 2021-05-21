<template>
  <Tabs />
  <button @click="click">click</button>
  <div class="work-area">
    <Canvas v-for="item in canvas" :key="item.id" v-show="item.active" />
  </div>
</template>

<script lang="ts">
import { AppStore } from "@/types/store/app";
import { Options, Vue } from "vue-class-component";
import { Tabs, Canvas } from "@/components/WorkArea";
import store from "@/store";

@Options({
  components: {
    Tabs,
    Canvas,
  },
})
export default class WorkArea extends Vue {
  readonly canvas: AppStore.Canvas[] = store.getters.canvas;
  readonly destroyCanvas: AppStore.Canvas[] = store.getters.destroyCanvas;

  private click() {
    console.log(this.canvas);
    // console.log(this.list);
  }
}
</script>
<script setup lang="ts"></script>

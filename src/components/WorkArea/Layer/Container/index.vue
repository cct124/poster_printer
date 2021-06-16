<template>
  <div class="layer-container">
    <div class="title"><p class="ft-bs">图层</p></div>
    <div class="layers">
      <div class="layer" v-for="layer in layers" :key="layer"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop } from "vue-class-component";
// import { computed } from "vue";
import Layer from "@/plugin/layer/Layer";

@Options({})
export default class LayerContainer extends Vue.with(
  class {
    layer = prop<Layer>({ type: Object });
  }
) {
  private get layers() {
    return this.layer ? this.layer.layers : [];
  }
}
</script>
<style lang="scss" scoped>
.layer-container {
  .title {
    padding: 6px 10px;
    border-bottom: 1px solid $background-color;
    background-color: $tabs-item-active-background-color;

    p {
      margin: 0;
    }
  }
}
</style>

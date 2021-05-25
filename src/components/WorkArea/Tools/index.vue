<template>
  <div class="tools"></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Tools extends Vue {}
</script>
<style lang="scss" scoped>
.tools {
  width: $tools-width;
  min-height: calc(100vh - #{$frame-item-height});
  background-color: $tools-background-color;
}
</style>

<template>
  <div class="pr-color-picker" @click="openColorPicker"></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class PrColorPicker extends Vue {
  private openColorPicker() {
    console.log("openColorPicker");
  }
}
</script>
<style lang="scss" scoped>
.pr-color-picker {
  $s: 32px;
  width: $s;
  height: $s;
  background-color: #fff;
  border-radius: 2px;
}
</style>

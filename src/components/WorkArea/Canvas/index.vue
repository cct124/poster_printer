<template>
  <div class="canvas">
    <p>Canvas {{ index }}</p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Canvas extends Vue {
  readonly index = "";

  private value = "";

  created(): void {
    console.log("created " + this.index);
  }

  unmounted(): void {
    console.log("unmounted " + this.index);
  }
}
</script>
<style lang="scss" scoped></style>

<template>
  <div class="canvas">
    <p>Canvas {{ index }}</p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  created() {
    console.log("created " + this.index);
  },
  unmounted() {
    console.log("unmounted " + this.index);
  },
})
export default class Canvas extends Vue {
  readonly index = "";

  private value = "";
}
</script>
<style lang="scss" scoped></style>

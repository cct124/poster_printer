<template>
  <Tabs />
  <div class="canvas">Canvas</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Tabs } from "@/components/WorkArea";

@Options({
  components: {
    Tabs,
  },
})
export default class Canvas extends Vue {}
</script>
<style lang="scss" scoped></style>

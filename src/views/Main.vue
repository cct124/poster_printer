<template>
  <Frame />
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Frame } from "@/components/Layout";

@Options({
  components: {
    Frame,
  },
})
export default class Main extends Vue {}
</script>
<style lang="scss" scoped></style>

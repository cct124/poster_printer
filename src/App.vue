<template>
  <Frame />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Frame } from "@/components/Layout";
export default defineComponent({
  components: {
    Frame,
  },
  name: "APP",
});
</script>
<script setup lang="ts"></script>

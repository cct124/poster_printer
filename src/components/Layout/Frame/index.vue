<template>
  <div class="frame w-100p">
    <SvgIcon iconClass="printer" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Frame",
});
</script>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.frame {
  height: 30px;
  background: $frame-background;
}
</style>

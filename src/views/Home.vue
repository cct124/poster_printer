<template>
  <div class="home">
    <button @click="toMainMessage('msg')">Send Msg</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Home",
});
</script>
<script setup lang="ts">
import { VALIDCHANNELS } from "@/script/system/events/index";

function toMainMessage(msg: string) {
  window.ipcRenderer.send(VALIDCHANNELS.toMain, msg);
}
</script>

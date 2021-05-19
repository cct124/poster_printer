<template>
  <div class="welcome col-gray-5">
    <h1 class="title ft-md mar-lr-20">Welcome {{ appName }}</h1>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { APP } from "@/script/config/app";
import { INFO } from "@/script/config/info";
import { VALIDCHANNELS } from "@/script/system/events";
@Options({
  mounted() {
    this.getSystemInfo();
  },
})
export default class Welcome extends Vue {
  /**
   * 应用名称
   */
  appName = APP.name;

  getSystemInfo(): void {
    // console.log(this.$ipcRenderer.get);

    this.$ipcRenderer.get(VALIDCHANNELS.info, INFO.platform).then((res) => {
      console.log(res.args);
    });
  }
}
</script>
<style lang="scss" scoped>
.welcome {
}
</style>

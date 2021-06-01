<template>
  <div class="welcome col-gray-5">
    <div class="content">
      <h1 class="title ft-md mar-b-20">Welcome {{ appName }}</h1>
      <div class="ft-esm pad-l-10">
        <p>Version {{ version }}</p>
        <p>Platform {{ platform }}</p>
        <p>System Version {{ systemVersion }}</p>
        <p>CPU Architecture {{ arch }}</p>
        <p>System Type {{ systemType }}</p>
        <p>Node.js {{ versions.chrome }}</p>
        <p>Chromium {{ versions.node }}</p>
        <p>Electron {{ versions.electron }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { APP } from "@/script/config/app";
import { INFO } from "@/script/config/info";
import { VALIDCHANNELS } from "@/script/config/ipcChannels";

@Options({})
export default class Welcome extends Vue {
  mounted(): void {
    this.getSystemInfo();
    window.openColorPicker("#fff", "desc");
  }
  /**
   * 应用名称
   */
  appName = APP.name;
  versions = {};
  platform = "";
  systemType = "";
  arch = " ";
  systemVersion = "";
  version = "";

  getSystemInfo(): void {
    this.$ipcRenderer.info(VALIDCHANNELS.info, INFO.appVersion).then((res) => {
      this.version = res.args;
    });

    this.$ipcRenderer.info(VALIDCHANNELS.info, INFO.versions).then((res) => {
      this.versions = res.args;
    });

    this.$ipcRenderer.info(VALIDCHANNELS.info, INFO.platform).then((res) => {
      this.platform = res.args;
    });

    this.$ipcRenderer.info(VALIDCHANNELS.info, INFO.systemType).then((res) => {
      this.systemType = res.args;
    });

    this.$ipcRenderer.info(VALIDCHANNELS.info, INFO.arch).then((res) => {
      this.arch = res.args;
    });

    this.$ipcRenderer
      .info(VALIDCHANNELS.info, INFO.systemVersion)
      .then((res) => {
        this.systemVersion = res.args;
      });
  }
}
</script>
<style lang="scss" scoped>
.welcome {
  $p: 100px;
  padding-top: $p;
  padding-left: $p;

  .content {
    p {
      margin: 10px 0;
    }
  }
}
</style>

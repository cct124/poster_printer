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
import { VARIABLE } from "@/script/config/variable";

@Options({})
export default class Welcome extends Vue {
  mounted(): void {
    this.getSystemInfo();
  }
  /**
   * 应用名称
   */
  appName = APP.name;
  versions = {
    chrome: "",
    node: "",
    electron: "",
  };
  platform = "";
  systemType = "";
  arch = " ";
  systemVersion = "";
  version = "";

  private async getSystemInfo() {
    const info = await window.variables.get(VARIABLE.info);
    this.versions = info.versions;
    this.platform = info.platform;
    this.systemType = info.systemType;
    this.arch = info.arch;
    this.systemVersion = info.systemVersion;
    this.version = info.appVersion;
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

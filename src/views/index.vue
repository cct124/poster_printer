<template>
  <div class="index">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({})
export default class Index extends Vue {}
</script>
<script setup lang="ts"></script>

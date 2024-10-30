<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-10-26 15:03:29
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-09-06 10:06:47
-->
<template>
  <div class="layout">
    <Header :isPlaceholder="false" color='#fff'></Header>
    <div class="layout-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header/index.vue";
import { ref, reactive, toRefs, watch } from "vue";
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  .layout-body {
    height: calc(100vh - 56px);
    // overflow: auto;
  }
}
</style>

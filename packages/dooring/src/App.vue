<!--
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-04-27 10:52:51
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-02-01 11:29:59
-->
<template>
  <div>
    <router-view v-if="isRouterActive"></router-view>
    <Login v-if="onLogin" />
  </div>
</template>

<script setup lang="ts">
import Login from "@/components/Login/index.vue";
import { toRefs } from "vue";
import { useLogin } from "@/components/Login/useLogin";
import { ref, provide, nextTick } from "vue";

const { onLogin } = toRefs(useLogin());
const isRouterActive = ref(true);

provide("reload", () => {
  console.log('刷新页面...');
  
  isRouterActive.value = false;
  nextTick(() => {
    isRouterActive.value = true;
  });
});
</script>

<style>
#app {
}
</style>

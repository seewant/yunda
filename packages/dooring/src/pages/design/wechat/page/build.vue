<!--
 * @Description: 项目设计工作台
 * @Autor: WangYuan1
 * @Date: 2022-10-08 15:26:46
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-05-31 16:55:19
-->
<template>
  <DesignProductWork
    v-design-loading="loading"
    style="height: calc(100vh - 96px)"
    type="wechat"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import DesignProductWork from "@/components/DesignProductWork";

let loading = ref(true);

// 进入页面进行1s的loading,用于iframe重新渲染
setTimeout(() => {
  loading.value = false;
}, 400);
</script>

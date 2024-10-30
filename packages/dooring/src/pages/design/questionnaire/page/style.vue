<!--
 * @Description: 项目设计工作台
 * @Autor: WangYuan1
 * @Date: 2022-10-08 15:26:46
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-04-18 11:30:28
-->
<template>
  <QuestionnaireSetting v-design-loading="loading" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import QuestionnaireSetting from "../components/QuestionnaireSetting";

let loading = ref(true);

// 进入页面进行0.5s的loading,用于iframe重新渲染
setTimeout(() => {
  loading.value = false;
}, 400);
</script>

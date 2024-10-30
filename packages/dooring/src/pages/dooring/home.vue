<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2023-02-27 21:12:00
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-08-31 11:28:33
-->
<template>
  <div class="home">
    <FirstPage />
    <!-- <VipPage /> -->
    <OneMinPage />
    <ScenePage />
    <!-- <Introduction /> -->
    <!-- <WidgetRecommend /> -->
    <CreatePage />
    <TotalPage />
  </div>
</template>

<script setup lang="ts">
import FirstPage from "@/components/Home/FirstPage";
import VipPage from "@/components/Home/VipPage";
import OneMinPage from "@/components/Home/OneMinPage";
import Introduction from "@/components/Home/Introduction.vue";
import WidgetRecommend from "@/components/Home/WidgetRecommend.vue";
import ScenePage from "@/components/Home/ScenePage.vue";
import CreatePage from "@/components/Home/CreatePage.vue";
import TotalPage from "@/components/Home/TotalPage.vue";
</script>

<style lang="scss" scoped></style>

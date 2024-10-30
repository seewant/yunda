<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-03-15 15:22:25
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-15 10:40:51
-->
<template>
  <PageBackground
    v-if="previewProductPage"
    class="page"
    :configure="previewProductPage?.configure?.background"
  >
    <Render :widgetList="previewProductPage.widgetList" />
  </PageBackground>
</template>

<script setup lang="ts">
import { toRefs, ref, defineProps } from "vue";
import { useDesignHook } from "@/hooks/useDesign";
import { getPagePackgroundStyle } from "@design/utils";
import Render from "@/components/Render/index";
import PageBackground from "@/components/PageBackground";

const { previewProductPage } = toRefs(useDesignHook());
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
}
</style>

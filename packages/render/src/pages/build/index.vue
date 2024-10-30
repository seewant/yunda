<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-01-16 19:18:08
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-02 17:18:17
-->
<template>
  <PageBackground class="page" :configure="previewData?.configure?.background">
    <Design />
  </PageBackground>
</template>

<script setup lang="ts">
import { onMounted, toRefs, watch } from "vue";
import Design from "@/components/Design";
import PageBackground from "@/components/PageBackground";
import { useDesignHook } from "@/hooks/useDesign";
import { getPagePackgroundStyle } from "@design/utils";

const { previewData } = toRefs(useDesignHook());
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  min-height: 100vh;
}
</style>

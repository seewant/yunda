<!--
 * @Description: 可视化页面设计器
 * @Autor: WangYuan1
 * @Date: 2022-10-08 15:15:11
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-04-09 19:58:34
-->
<template>
  <div class="design">
    <DesignLeft />
    <DesignCenter />
    <DesignRight />
  </div>
</template>

<script setup lang="ts">
import DesignLeft from "./DesignLeft/index.vue";
import DesignCenter from "./DesignCenter/index.vue";
import DesignRight from "./DesignRight/index.vue";
</script>

<style lang="scss" scoped>
.design {
  display: flex;
  justify-content: space-between;
  height: 100%;
}
</style>

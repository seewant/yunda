<!--
 * @Description: 可视化页面设计器
 * @Autor: WangYuan1
 * @Date: 2022-10-08 15:15:11
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-04-20 10:59:09
-->
<template>
  <div class="wrap">
    <DesignCenter />
    <DesignRight />
  </div>
</template>

<script setup lang="ts">
import DesignCenter from "./DesignCenter/index.vue";
import DesignRight from "./DesignRight/index.vue";
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: space-between;
  height: 100%;
}
</style>

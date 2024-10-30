<!--
 * @Description: 设计页面容器
 * @Autor: WangYuan1
 * @Date: 2022-10-14 15:20:26
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-15 14:43:10
-->
<template>
  <div class="shell">
    <div>
      <img class="w-full" src="../../assets/phone-head.jpg" />
    </div>
    <div style="min-height: 667px" :style="{ background: props.background }">
      <slot></slot>
    </div>
    <div class="relative h-60">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive, computed, onMounted } from "vue";
const props = defineProps({
  background: {
    type: String,
    default: "#ffffff",
  },
});
</script>

<style lang="scss" scoped>
.shell {
  position: relative;
  width: 375px;
  background: #ffffff;
  margin: 0 auto;
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 2px 8px 20px 0px rgba(0, 0, 0, 0.12),
    0px 2px 8px 0px rgba(0, 0, 0, 0.04);
}
</style>

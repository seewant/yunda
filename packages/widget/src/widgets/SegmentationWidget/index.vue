<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-10-13 16:57:06
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-01 11:06:28
-->
<template>
  <div :style="{ height: `${getUpx(height)}` }"></div>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive, computed } from "vue";
import { getUpx } from "../../utils/tools";

const props = defineProps({
  height: { type: String, default: "" },
});
</script>

<style lang="scss" scoped></style>

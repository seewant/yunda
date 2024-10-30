<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-10-08 16:43:21
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-29 16:20:56
-->
<template>
  <div class="text">
    <div :style="styleObject">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { getUpx } from "../../utils/tools";

const props = defineProps({
  text: { type: String, default: "清澈的爱,只为中国" },
  size: { type: String, default: "12" },
  location: { type: String, default: "center" },
  colSpacing: { type: String, default: "0" },
  lineHeight: { type: String, default: "12" },
  textColor: {
    type: String,
    default: "",
  },
});

const styleObject = computed(() => {
  return {
    fontSize: `${getUpx(props.size)}`,
    textAlign: `${props.location}`,
    padding: `${getUpx(props.colSpacing)} 0`,
    lineHeight: `${getUpx(props.lineHeight)}`,
    color: props.textColor,
  };
});
</script>

<style lang="scss" scoped>
.text {
}
</style>

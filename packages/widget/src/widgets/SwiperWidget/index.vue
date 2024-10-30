<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-10-08 16:43:21
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-25 20:16:09
-->
<template>
  <div>
    <u-swiper
      :list="list"
      keyName="image"
      indicator
      :indicatorMode="indicatorMode"
      :showTitle="showTitle"
      :autoplay="autoplay"
      :height="`${height * 2}rpx`"
      imgMode="aspectFill"
      circular
      @click="handleClick"
    ></u-swiper>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from "vue";

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
  indicatorMode: {
    type: String,
    default: "",
  },
  height: {
    type: String,
    default: "200",
  },
});

const emits = defineEmits(["route"]);

function handleClick(index) {
  const item = props.list[index];
  emits("route", item.route);
}
</script>

<style lang="scss" scoped></style>

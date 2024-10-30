<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-11-24 20:24:21
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-12-01 16:19:07
-->
<template>
  <div class="empty flex-center">
    <div class="flex-center flex-col">
      <img
        :style="{
          width: `${props.imageSize}px`,
          height: `${props.imageSize}px`,
        }"
        src="https://www.sunmao-design.top/mall-cook/image/1712650671215.jpg"
      />
      <p class="mt-10 text-14px color-#ababab">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  description: {
    type: String,
    default: "什么都没有哦",
  },
  imageSize: {
    type: Number,
    default: 100,
  },
});
</script>

<style lang="scss" scoped>
.empty {
  height: 100%;
}
</style>

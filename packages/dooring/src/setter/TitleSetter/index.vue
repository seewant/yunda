<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-11-23 20:31:29
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-12-13 15:20:02
-->
<template>
  <SetterItem :title="props?.schema?.title" :aloneTitle="true"></SetterItem>
  <!-- <div class="title">
    <div class="title-contnet">{{ props?.schema?.title }}</div>
  </div> -->
</template>

<script setup lang="ts">
import SetterItem from "@/components/SetterItem/index.vue";

const props = defineProps({
  schema: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  padding-top: 12px;
  border-top: 1px solid #f5f5f5;
}
.title-contnet {
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  font-weight: 600;
}
</style>

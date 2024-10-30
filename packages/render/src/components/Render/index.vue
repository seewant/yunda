<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-03-15 15:57:22
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-27 16:15:55
-->
<template>
  <div class="render">
    <RenderWidgetList
      v-if="props.widgetList.length"
      :widgetList="props.widgetList"
    />
    <!-- <img class="render-empty" v-else src="../../static/empty.png" /> -->
  </div>
</template>

<script setup lang="ts">
import { toRefs, defineProps } from "vue";
import RenderWidgetList from "@/components/Render/RenderWidgetList";

const props = defineProps({
  widgetList: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.render-empty {
  width: 100%;
  margin-top: 200rpx;
}
</style>

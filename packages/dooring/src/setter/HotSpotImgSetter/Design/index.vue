<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-07-11 10:27:54
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-11 11:38:19
-->
<template>
  <div class="design">
    <DesignLeft />
    <DesignCenter />
    <DesignRight />
  </div>
</template>

<script setup lang="ts">
import DesignLeft from "./DesignLeft.vue";
import DesignCenter from "./DesignCenter.vue";
import DesignRight from "./DesignRight.vue";
import { ref, reactive, computed, toRefs } from "vue";
import { useDesignHook } from "./useDesign";
import { useVModel } from "@vueuse/core";

const props = defineProps({
  widgetList: {
    type: Array,
    default: () => [],
  },
  canvasWidth: {
    type: Number,
    default: 375,
  },
  canvasHeight: {
    type: Number,
    default: 375,
  },
  canvasBackground: {
    type: String,
    default: "",
  },
});
const { canvas, widgetList } = toRefs(useDesignHook());

widgetList.value = props.widgetList;
canvas.value.width = props.canvasWidth;
canvas.value.height = props.canvasHeight;
canvas.value.background = props.canvasBackground;
</script>

<style lang="scss" scoped>
.design {
  display: flex;
  width: 100%;
  min-height: 600px;
}
</style>

<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-10-13 16:57:06
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-10 20:20:23
-->
<template>
  <div
    ref="resizableDiv"
    class="content"
    :style="{
      height: `${getUpx(height)}`,
      padding: `${getUpx(props.itemMargin / 2)}`,
    }"
  >
    <div class="cube">
      <div
        v-for="(item, index) in props.config.cubeList"
        :key="index"
        class="cube-item"
        :style="getItemStyle(item)"
      >
        <img
          class="cube-item-img"
          :src="
            item.image ||
            'https://www.sunmao-design.top/mall-cook/image/1714458990370.jpg'
          "
          mode="aspectFill"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, computed } from "vue";
import { getUpx } from "../../utils/tools";

const props = defineProps({
  config: {
    type: Object,
    default: () => {
      return {
        cubeList: [],
      };
    },
  },
  cubeRadius: { type: String, default: "square" },
  itemMargin: { type: String, default: "0" },
  itemRadius: { type: String, default: "square" },
});

let height = ref(200);
const resizableDiv = ref(null);
const cellWidth = computed(() => 100 / props.config.col);

onMounted(() => {
  // 初始化时设置高度等于宽度
  updateHeight();
});

// 使用 watchEffect 监听宽度变化
watchEffect(() => {
  updateHeight();
});

function updateHeight() {
  if (resizableDiv.value) {
    const rect = resizableDiv.value.getBoundingClientRect();
    height.value = rect.width; // 设置高度等于宽度
  }
}

function getItemStyle(item) {
  let { top, left, width, height } = item;
  let result = {
    top: `${getCubeUnit(top - 1)}`,
    left: `${getCubeUnit(left - 1)}`,
    width: `${getCubeUnit(width)}`,
    height: `${getCubeUnit(height)}`,
    padding: `${getUpx(props.itemMargin / 2)}`,
  };
  console.log("result", result);
  return result;
}

function getCubeUnit(num) {
  return `${Math.floor(num * cellWidth.value)}%`;
}
</script>

<style lang="scss" scoped>
.content {
  box-sizing: border-box;
  .cube {
    position: relative;
    width: 100%;
    height: 100%;

    .cube-item {
      position: absolute;
      box-sizing: border-box;
      overflow: hidden;

      .cube-item-img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

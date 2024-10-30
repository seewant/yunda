<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-04-17 20:12:02
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-19 11:23:16
-->
<template>
  <div v-design-loading="loading">
    <iframe
      v-show="path"
      ref="iframeRef"
      class="canvas"
      :src="path"
      @load="handleLoad"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue";

let loading = ref(true);
const iframeRef = ref(null);

const props = defineProps({
  path: {
    type: String,
    default: "",
  },
});

// iframe加载完毕后
function handleLoad() {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
}

defineExpose({ open });
</script>

<style lang="scss" scoped>
.canvas {
  width: 200px;
  height: 420px;
  border: none;
  overflow: auto;
}

/* 隐藏滚动条样式 */
iframe::-webkit-scrollbar {
  display: none;
}

/* 隐藏滚动条样式 */
iframe {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}
</style>

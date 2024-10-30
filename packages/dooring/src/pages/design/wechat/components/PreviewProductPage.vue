<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-04-17 20:12:02
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-19 10:22:30
-->
<template>
  <div v-design-loading="loading">
    <iframe
      v-if="path"
      ref="iframeRef"
      class="canvas"
      :src="path"
      @load="handleLoad"
    />
    <img
      v-else
      class="w-full h-full"
      src="https://img01.yzcdn.cn/upload_files/2022/09/21/FgtmEnebhKYrYsG8OasWsd_OAY8n.jpeg"
    />
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from "@design/utils";
import { ref, toRefs, watch } from "vue";
import { useWechatStore } from "@/store/wechat";
import Configuration from "@/configuration/index";

let loading = ref(true);
const iframeRef = ref(null);
const { wechat } = toRefs(useWechatStore());
const path = `${Configuration.YUNDA_H5_PATH}${props.path}`;
const props = defineProps({
  path: {
    type: String,
    default: "",
  },
});

// iframe加载完毕后
function handleLoad() {
  loading.value = false;

  iframeRef.value.contentWindow.postMessage(
    { event: "watchPreviewProduct", params: cloneDeep(wechat.value) },
    "*"
  );
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

<!--
 * @Description: 画布
 * @Autor: WangYuan1
 * @Date: 2022-10-08 15:14:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-24 19:07:09
-->
<template>
  <div class="flex-1 overflow-auto pt-50 pb50">
    <PageShell class="relative">
      <iframe ref="iframeRef" class="canvas" :src="path" @load="handleLoad" />
    </PageShell>
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from "@design/utils";
import { ref, toRefs, watch, onUnmounted } from "vue";
import { useQuestionnaireStore } from "@/store/questionnaire";
import { useIframeBusHook } from "@/hooks/useIframeBus";
import PageShell from "@/components/PageShell/index.vue";
import Configuration from "@/configuration/index";

const { questionnaire } = toRefs(useQuestionnaireStore());
console.log("questionnaire", questionnaire);
const { createIframeInstance, destroyIframeInstance, iframeBus } =
  useIframeBusHook();
const iframeRef = ref(null);
const path = `${
  Configuration.YUNDA_H5_PATH
}pages/render/previewQuestionnaire`;

// iframe加载完毕后
function handleLoad() {
  createIframeInstance(iframeRef);

  // 监听搭建平台物料列表，当变化时同步给渲染器的物料列表，保持数据同步
  watch(
    () => questionnaire,
    (newVal) => {
      iframeBus.emit("watchPreviewProduct", cloneDeep(questionnaire.value));
    },
    { immediate: true, deep: true }
  );
}

// 离开页面销毁iframe实例
onUnmounted(() => {
  destroyIframeInstance();
});
</script>

<style lang="scss" scoped>
.canvas {
  width: 375px;
  height: 667px;
  border: none;
  overflow: auto;
  pointer-events: none;
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

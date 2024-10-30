<!--
 * @Description: 画布
 * @Autor: WangYuan1
 * @Date: 2022-10-08 15:14:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-18 16:31:17
-->
<template>
  <div class="flex" :style="{ height: 'calc(100vh - 54px)' }">
    <div class="flex-1 overflow-auto pt-50 pb50">
      <PageShell class="relative">
        <iframe ref="iframeRef" class="canvas" :src="path" @load="handleLoad" />
      </PageShell>
    </div>
    <!-- 物料属性设置器 -->
    <div class="w-350 bg-#ffffff overflow-auto">
      <template v-if="wechat?.configure?.advertising">
        <component
          v-for="(model, index) in meta?.props"
          :key="index"
          :is="model.setter.componentName"
          v-model="wechat.configure.advertising[model.name]"
          :schema="model"
          :project="wechat"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import meta from "./meta";
import PageShell from "@/components/PageShell/index.vue";
import { cloneDeep } from "@design/utils";
import { useWechatStore } from "@/store/wechat";
import { ref, toRefs, watch } from "vue";
import Configuration from "@/configuration/index";

const { wechat } = toRefs(useWechatStore());
const iframeRef = ref(null);
const path = `${Configuration.YUNDA_H5_PATH}pages/render/advertising`;

// iframe加载完毕后
function handleLoad() {
  watch(
    () => wechat,
    (newVal) => {
      iframeRef?.value?.contentWindow?.postMessage(
        { event: "watchPreviewProduct", params: cloneDeep(wechat.value) },
        "*"
      );
    },
    { immediate: true, deep: true }
  );
}
</script>

<style lang="scss" scoped>
.canvas {
  width: 375px;
  height: 667px;
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

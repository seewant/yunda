<!--
 * @Description: 画布
 * @Autor: WangYuan1
 * @Date: 2022-10-08 15:14:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-09-03 19:32:56
-->
<template>
  <div class="flex" :style="{ height: 'calc(100vh - 54px)' }">
    <div class="flex-1 overflow-auto pt-50 pb50">
      <PageShell class="relative" v-design-loading="loading">
        <MyPage :configure="wechat?.configure" />
      </PageShell>
    </div>
    <!-- 物料属性设置器 -->
    <div class="w-350 bg-#ffffff overflow-auto">
      <template v-if="wechat?.configure?.personalCenter">
        <component
          v-for="(model, index) in meta?.props"
          :key="index"
          :is="model.setter.componentName"
          v-model="wechat.configure.personalCenter[model.name]"
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
import MyPage from "./MyPage.vue";
import { cloneDeep } from "@design/utils";
import { useWechatStore } from "@/store/wechat";
import { ref, toRefs, watch } from "vue";

const { wechat } = toRefs(useWechatStore());
const iframeRef = ref(null);
let loading = ref(true);

// 进入页面进行1s的loading,用于iframe重新渲染
setTimeout(() => {
  loading.value = false;
}, 400);

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

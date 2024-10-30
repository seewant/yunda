<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-04-17 20:12:02
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-09-25 15:42:21
-->
<template>
  <div class="preview">
    <el-dialog v-if="show" v-model="show" top="50px" width="25%">
      <div class="flex">
        <div class="flex-1 p36 pl42 pr42">
          <PageShell class="relative">
            <iframe
              ref="iframeRef"
              class="canvas"
              :src="path"
              @load="handleLoad"
            />
          </PageShell>
        </div>
        <!-- <div class="w-50%">
          <img
            class="w-full h-full"
            src="https://static.mastergo.com/static/img/teamInfo-light.968aae84.jpeg"
          />
        </div> -->
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from "@design/utils";
import { ref, toRefs, watch } from "vue";
import { useProduceStore } from "@/store/product";
import PageShell from "@/components/PageShell/index.vue";
import Configuration from "@/configuration/index";

let show = ref(false);
const { product } = toRefs(useProduceStore());
const iframeRef = ref(null);
const path = `${Configuration.YUNDA_H5_PATH}pages/render/previewProduct`;

function open() {
  show.value = true;
}

// iframe加载完毕后
function handleLoad() {
  iframeRef.value.contentWindow.postMessage(
    { event: "watchPreviewProduct", params: cloneDeep(product.value) },
    "*"
  );
}

defineExpose({ open });
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

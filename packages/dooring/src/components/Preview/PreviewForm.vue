<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-04-17 20:12:02
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-04-18 09:47:00
-->
<template>
  <div class="preview">
    <el-dialog v-model="show" top="50px" width="25%">
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
import { useFormStore } from "@/store/form";
import { useIframeBusHook } from "@/hooks/useIframeBus";
import PageShell from "@/components/PageShell/index.vue";
import Configuration from "@/configuration/index";

let show = ref(false);
const { form } = toRefs(useFormStore());
const { createIframeInstance, iframeBus } = useIframeBusHook();
const iframeRef = ref(null);
const path = `${Configuration.YUNDA_H5_PATH}pages/render/previewForm`;

function open() {
  show.value = true;
}

// iframe加载完毕后
function handleLoad() {
  createIframeInstance(iframeRef);

  // 监听搭建平台物料列表，当变化时同步给渲染器的物料列表，保持数据同步
  watch(
    () => form,
    (newVal) => {
      iframeBus.emit("watchPreviewForm", cloneDeep(form.value));
    },
    { immediate: true, deep: true }
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

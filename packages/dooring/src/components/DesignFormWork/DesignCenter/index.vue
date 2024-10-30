<!--
 * @Description: 画布
 * @Autor: WangYuan1
 * @Date: 2022-10-08 15:14:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-15 14:44:36
-->
<template>
  <div class="flex-1 pt-30">
    <!-- <div>{{ form }}</div> -->
    <div>{{ currentWidgetList }}</div>
    <!-- <div>{{ currentWidget }}</div> -->
    <PageShell class="relative">
      <div
        v-if="inDragStatus"
        class="absolute w-full h-full"
        @dragover="handleDragover"
      ></div>
      <iframe ref="iframeRef" class="page" :src="path" @load="handleLoad" />
    </PageShell>
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from "@design/utils";
import { ref, toRefs, watch, onUnmounted } from "vue";
import { useFormStore } from "@/store/form";
import { useIframeBusHook } from "@/hooks/useIframeBus";
import PageShell from "@/components/PageShell/index.vue";
import Configuration from "@/configuration/index";

// 对照值,用于监听currentWidgetList数组是否变化
let oldEqualValue = "[]";
const { form, inDragStatus, currentWidgetList, currentWidget } = toRefs(
  useFormStore()
);
const { setcurrentWidget } = useFormStore();
const { createIframeInstance, destroyIframeInstance, iframeBus } =
  useIframeBusHook();
const iframeRef = ref(null);
const path = `${Configuration.YUNDA_H5_PATH}pages/build/index`;

// iframe加载完毕后
function handleLoad() {
  createIframeInstance(iframeRef);

  // 注册监听同步物料列表，当渲染器物料改动时时触发
  iframeBus.on("syncWidgetList", (data) => {
    console.log("注册监听物料选中事件，当渲染器选中物料时触发：" + data);
    currentWidgetList.value = data;
    form.value.widgetList = data;
    // 递归查询目标物料
    const findTargetWidgetById = (id, list = []) => {
      for (const item of list) {
        if (item.id == id) {
          console.log("找到了物料..." + item);
          return item;
        } else if (item.children) {
          const target = findTargetWidgetById(id, item.children);
          if (target) return target;
        }
      }
      return null;
    };

    // 当物料列表同步后，栈地址已更新，选中物料已不属于同步数组中，需要根据id重新赋值一次选中物料
    if (currentWidget.value) {
      currentWidget.value = findTargetWidgetById(
        currentWidget.value.id,
        currentWidgetList.value
      );
    }
  });

  // 注册监听物料选中，当渲染器选中物料时触发
  iframeBus.on("setCurrentWidget", (data) => {
    console.log("注册监听物料选中事件，当渲染器选中物料时触发...:" + data);
    setcurrentWidget(data);
  });

  // 监听搭建平台物料列表，当变化时同步给渲染器的物料列表，保持数据同步
  watch(
    () => currentWidgetList,
    (newVal) => {
      let newEqualValue = JSON.stringify(newVal);
      // 如果物料数组变化，则通知渲染器同步
      if (newEqualValue != oldEqualValue) {
        iframeBus.emit("watchWidgetList", cloneDeep(currentWidgetList.value));
      }
      oldEqualValue = JSON.stringify(newEqualValue);
    },
    { immediate: true, deep: true }
  );
}

// 拖拽物料到画布
function handleDragover(e) {
  e.stopPropagation();
  e.preventDefault();
  iframeBus.emit("dragover", { x: e.layerX, y: e.layerY });
}

// 离开页面销毁iframe实例
onUnmounted(() => {
  destroyIframeInstance();
});
</script>

<style lang="scss" scoped>
.page {
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

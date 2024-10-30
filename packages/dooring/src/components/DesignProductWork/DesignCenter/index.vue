<!--
 * @Description: 画布
 * @Autor: WangYuan1
 * @Date: 2022-10-08 15:14:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-15 15:14:10
-->
<template>
  <div>
    <div ref="shellRef" class="flex-1 pt-30">
      <!-- <div class="w-300">{{ currentWidgetList }}</div> -->
      <!-- <div>{{ currentWidget }}</div> -->
      <PageShell class="relative">
        <div
          v-if="inDragStatus || operationMenu.isOperationStatus"
          class="absolute w-full h-full"
          @dragover="handleDragover"
        ></div>
        <iframe ref="iframeRef" class="page" :src="path" @load="handleLoad" />
      </PageShell>
      <!-- <div>{{ operationMenu }}</div> -->
      <div
        v-show="operationMenu.show"
        class="fixed p-10 w-180 bg-#fff shadow z-999999"
        :style="{
          top: `${operationMenu.y + operationMenu.rectY + 90}px`,
          left: `${operationMenu.x + operationMenu.rectX}px`,
        }"
      >
        <div
          class="h-35 lh-35 pl-10 cursor-pointer hover:bg-#2254f4 hover:c-#fff"
        >
          复制
        </div>
        <div
          class="h-35 lh-35 pl-10 cursor-pointer hover:bg-#2254f4 hover:c-#fff"
          @click="handleDelteWidget"
        >
          删除
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from "@design/utils";
import { ref, toRefs, reactive, watch, onMounted, onUnmounted } from "vue";
import { useDesignStore } from "@/store/design";
import { useIframeBusHook } from "@/hooks/useIframeBus";
import PageShell from "@/components/PageShell/index.vue";
import Configuration from "@/configuration/index";

// 对照值,用于监听currentWidgetList数组是否变化
let oldEqualValue = "[]";
const {
  designData,
  inDragStatus,
  currentWidgetList,
  currentWidget,
  operationMenu,
} = toRefs(useDesignStore());
const { setcurrentWidget, setcurrentWidgetList, deletecurrentWidget } =
  useDesignStore();
const { createIframeInstance, destroyIframeInstance, iframeBus } =
  useIframeBusHook();
const iframeRef = ref(null);
const shellRef = ref(null);
const path = `${Configuration.YUNDA_H5_PATH}pages/build/index`;

onMounted(() => {
  const targetRect = shellRef.value.getBoundingClientRect();
  operationMenu.value.rectX = targetRect.left;
  operationMenu.value.rectY = targetRect.top;
  console.log("operationMenu", operationMenu);
  document.addEventListener("click", handleCloseContextmenu);
  document.addEventListener("contextmenu", handleCloseContextmenu);
});

// iframe加载完毕后
function handleLoad() {
  createIframeInstance(iframeRef);

  const iframeDocument = iframeRef.value.contentDocument;
  console.log("iframeDocument", iframeDocument);

  // 注册监听同步物料列表，当渲染器物料改动时时触发
  iframeBus.on("syncWidgetList", (data) => {
    console.log("注册监听物料选中事件，当渲染器选中物料时触发：" + data);
    setcurrentWidgetList(data);
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
      console.log("递归查询目标物料");
      console.log("currentWidget.value.id", currentWidget.value.id);
      console.log("currentWidgetList.value", currentWidgetList.value);

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

  iframeBus.on("contextmenu", (data) => {
    console.log("右键触发物料菜单1...:");
    // setcurrentWidget(data.widgetId);
    operationMenu.value.show = data.show;
    operationMenu.value.x = data.x;
    operationMenu.value.y = data.y;
    operationMenu.value.widgetId = data.widgetId;
    console.log("operationMenu.value", operationMenu.value);
  });

  // 监听搭建平台物料列表，当变化时同步给渲染器的物料列表，保持数据同步
  watch(
    () => currentWidgetList,
    (newVal) => {
      console.log(
        "监听搭建平台物料列表，当变化时同步给渲染器的物料列表，保持数据同步"
      );
      console.log("currentWidgetList", currentWidgetList);

      let newEqualValue = JSON.stringify(newVal.value);
      // 如果物料数组变化，则通知渲染器同步
      if (newEqualValue != oldEqualValue) {
        console.log("通知渲染器同步", currentWidgetList.value);
        iframeBus.emit("watchWidgetList", cloneDeep(currentWidgetList.value));
      }
      oldEqualValue = JSON.stringify(newEqualValue);
    },
    { immediate: true, deep: true }
  );

  watch(
    () => designData,
    (newVal) => {
      iframeBus.emit("watchPreviewData", cloneDeep(designData.value));
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

// 关闭右键菜单
function handleCloseContextmenu() {
  console.log("关闭右键菜单");
  operationMenu.value.show = false;
}

function handleDelteWidget() {
  deletecurrentWidget(currentWidget.value.id);
}

// 离开页面销毁iframe实例
onUnmounted(() => {
  document.removeEventListener("click", handleCloseContextmenu);
  document.removeEventListener("contextmenu", handleCloseContextmenu);
  destroyIframeInstance();
  operationMenu.value = {
    show: false,
    x: 0,
    y: 0,
    widgetId: "",
    rectX: 0,
    rectY: 0,
  };
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

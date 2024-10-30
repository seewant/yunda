<template>
  <div class="design">
    <!-- 物料meta列表 -->
    <div
      class="design-left"
      @dragstart="handleDragstart"
      @dragend="handleDragend"
    >
      <div
        class="design-left-item"
        v-for="(widget, index) in widgetMetaList"
        :key="index"
        :draggable="true"
        :data-component="JSON.stringify(widget)"
      >
        {{ widget.title }}
      </div>
    </div>
    <!-- 画布 -->
    <div class="design-center flex-center">
      <div
        class="design-center-canvas"
        :style="{
          width: props.design.itemConfig.props.width + 'px',
          height: props.design.itemConfig.props.height + 'px',
        }"
      >
        <div
          v-show="drag.status"
          class="design-center-canvas-mask"
          @dragover="handleDragover"
        ></div>
        <Vue3DraggableResizable
          v-for="(item, index) in props.design.widgetList"
          :key="index"
          v-model:x="item.x"
          v-model:y="item.y"
          :w="item.w"
          :h="item.h"
          :parent="true"
          @resizing="handleResizing($event, item)"
        >
          <div class="w-full h-full" @click="handleCurrentWidget(item)">
            <img
              v-if="item.componentName == 'image'"
              :src="item?.props?.url || defaultImage"
              class="w-full h-full"
            />

            <div
              v-if="item.componentName == 'text'"
              class="line-height-16"
              :class="[`line-clamp-${item?.props?.clamp || 1}`]"
              :style="getTextStyle(item?.props)"
            >
              {{ item?.props?.text }}
            </div>
          </div>
        </Vue3DraggableResizable>
      </div>
    </div>
    <!-- 设置器面板 -->
    <div class="design-right">
      <!-- <div>{{ currentWidget }}</div> -->
      <template v-if="currentWidget">
        <!-- 物料属性设置器 -->
        <component
          v-for="(model, index) in currentWidgetMeta?.props"
          :key="index"
          :is="model.setter.componentName"
          v-model="currentWidget.props[model.name]"
          :schema="model"
          :widget="currentWidget"
        />
      </template>
      <Empty v-else description="当前物料没有任何属性配置" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { createId, cloneDeep } from "@design/utils";
import { ref, reactive, computed, inject } from "vue";
import Vue3DraggableResizable from "vue3-draggable-resizable";

const props = defineProps({
  design: {
    type: Object,
    default: () => {
      return {
        itemConfig: {},
        widgetList: [],
      };
    },
  },
});

let currentWidget = ref(null);
let currentWidgetMeta = ref(null);
let defaultImage =
  "https://www.sunmao-design.top/mall-cook/image/1713180968173.jpg";
const drag = reactive({
  x: 0,
  y: 0,
  status: false,
  widgetMeta: null,
});
const widgetMetaList = ref([]);
const registerWidgetMeta = () => {
  const modules: any = import.meta.globEager("./metas/*.ts");
  for (const key in modules) {
    widgetMetaList.value.push(modules[key]?.default);
  }
};

// 注册物料meta
registerWidgetMeta();

// 拖拽物料到画布
function handleDragover(e) {
  e.stopPropagation();
  e.preventDefault();
  drag.x = e.layerX;
  drag.y = e.layerY;
}

// 开始拖拽
function handleDragstart(e: any) {
  drag.status = true;
  drag.widgetMeta = e.target.dataset.component;
}

// 拖拽完成,生成物料
function handleDragend(e: any) {
  drag.status = false;
  const tempWidget = JSON.parse(drag.widgetMeta);
  let { componentName, sign, title, w, h } = tempWidget;
  let cengetX = drag.x - w / 2;
  let cengetY = drag.y - h / 2;
  let minX = w / 2;
  let minY = h / 2;
  let maxX = props.design?.itemConfig?.props?.width - w;
  let maxy = props.design?.itemConfig?.props?.height - h;

  let widget = {
    id: createId(8),
    componentName,
    title,
    sign,
    w,
    h,
    x: cengetX > maxX ? maxX : cengetX < minX ? 0 : cengetX,
    y: cengetY > maxy ? maxy : cengetY < minY ? 0 : cengetY,
    props: {},
  };

  // 遍历props属性
  tempWidget.props.forEach((prop) => {
    let { name, defaultValue } = prop;
    widget.props[name] = cloneDeep(defaultValue);
  });

  props.design.widgetList.push(widget);
}

// 设置当前物料
function handleCurrentWidget(widget: any) {
  currentWidget.value = widget;
  currentWidgetMeta.value = widgetMetaList.value.find(
    (meta) => meta.sign === widget.sign
  );
}

// 修改尺寸
function handleResizing(event, item) {
  item.w = event.w;
  item.h = event.h;
}

function getTextStyle(item) {
  return {
    fontSize: item.size + "px",
  };
}
</script>

<style lang="scss" scoped>
::v-deep .vdr-container {
  cursor: pointer;
}

::v-deep .active {
  border: solid 1px #2463d0;
}

::v-deep .vdr-handle {
  width: 8px;
  height: 8px;
  border: 0;
  background: #2463d0;
  border-radius: 50%;
}

.design {
  display: flex;
  height: 500px;

  .design-left {
    display: flex;
    gap: 10px;
    width: 200px;

    .design-left-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70px;
      height: 70px;
      border: solid 1px #f1f1f1;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .design-center {
    flex: 1;
    background: #f7f8fa;

    .design-center-canvas {
      position: relative;
      background: #ffffff;

      .design-center-canvas-mask {
        position: absolute;
        width: 100%;
        height: 100%;
        user-select: none;
        z-index: 100;
      }
    }
  }

  .design-right {
    width: 250px;
    overflow: auto;
  }
}
</style>

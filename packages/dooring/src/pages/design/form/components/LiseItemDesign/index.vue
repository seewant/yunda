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
          width: `${form.listDesign.listConfig.props.width}px`,
          height: `${form.listDesign.listConfig.props.height}px`,
          borderRadius: `${form.listDesign.listConfig.props.radius}px`,
        }"
      >
        <div
          v-show="drag.status"
          class="design-center-canvas-mask"
          @dragover="handleDragover"
        ></div>
        <!-- <DraggableContainer referenceLineColor="#2254f4"> -->
          <Vue3DraggableResizable
            v-for="(item, index) in form.listDesign.widgetList"
            :key="index"
            v-model:x="item.x"
            v-model:y="item.y"
            :minW="20"
            :w="item.w"
            :h="item.h"
            :parent="true"
            :handles="['tl', 'tr', 'bl', 'br']"
            @resizing="handleResizing($event, item)"
          >
            <!-- 图片物料 -->
            <div class="w-full h-full" @click="handleCurrentWidget(item)">
              <div v-if="item.componentName == 'image'" class="w-full h-full">
                <img
                  v-if="
                    item?.props?.data.type == 'static' &&
                    item?.props?.data.staticValue
                  "
                  :src="item?.props?.data.staticValue || defaultImage"
                  class="w-full h-full"
                />
                <div
                  v-else
                  class="flex flex-col w-full h-full flex-center bg-#f3f3f3"
                  :style="{ borderRadius: `${item.props.radius}px` }"
                >
                  <img
                    class="w-35 h-35"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAyMSAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOC43OTcyIDBIMS4zNTcyMkMwLjU2MTY1OSAwLjA1Mzk1ODkgLTAuMDQyNDI4IDAuNzM4MDg0IDAuMDAyMzM1MjMgMS41MzQ0VjE1LjI2NTZDLTAuMDQyNDI4IDE2LjA2MTkgMC41NjE2NTkgMTYuNzQ2IDEuMzU3MjIgMTYuOEgxOC44MDg0QzE5LjYwMTcgMTYuNzQzMSAyMC4yMDI1IDE2LjA1OTkgMjAuMTU3NiAxNS4yNjU2VjEuNTIzMkMyMC4xODEyIDAuNzM0NDE1IDE5LjU4MzQgMC4wNjUxNjIgMTguNzk3MiAwWk0xNS43NzM5IDMuNDg4OEMxNi41OTIgMy4zODE2NiAxNy4zNDIyIDMuOTU3ODUgMTcuNDUgNC43NzYxM0MxNy41NTc3IDUuNTk0NCAxNi45ODIyIDYuMzQ1MjIgMTYuMTY0MiA2LjQ1MzZDMTUuMzQ2MiA2LjU2MTk4IDE0LjU5NTEgNS45ODY5MSAxNC40ODYyIDUuMTY4OEMxNC40ODA4IDUuMTA1NDUgMTQuNDgwOCA1LjA0MTc1IDE0LjQ4NjIgNC45Nzg0QzE0LjQ0MTQgNC4yMTA5NCAxNS4wMjM4IDMuNTUwOTcgMTUuNzkwNyAzLjVMMTUuNzczOSAzLjQ4ODhaTTMuNDQ1NTMgMTMuNzE0NEgxNi43MkwxNi43NDggMTMuNzMxMkMxNi44OTA4IDEzLjcxMDEgMTcuMDI2OCAxMy42NTY1IDE3LjE0NTUgMTMuNTc0NEMxNy4zNDA5IDEzLjQzNjkgMTcuNDczMiAxMy4yMjcxIDE3LjUxMzIgMTIuOTkxNUMxNy41NTMxIDEyLjc1NiAxNy40OTc0IDEyLjUxNDIgMTcuMzU4MyAxMi4zMkwxNS4xNDY4IDkuMjY4QzE1LjAxMDUgOS4wNzgxNiAxNC43OTI2IDguOTYzOTQgMTQuNTU4OSA4Ljk2QzE0LjMxNzggOC45NTI1MiAxNC4wODg4IDkuMDY1OTcgMTMuOTQ4NyA5LjI2MjRMMTIuMTQwMyAxMS43NkMxMS45OTgzIDExLjk1NzkgMTEuNzY3OSAxMi4wNzMxIDExLjUyNDUgMTIuMDY4QzExLjI5MDEgMTIuMDY2OCAxMS4wNzEgMTEuOTUyIDEwLjkzNjYgMTEuNzZMNy42NzgxNSA3LjI4QzcuNTQ3ODMgNy4wOTc3NyA3LjM0MTkyIDYuOTg0NSA3LjExODI4IDYuOTcyQzYuODgzOTggNi45NzMyMSA2LjY2NDgyIDcuMDg4MDMgNi41MzA0MSA3LjI4TDIuODU3NjcgMTIuMzJDMi43NjA1MSAxMi40Mzg3IDIuNjk4NDUgMTIuNTgyMyAyLjY3ODUxIDEyLjczNDRDMi42MjI0NyAxMy4yMTYxIDIuOTY0NTUgMTMuNjUzMiAzLjQ0NTUzIDEzLjcxNDRaIiBmaWxsPSIjNDA4MWZmIi8+Cjwvc3ZnPgo="
                  />
                  <span class="mt-4 text-10 c-theme">{{
                    item?.props?.data.value
                  }}</span>
                </div>
                <!-- {{ item.props }} -->
              </div>

              <!-- 文本物料 -->
              <div
                v-if="item.componentName == 'text'"
                class="w-full h-full select-none"
              >
                <div
                  v-if="item?.props?.data.type == 'variable'"
                  class="flex-center w-full h-full p-2 bg-#f0f0f0 text-12"
                >
                  <span v-if="item?.props?.data.variableValue" class="c-theme">
                    {{ item?.props?.data.variableValue }}
                  </span>
                  <span v-else class="c-#959595">未绑定数据</span>
                </div>

                <div
                  v-if="item?.props?.data.type == 'static'"
                  :class="[`line-clamp-${item?.props?.clamp || 1}`]"
                  class="lh-20"
                  :style="getTextStyle(item?.props)"
                >
                  {{ item?.props?.data.staticValue }}
                </div>
              </div>
            </div>
          </Vue3DraggableResizable>
        <!-- </DraggableContainer> -->
      </div>
    </div>
    <!-- 设置器面板 -->
    <div class="design-right">
      <!-- <div>{{ currentWidget }}</div> -->
      <template v-if="currentWidget">
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
import { useFormStore } from "@/store/form";
import { createId, cloneDeep } from "@design/utils";
import { ref, reactive, computed, toRefs } from "vue";
import { DraggableContainer } from "vue3-draggable-resizable";
import Vue3DraggableResizable from "vue3-draggable-resizable";

const { form } = toRefs(useFormStore());

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
  const modules: any = import.meta.globEager("../../metas/*.ts");
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
  let maxX = 375 - w;
  let maxy = 667 - h;

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

  form.value.listDesign.widgetList.push(widget);
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
    fontWeight: item.bold ? "bold" : "normal",
    fontSize: item.size + "px",
  };
}
</script>

<style lang="scss" scoped>
::v-deep .vdr-container {
  cursor: pointer;
  border: 0;

  .vdr-handle {
    width: 6px;
    height: 6px;
    border: 0;
    border-radius: 50%;
    background: #2463d0;
    // box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
  }

  .vdr-handle-tl {
    top: -2px;
    left: -2px;
  }

  .vdr-handle-tr {
    top: -2px;
    right: -4px;
  }

  .vdr-handle-bl {
    bottom: -4px;
    left: -2px;
  }
}

::v-deep .active {
  // border: solid 1px #2463d0;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border: dashed 1px #2463d0;
    pointer-events: none;
  }
}

.design {
  display: flex;
  height: 600px;

  .design-left {
    display: flex;
    gap: 10px;
    width: 200px;
    padding: 20px 15px 15px 15px;
    background: #fff;
    box-shadow: inset -1px 0 0 0 #ebedf0;

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
    width: 280px;
    overflow: auto;
    background: #ffffff;
  }
}
</style>

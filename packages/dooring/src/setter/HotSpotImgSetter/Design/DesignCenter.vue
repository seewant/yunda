<template>
  <!-- 画布 -->
  <div class="design-center flex-center">
    <div
      class="design-center-canvas"
      :style="{
        width: `${canvas.width}px`,
        height: `${canvas.height}px`,
        backgroundImage: `url(${canvas.background})`,
      }"
    >
      <div
        v-show="drag.status"
        class="design-center-canvas-mask"
        @dragover="handleDragover"
      ></div>
      <DraggableContainer :disabled="true" referenceLineColor="#2254f4">
        <Vue3DraggableResizable
          v-for="(item, index) in widgetList"
          :key="index"
          v-model:x="item.x"
          v-model:y="item.y"
          :minW="20"
          :w="item.w"
          :h="item.h"
          :handles="['tl', 'tr', 'bl', 'br']"
          @resizing="handleResizing($event, item)"
        >
          <!-- 物料操作栏 -->
          <div v-show="item.id == currentWidget?.id" class="operation">
            <div class="operation-item" @click="handletCopyWidget(item)">
              <svg
                role="img"
                aria-label="copy"
                focusable="false"
                data-icon="copy"
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="gd_design_icon gd_design_icon-copy dui-context-menu__item-icon"
              >
                <path
                  d="M19 15H16.5V16.5H19C20.1046 16.5 21 15.6046 21 14.5V4.5C21 3.39543 20.1046 2.5 19 2.5H10.5C9.39543 2.5 8.5 3.39543 8.5 4.5V6.5H10V4.5C10 4.22386 10.2239 4 10.5 4H19C19.2761 4 19.5 4.22386 19.5 4.5V14.5C19.5 14.7761 19.2761 15 19 15Z"
                  fill="currentColor"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 9.5C3 8.39543 3.89543 7.5 5 7.5H13.5C14.6046 7.5 15.5 8.39543 15.5 9.5V19.5C15.5 20.6046 14.6046 21.5 13.5 21.5H5C3.89543 21.5 3 20.6046 3 19.5V9.5ZM13.5 20H5C4.72386 20 4.5 19.7761 4.5 19.5V9.5C4.5 9.22386 4.72386 9 5 9H13.5C13.7761 9 14 9.22386 14 9.5V19.5C14 19.7761 13.7761 20 13.5 20Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div class="operation-item" @click="handletDeleteWidget(item)">
              <svg
                role="img"
                aria-label="delete"
                focusable="false"
                data-icon="delete"
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="gd_design_icon gd_design_icon-delete"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.0253 3C9.68865 3 9.37458 3.1694 9.18967 3.45074L8.5 4.5H15.5L14.8103 3.45074C14.6254 3.1694 14.3113 3 13.9747 3H10.0253ZM3 4.50001H4.5H6.00583H17.9942H19.5H21V6.00001H19.3676L18.161 19.6758C18.0699 20.7082 17.2051 21.5 16.1687 21.5H7.8313C6.79486 21.5 5.93014 20.7082 5.83904 19.6758L4.63235 6.00001H3V4.50001ZM6.13818 6.00001H17.8618L16.6668 19.544C16.644 19.8021 16.4278 20 16.1687 20H7.8313C7.57219 20 7.35601 19.8021 7.33323 19.544L6.13818 6.00001Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
          <div class="widget w-full h-full" @click="handleCurrentWidget(item)">
            <!-- 图片物料 -->
            <div v-if="item.componentName == 'image'" class="w-full h-full">
              <img
                :src="item?.props?.url || defaultImage"
                class="w-full h-full"
              />
            </div>

            <!-- 文本物料 -->
            <div
              v-if="item.componentName == 'text'"
              class="widget-text"
              :style="getTextStyle(item?.props)"
            >
              {{ item?.props?.text }}
            </div>

            <!-- 空白物料 -->
            <div v-if="item.componentName == 'block'" class="widget-block">
              设置跳转
            </div>
          </div>
        </Vue3DraggableResizable>
      </DraggableContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, toRefs } from "vue";
import { useDesignHook } from "./useDesign";
import { DraggableContainer } from "vue3-draggable-resizable";
import Vue3DraggableResizable from "vue3-draggable-resizable";

const { drag, canvas, currentWidget, widgetList } = toRefs(useDesignHook());
const { handleCurrentWidget, handletDeleteWidget, handletCopyWidget } =
  useDesignHook();

let defaultImage =
  "https://www.sunmao-design.top/mall-cook/image/1713180968173.jpg";

// 拖拽物料到画布
function handleDragover(e) {
  e.stopPropagation();
  e.preventDefault();
  drag.value.x = e.layerX;
  drag.value.y = e.layerY;
  console.log("拖拽物料到画布", drag.x);
}

// 修改尺寸
function handleResizing(event, item) {
  item.w = event.w;
  item.h = event.h;
}

function getTextStyle(item) {
  return {
    lineHeight: item.lineHieght + "px",
    fontSize: item.size + "px",
    color: item.color,
    fontWeight: item.bold ? "bold" : "normal",
  };
}
</script>

<style lang="scss" scoped>
::v-deep .vdr-container {
  cursor: pointer;
  border: 0;

  .vdr-handle {
    width: 10px;
    height: 10px;
    border: 0;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }

  .vdr-handle-tl {
    top: -4px;
    left: -4px;
  }

  .vdr-handle-tr {
    top: -4px;
    right: -6px;
  }

  .vdr-handle-bl {
    bottom: -6px;
    left: -4px;
  }

  .vdr-handle-br {
    right: -6px;
    bottom: -6px;
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

.design-center {
  flex: 1;
  background: #f7f8fa;
  padding: 20px 0;

  .design-center-canvas {
    position: relative;
    background: #ffffff;
    width: 375px;
    background-size: cover;
    overflow: hidden;

    .design-center-canvas-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      user-select: none;
      z-index: 100;
    }
  }
}

.widget {
  user-select: none;
}

.widget-text {
  white-space: pre-wrap;
}

.widget-block {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(21, 91, 212, 0.6);
}

.operation {
  position: absolute;
  top: -45px;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  background: #ffffff !important;
  border-radius: 10px;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.35),
    0px 8px 32px 2px rgba(0, 0, 0, 0.1);
  color: #222529;
  cursor: default;
  z-index: 99;

  .operation-item {
    width: 28px;
    height: 28px;
    padding: 4px 5px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      background: #eeeded;
    }
  }
}
</style>

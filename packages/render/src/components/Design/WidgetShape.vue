<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-01-17 19:24:26
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-30 14:38:07
-->
<template>
  <div
    :id="widget.id"
    class="shape"
    :class="[
      // 拖拽物料在包含slot物料与其他物料上时，激活物料辅助拖拽的样式
      drag?.id == widget.id
        ? drag?.type == 'slotWidget'
          ? 'drag-slot'
          : hoverWidgetIsTop
          ? 'drag-widget-top'
          : 'drag-widget-bottom'
        : '',
      // 鼠标移动到物料上时，激活物料的hover样式
      hoverWidgetId == widget.id && 'event-hover',
      // 鼠标点击物料时，激活物料的选中样式
      currentWidget?.id == widget?.id && 'event-click',
    ]"
    @mouseover.stop="handleMouseEnter"
    @mouseout.stop="handleMouseOut"
    @click.stop="handleCurrentWidget()"
    @contextmenu.stop="handleContextmenu($event)"
  >
    <!-- 非Tab物料，增加蒙层禁止操作 -->
    <div
      :class="[widget?.configure?.component?.isFrom ? 'event-none' : '']"
    ></div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { toRefs, defineProps } from "vue";
import { useDesignHook } from "@/hooks/useDesign";

const props = defineProps({
  widget: {
    type: Object,
    default: () => {},
  },
});

const { drag, currentWidget, hoverWidgetId, hoverWidgetIsTop } = toRefs(
  useDesignHook()
);
const { handleSetCurrentWidget, handleWidgetContextmenu } = useDesignHook();

// 鼠标移入物料，标记物料，激活hover样式
const handleMouseEnter = (event: MouseEvent) => {
  const element = event.currentTarget;

  // 计算并获取目标元素的高度
  const height = element.offsetHeight;

  console.log(`目标元素的高度为: ${height}px`);
  hoverWidgetId.value = event.currentTarget?.id;
};

// 鼠标移出物料，清空标记物料
const handleMouseOut = (event: MouseEvent) => {
  hoverWidgetId.value = "";
};

function handleCurrentWidget() {
  handleSetCurrentWidget(props.widget);

  handleWidgetContextmenu({
    show: false,
    widgetId: "",
    x: "",
    y: "",
  });
}
// 显示上下文菜单
const handleContextmenu = (event: MouseEvent) => {
  event.preventDefault();
  console.log("触发右键");
  console.log("event", event);

  // 获取相对于视口的坐标
  const clientX = event.clientX;
  const clientY = event.clientY;

  // 获取页面滚动的距离
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // 调整为相对于屏幕的坐标
  const adjustedScreenX = clientX;
  const adjustedScreenY = clientY;
  handleWidgetContextmenu({
    show: true,
    widgetId: props.widget?.id,
    x: adjustedScreenX,
    y: adjustedScreenY,
  });

  setTimeout(() => {
    handleSetCurrentWidget(props.widget);
  }, 50);
};
</script>

<style lang="scss" scoped>
.shape {
  position: relative;
  cursor: pointer;
}

.event-hover {
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: dashed 2px #8faaff;
    z-index: 100;
    pointer-events: none;
  }
}

.event-click {
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: solid 2px #8faaff;
    z-index: 100;
    pointer-events: none;
  }
}

.event-none {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 101;
  user-select: none;
}

.drag-widget-top {
  &::after {
    content: "";
    position: absolute;
    top: 0px;
    left: 0;
    height: 3px;
    width: 100%;
    background: #2254f4;
    color: #ffffff;
    user-select: none;
  }
}

.drag-widget-bottom {
  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0;
    height: 3px;
    width: 100%;
    background: #2254f4;
    color: #ffffff;
    user-select: none;
  }
}

.drag-slot {
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // border: solid 1px #8faaff;
    z-index: 100;
    // background: #b0ccf4;
    background: #eff3fb;
    opacity: 0.7;
  }
}
</style>

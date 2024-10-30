<!--
 * @Description: 物料嵌套渲染列表
 * @Autor: WangYuan1
 * @Date: 2022-10-24 19:57:53
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-30 14:30:43
-->
<template>
  <VueDraggable
    v-model="model"
    :group="{ name: 'design' }"
    item-key="id"
    animation="300"
    :sort="true"
    :disabled="disabled"
    :class="[isChild && !model.length ? 'area-empty' : '']"
    @end.stop="handleEnd"
  >
    <WidgetShape v-for="widget in model" :key="widget.id" :widget="widget">
      <component
        :is="widget.componentName"
        :id="widget.id"
        :widget="widget"
        :widgetId="widget.id"
        :widgetType="widget.isPrivate ? 'slotWidget' : 'basicsWidget'"
        :TabActiveId="getTabActiveId(props.fatherWidget)"
        :inDesign="true"
        v-bind="widget.props"
      >
        <WidgetListNext
          v-if="widget?.children"
          v-model="widget.children"
          :isChild="true"
          :disabled="widget?.isContainer || widget?.isTab"
          :fatherWidget="widget"
        />
      </component>
    </WidgetShape>
  </VueDraggable>
</template>

<script setup lang="ts">
import { toRefs, defineProps, ref } from "vue";
import { useVModel } from "@vueuse/core";
import { VueDraggable } from "vue-draggable-plus";
import { useDesignHook } from "@/hooks/useDesign";
import WidgetShape from "./WidgetShape.vue";

const { handleSyncWidgetList } = useDesignHook();

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  isChild: {
    type: Boolean,
    default: false,
  },
  fatherWidget: {
    type: Object,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

// v-model 配置
const emit = defineEmits(["update:modelValue"]);
const model: any = useVModel(props, "modelValue", emit);

function handleEnd() {
  console.log("物料拖拽结束...");
  handleSyncWidgetList();
}

function handleStart(event) {
  console.log("物料拖拽开始...");
  console.log("event", event.target);
}

// tab物料返回激活TabId，其他物料忽略此属性
function getTabActiveId(widget) {
  return widget?.isTab
    ? props.fatherWidget?.props[widget.tabProp]?.activeId
    : "";
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 667px;
}

.page-empty {
  position: relative;
  background: url("https://file.qingflow.com/assets/empty-content/applying-editorial-tips.png?x-oss-process=image/format,webp");
  background-size: 144px 144px;
  background-repeat: no-repeat;
  background-position: 115px 200px;
  &::after {
    content: "从左侧面板拖入组件";
    position: absolute;
    top: 340px;
    left: 50%;
    transform: translateX(-50%);
    color: #8591a2;
    font-size: 10px;
  }
}
.child-empty {
  position: relative;
  min-height: 100px;
  background: #fafbfc;
  &::after {
    content: "拖拽物料到容器内";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #8591a2;
    font-size: 10px;
  }
}

.area-empty {
  position: relative;
  min-height: 100px;
  background: #f3f4f550;
  &::after {
    content: "可拖拽物料到此处";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #8591a2;
    font-size: 12px;
  }
}

.area-move {
  background: #507afc;
  &::after {
    color: #fff;
  }
}
</style>

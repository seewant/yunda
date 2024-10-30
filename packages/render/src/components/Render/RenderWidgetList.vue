<!--
 * @Description: 物料嵌套渲染列表
 * @Autor: WangYuan1
 * @Date: 2022-10-24 19:57:53
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-04-30 10:49:29
-->
<template>
  <div>
    <component
      v-for="widget in widgetList"
      :key="widget.id"
      :is="widget.componentName"
      :widget="widget"
      v-bind="widget.props"
      :TabActiveId="getTabActiveId(props.fatherWidget)"
    >
      <RenderWidgetList
        v-if="widget?.children"
        :widgetList="widget.children"
        :isChild="true"
        v-bind="widget.props"
        :fatherWidget="widget"
      />
    </component>
  </div>
</template>

<script setup lang="ts">
import { toRefs, defineProps } from "vue";

const props = defineProps({
  widgetList: {
    type: Array,
    default: () => [],
  },
  fatherWidget: {
    type: Object,
  },
  isChild: {
    type: Boolean,
    default: false,
  },
});

// tab物料返回激活TabId，其他物料忽略此属性
function getTabActiveId(widget) {
  return widget?.isTab
    ? props.fatherWidget?.props[widget.tabProp]?.activeId
    : "";
}
</script>

<style lang="scss" scoped></style>

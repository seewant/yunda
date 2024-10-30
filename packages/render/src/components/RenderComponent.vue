<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-01-17 14:46:56
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-04-26 14:14:27
-->
<!-- :is="getWidget(widget.componentName)" -->

<template>
  <div>
    <div>{{ getWidget(widget.componentName) }}</div>
    <component
      :is="getWidget(widget.componentName)"
      :id="widget.id"
      :widgetId="widget.id"
      :widgetType="widget.isPrivate ? 'slotWidget' : 'basicsWidget'"
      v-bind="widget.props"
    >
      <slot />
    </component>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, defineProps, computed } from "vue";
import { useWidgetHook } from "@/hooks/useWidget";

const { getWidget } = useWidgetHook();

const props = defineProps({
  widget: {
    type: Object,
    default: () => {},
  },
});
</script>

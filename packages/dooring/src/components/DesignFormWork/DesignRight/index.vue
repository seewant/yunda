<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2023-12-22 10:35:32
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-04-18 10:00:10
-->
<template>
  <div class="w-320 h-full bg-#ffffff overflow-auto">
    <!-- {{ currentWidget }} -->
    <!-- <div>{{ currentWidgetMeta?.props }}</div> -->
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
    <Empty v-else description="当前状态无法编辑" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, defineProps, computed } from "vue";
import { useFormStore } from "@/store/form";
import Empty from "@design/components/Empty";

const { currentWidget, currentWidgetMeta } = toRefs(useFormStore());
</script>

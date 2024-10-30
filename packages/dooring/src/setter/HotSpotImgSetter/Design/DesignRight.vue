<template>
  <!-- 设置器面板 -->
  <div class="design-right">
    <template v-if="currentWidget">
      <div class="pt-30 pl-12 pb-10 text-18 font-700">
        {{ currentWidget?.title }}
      </div>
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
</template>

<script setup lang="ts">
import { ref, reactive, computed, toRefs } from "vue";
import { useDesignHook } from "./useDesign";

const { currentWidgetMeta, currentWidget } = toRefs(useDesignHook());
</script>

<style lang="scss" scoped>
.design-right {
  width: 280px;
  overflow: auto;
  background: #ffffff;
}
</style>

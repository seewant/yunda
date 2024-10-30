<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2023-12-22 10:35:32
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-29 17:24:31
-->
<template>
  <div class="w-320 bg-#ffffff overflow-auto">
    <!-- {{ currentWidget }} -->
    <!-- <div>{{ currentWidgetMeta?.props }}</div> -->
    <div v-if="isPage" class="flex h-50">
      <div
        class="flex-1 flex-center cursor-pointer"
        :class="active == 'widget' ? 'c-theme' : ''"
        @click="active = 'widget'"
      >
        物料
      </div>
      <div
        class="flex-1 flex-center cursor-pointer"
        :class="active == 'page' ? 'c-theme' : ''"
        @click="active = 'page'"
      >
        页面
      </div>
    </div>
    <template v-if="currentWidget && active == 'widget'">
      <!-- 物料属性设置器 -->
      <div v-for="(meta, index) in currentWidgetMeta?.props" :key="index">
        <component
          v-show="isShow(meta)"
          :is="meta.setter.componentName"
          v-model="currentWidget.props[meta.name]"
          :schema="meta"
          :widget="currentWidget || {}"
          :type="type"
        />
      </div>
    </template>
    <template v-else-if="active == 'page' && designData.configure">
      <component
        v-for="(model, index) in meta?.props"
        :key="index"
        :is="model.setter.componentName"
        v-model="designData.configure[model.name]"
        :schema="model"
      />
    </template>
    <Empty v-else description="当前状态无法编辑" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, inject, computed } from "vue";
import { useDesignStore } from "@/store/design";
import meta from "./meta";
import Empty from "@design/components/Empty";

const props = defineProps({
  isPage: {
    type: Boolean,
    default: false,
  },
});

const { designData, currentWidget, currentWidgetMeta } = toRefs(
  useDesignStore()
);
const type = inject("type");

let active = ref("widget");

function isShow(meta: any) {
  if (meta?.condition && currentWidget?.value?.props) {
    let result = meta?.condition(currentWidget.value.props);
    return result;
  }
  return true;
}
</script>

<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2023-12-22 10:35:32
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-24 19:05:36
-->
<template>
  <div class="w-350 h-full bg-#ffffff overflow-auto">
    <!-- 物料属性设置器 -->
    <component
      v-for="(model, index) in meta?.props"
      :key="index"
      :is="model.setter.componentName"
      v-model="questionnaire[model.name]"
      :schema="model"
    />
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import meta from "@/meta/questionnaire";
import { useQuestionnaireStore } from "@/store/questionnaire";

const { questionnaire } = toRefs(useQuestionnaireStore());
</script>

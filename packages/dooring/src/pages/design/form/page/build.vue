<!--
 * @Description: 项目设计工作台
 * @Autor: WangYuan1
 * @Date: 2022-10-08 15:26:46
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-07 15:35:54
-->
<template>
  <DesignProductWork
    v-if="complete"
    v-design-loading="!complete"
    type="form"
    style="height: calc(100vh - 96px)"
  />
</template>

<script setup lang="ts">
import { ref, toRefs, computed, defineProps } from "vue";
import { useDesignStore } from "@/store/design";
import { useFormStore } from "@/store/form";
import DesignProductWork from "@/components/DesignProductWork";

let complete = ref(false);
const { initDesign } = useDesignStore();
const { form } = toRefs(useFormStore());

initDesign(form.value.formDesign);

// 进入页面进行1s的loading,用于iframe重新渲染
setTimeout(() => {
  complete.value = true;
}, 400);
</script>

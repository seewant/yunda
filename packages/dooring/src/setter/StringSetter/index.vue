<!--
 * @Description: 文本控件
 * @Autor: WangYuan1
 * @Date: 2022-10-18 10:45:43
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-04-02 19:49:15
-->
<template>
  <SetterItem v-show="condition" :title="props?.schema?.title">
    <textarea
      v-if="schema?.setter?.props?.type == 'textarea'"
      :rows="schema?.setter?.props?.rows || 4"
      cols="50"
      v-model="model"
    ></textarea>

    <input v-else v-model="model" />
  </SetterItem>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import SetterItem from "@/components/SetterItem/index.vue";
import { useSetterHook } from "@/hooks/useSetter";

const props = defineProps({
  modelValue: {
    type: String,
  },
  widget: {
    type: Object,
    default: () => {},
  },
  schema: {
    type: Object,
    default: () => {},
  },
});

const { condition } = useSetterHook(props);

// v-model 配置
const emit = defineEmits(["update:modelValue"]);
const model = useVModel(props, "modelValue", emit);
</script>

<style lang="scss" scoped>
input {
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  padding: 0 12px;
  border: 0;
  border-radius: 6px;
  background: #f0f0f0;
  color: #3c3c3c;
  font-size: 12px;
}

textarea {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  border: 0;
  border-radius: 6px;
  background: #f0f0f0;
  color: #3c3c3c;
  font-size: 12px;
  font-weight: 600;
}
</style>

<!--
 * @Description: 文本控件
 * @Autor: WangYuan1
 * @Date: 2022-10-18 10:45:43
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-05-14 11:59:44
-->
<template>
  <SetterItem v-show="condition" :title="props?.schema?.title">
    <div class="setter">
      <div class="flex items-center">
        <el-color-picker v-model="model" show-alpha color-format="hex" />
        <div class="ml-2">{{ colorValue }}</div>
      </div>
      <!-- <div>100%</div> -->
    </div>
  </SetterItem>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive, computed } from "vue";
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

const colorValue = computed(() => {
  if (model.value) {
    return model.value.substring(1);
  }
  return "";
});
</script>

<style lang="scss" scoped>
.setter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  padding: 0 18px 0 8px;
  border-radius: 6px;
  background: #f0f0f0;
  color: #6b6d6b;
  font-size: 13px;
  cursor: pointer;
  .setter-color {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    margin-right: 8px;
    border-radius: 3px;
    position: relative;
    border: 1px solid #bdbdbd;
  }
}
</style>

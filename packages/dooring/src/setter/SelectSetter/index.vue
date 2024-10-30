<!--
 * @Description: 文本控件
 * @Autor: WangYuan1
 * @Date: 2022-10-18 10:45:43
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-04-29 17:08:38
-->
<template>
  <SetterItem
    v-show="condition"
    :title="props?.schema?.title"
    :aloneTitle="true"
  >
    <template v-if="isRow" #header>
      <div class="ml-10">{{ label }}</div>
    </template>
    <div class="select-setter">
      <div v-if="!isRow" class="w-60px mt-10px mr-2">{{ label }}</div>
      <ul class="options">
        <li
          v-for="(item, index) in schema?.setter?.props?.options"
          :key="index"
          class="options-item"
          :class="item.value == modelValue ? 'options-item-active' : ''"
          @click="model = item.value"
        >
          {{ item?.label }}
        </li>
      </ul>
    </div>
  </SetterItem>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
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

const label = computed(() => {
  let temp = props.schema?.setter?.props?.options?.find(
    (item: any) => item.value == model.value
  );
  console.log("temp", temp);
  return temp?.label;
});

const isRow = computed(() => {
  return props.schema?.setter?.props?.options?.length > 4;
});

// v-model 配置
const emit = defineEmits(["update:modelValue"]);
const model = useVModel(props, "modelValue", emit);
</script>

<style lang="scss" scoped>
.select-setter {
  display: flex;
  flex: 1;
  justify-content: space-between;
  font-size: 14px;

  .options {
    display: flex;
    flex-wrap: wrap;
    .options-item {
      display: flex;
      align-items: center;
      height: 32px;
      padding: 0 12px;
      min-width: 50px;
      border: 1px solid #dcdee0;
      border-radius: 0;
      border-color: #ebedf0;
      font-size: 12px;
      font-weight: 500;
      text-align: center;
      cursor: pointer;

      &:hover {
        color: $theme-color;
        border-color: $theme-color;
        background-color: #e0edff;
        i {
          color: $theme-color;
        }
      }

      i {
        color: #979797;
      }
    }

    .options-item-active {
      color: $theme-color;
      border-color: $theme-color;
      background-color: #e0edff;
      i {
        color: $theme-color;
      }
    }
  }
}
</style>

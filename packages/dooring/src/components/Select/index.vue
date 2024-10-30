<!--
 * @Description: 文本控件
 * @Autor: WangYuan1
 * @Date: 2022-10-18 10:45:43
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-03-26 14:43:05
-->
<template>
  <div class="select-setter">
    <ul class="options">
      <li
        v-for="(item, index) in options"
        :key="index"
        class="options-item"
        :class="item.value == modelValue ? 'options-item-active' : ''"
        @click="handleClick(item)"
      >
        {{ item?.label }}
      </li>
    </ul>
  </div>
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
  options: {
    type: Array,
    default: () => [],
  },
});

const label = computed(() => {
  let temp = props?.options?.find((item: any) => item.value == model.value);
  console.log("temp", temp);
  return temp?.label;
});

// v-model 配置
const emit = defineEmits(["update:modelValue", "choose"]);
const model = useVModel(props, "modelValue", emit);

function handleClick(item) {
  console.log("handleClick", item);
  model.value = item.value;
  console.log("model.value", model.value);
  emit("choose", item);
}
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

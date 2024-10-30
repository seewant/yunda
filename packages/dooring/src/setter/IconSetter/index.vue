<!--
 * @Description: 文本控件
 * @Autor: WangYuan1
 * @Date: 2022-10-18 10:45:43
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-08-27 20:24:21
-->
<template>
  <div>
    <SetterItem :title="props?.schema?.title">
      <div class="setter" @click="handleOpen">
        <svg class="w-20 h-20" aria-hidden="true">
          <use :xlink:href="`#${model}`"></use>
        </svg>
        <div class="ml-5">图标</div>
      </div>
    </SetterItem>
    <!-- <div>{{ modelValue }}</div> -->

    <Dialog ref="HotSpotRef" @submit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, computed } from "vue";
import { cloneDeep } from "@design/utils";
import { useVModel } from "@vueuse/core";
import Dialog from "./Dialog";
import SetterItem from "@/components/SetterItem/index.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return {};
    },
  },
  schema: {
    type: Object,
    default: () => {},
  },
  project: {
    type: Object,
    default: () => {},
  },
});

// v-model 配置
const emit = defineEmits(["update:modelValue"]);
const model = useVModel(props, "modelValue", emit);
const HotSpotRef = ref<any>();
provide("project", props.project);

function handleOpen() {
  HotSpotRef.value.open(cloneDeep(model.value));
}

function handleSubmit(target) {
  console.log("target", target);
  model.value = target;
}
</script>

<style lang="scss" scoped>
.setter {
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  padding: 0 8px;
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
    margin-right: 10px;
    border-radius: 3px;
    position: relative;
  }
}
</style>

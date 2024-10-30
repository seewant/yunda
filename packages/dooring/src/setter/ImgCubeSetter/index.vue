<!--
 * @Description: 文本控件
 * @Autor: WangYuan1
 * @Date: 2022-10-18 10:45:43
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-03-27 14:37:41
-->
<template>
  <div class="setter" v-show="condition" :title="props?.schema?.title">
    <div
      v-if="model.mode == 'custom'"
      class="flex items-center flex-justify-between mb-20"
    >
      <div>魔方密度:</div>
      <el-select
        v-model="customMode"
        placeholder="请选择"
        @change="handleChange"
      >
        <el-option key="1" label="4X4" :value="4"> </el-option>
        <el-option key="2" label="5X5" :value="5"> </el-option>
        <el-option key="3" label="6X6" :value="6"> </el-option>
        <el-option key="4" label="7X7" :value="7"> </el-option>
      </el-select>
    </div>
    <div class="mb-10">魔方布局</div>
    <div v-if="model.mode == 'custom'" class="mb-10 text-12">
      移动鼠标选定布局区域大小
    </div>
    <div v-else class="mb-10 text-12">
      选定布局区域，在下方添加图片，建议添加比例一致的图片
    </div>
    <CapCubeLayout
      ref="capCubeRef"
      v-model="model"
      :mode="model.mode"
      @choose="handleClickCube"
    />
    <div v-if="curCube" class="bg-#f7f8fa pt-10 pb-10 mb-40 mt-25">
      <UploadSetter :schema="{ title: '图片' }" v-model="curCube.image" />
    </div>
    <div class="flex items-center mb-20">
      <span>选择模板</span>
      <span class="ml-10 c-black">{{ model.label }}</span>
    </div>
    <Select
      v-model="model.mode"
      :options="cubeList"
      @choose="handleChooseMode"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive, computed } from "vue";
import { useVModel } from "@vueuse/core";
import { useSetterHook } from "@/hooks/useSetter";
import { cloneDeep } from "@design/utils";
import CapCubeLayout from "./CapCubeLayout";
import cubeList from "./cubeList";
import Select from "@/components/Select";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return {
        cubeList: [],
      };
    },
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
const capCubeRef = ref<any>();
let customMode = ref(4);
let curCube = ref(null);

// v-model 配置
const emit = defineEmits(["update:modelValue"]);
const model = useVModel(props, "modelValue", emit);

function handleChooseMode(target) {
  customMode.value = 4;
  curCube.value = null;
  model.value.cubeList = [];
  capCubeRef.value.reset();

  let { row, col, cubeList, label } = target;
  model.value.row = row;
  model.value.col = col;
  model.value.cubeList = cloneDeep(cubeList);
  model.value.label = label;
}

function handleChange(target) {
  curCube.value = null;
  model.value.cubeList = [];
  capCubeRef.value.reset();
  model.value.row = target;
  model.value.col = target;
}

function handleClickCube(index) {
  curCube.value = model.value.cubeList[index];
}
</script>

<style lang="scss" scoped>
.setter {
  padding: 20px 12px 20px 12px;
  color: #7f7f7f;
}
</style>

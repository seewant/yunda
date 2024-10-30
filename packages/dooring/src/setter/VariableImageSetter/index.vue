<!--
 * @Description: 文本控件
 * @Autor: WangYuan1
 * @Date: 2022-10-18 10:45:43
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-15 14:57:28
-->
<template>
  <div>
    <SetterItem v-show="condition" :title="props?.schema?.title">
      <div class="flex flex-col">
        <el-select class="mb-15" v-model="model.type" @change="handleChange">
          <el-option label="本地数据" value="static" />
          <el-option label="数据绑定" value="variable" />
        </el-select>
        <template v-if="model.type == 'static'">
          <div class="setter" @click="handleOpen">
            <Booth
              :image="model.staticValue"
              size="14"
              class="setter-color"
            ></Booth>
            <div>图片</div>
            <!-- <div>100%</div> -->
          </div>
        </template>
        <el-cascader
          v-if="model?.type == 'variable'"
          v-model="model.variableValue"
          :options="variableOptions"
          :props="{ checkStrictly: false, emitPath: false }"
          placeholder="仅支持绑定数据"
        ></el-cascader>
      </div>
    </SetterItem>

    <ImageCenter ref="imageRef" @choose="chooseImage" />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch, computed } from "vue";
import { useVModel } from "@vueuse/core";
import { useSetterHook } from "../../hooks/useSetter";
import { useFormStore } from "@/store/form";
import Booth from "@/components/Booth/index.vue";
import SetterItem from "@/components/SetterItem/index.vue";
import ImageCenter from "@/components/ImageCenter/index";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
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

const matchWidgetList = ["FormUploadWidget"];
const imageRef = ref<any>();
const { condition } = useSetterHook(props);
const { form } = toRefs(useFormStore());

const variableOptions = computed(() => {
  return [
    {
      label: "表单数据",
      value: "from",
      children: form?.value.formDesign?.widgetList
        .filter((item) => matchWidgetList.includes(item.componentName))
        .map((item) => {
          return {
            label: item.props.label,
            value: `form.${item.id}`,
          };
        }),
    },
  ];
});

// v-model 配置
const emit = defineEmits(["update:modelValue"]);
const model = useVModel(props, "modelValue", emit);

function handleOpen() {
  console.log("imageRef.value", imageRef.value);
  imageRef.value.open();
}

function handleChange() {
  model.value.staticValue = "";
  model.value.variableValue = "";
}

function chooseImage(url) {
  model.value.staticValue = url;
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

.container {
  display: flex;
  flex-direction: column;
}
</style>

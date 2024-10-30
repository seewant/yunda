<!--
 * @Description: 文本控件
 * @Autor: WangYuan1
 * @Date: 2022-10-18 10:45:43
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-25 10:33:09
-->
<template>
  <SetterItem v-show="condition" :title="props?.schema?.title">
    <div v-if="model" class="flex flex-col">
      <el-select class="mb-15" v-model="model.type" @change="handleChange">
        <el-option label="本地数据" value="static" />
        <el-option label="数据绑定" value="variable" />
      </el-select>
      <template v-if="model.type == 'static'">
        <textarea
          v-if="schema?.setter?.props?.type == 'textarea'"
          rows="4"
          cols="50"
          v-model="model.staticValue"
        ></textarea>

        <input v-else v-model="model.staticValue" />
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
</template>

<script setup lang="ts">
import { ref, toRefs, watch, computed } from "vue";
import { useVModel } from "@vueuse/core";
import { useSetterHook } from "../../hooks/useSetter";
import { useFormStore } from "@/store/form";
import SetterItem from "@/components/SetterItem/index.vue";

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

const matchWidgetList = [
  "FormInputWidget",
  "FormRadioWidget",
  "FormTextareaWidget",
];
const { condition } = useSetterHook(props);
const { form } = toRefs(useFormStore());
// v-model 配置
const emit = defineEmits(["update:modelValue"]);
const model = useVModel(props, "modelValue", emit);

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

function handleChange() {
  model.value.staticValue = "本地数据";
  model.value.variableValue = "";
}
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

.container {
  display: flex;
  flex-direction: column;
}
</style>

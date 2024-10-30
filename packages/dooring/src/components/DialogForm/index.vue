<!--
 * @Description: 发布物料
 * @Autor: WangYuan1
 * @Date: 2022-11-15 15:18:15
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-04-09 15:51:11
-->
<template>
  <div>
    <el-dialog
      v-model="show"
      :width="props.width"
      @close="
        () => {
          resetFields && ruleFormRef?.resetFields();
        }
      "
    >
      <div class="flex">
        <div class="flex-1 p36 pl42 pr42">
          <h2 class="mb-16 text-24 font-600 c-#252525">
            {{ props.title }}
          </h2>
          <div v-show="props.description" class="mb-36 c-#cdcdcd">
            {{ props.description }}
          </div>
          <el-form
            ref="ruleFormRef"
            :model="form"
            label-width="120px"
            label-position="top"
            status-icon
          >
            <slot />
          </el-form>
          <div class="flex-center mt-30">
            <button
              class="submit-btn important-w-full"
              @click="handleSubmit(ruleFormRef)"
            >
              {{ submitText }}
            </button>
          </div>
        </div>
        <div class="w-50%">
          <img
            class="w-full h-full"
            src="https://static.mastergo.com/static/img/teamInfo-light.968aae84.jpeg"
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, inject, computed } from "vue";

let show = ref(false);
let loading = ref(false);
const ruleFormRef = ref<FormInstance>();

const props = defineProps({
  title: {
    type: String,
    default: "标题",
  },
  description: {
    type: String,
    default: "",
  },
  submitText: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "45%",
  },
  form: {
    type: Object,
    default: (): any => {},
  },
  submit: {
    type: Function,
  },
  resetFields: {
    type: Boolean,
    default: true,
  },
});

function open() {
  show.value = true;
}

function close() {
  show.value = false;
}

async function handleSubmit(formEl: FormInstance | undefined) {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      props.submit().then(() => {
        show.value = false;
      });
    } else {
      console.log("error submit!", fields);
    }
  });
}

defineExpose({ open, close });
</script>

<style lang="scss" scoped></style>

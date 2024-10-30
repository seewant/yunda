<!--
 * @Description: 图片库
 * @Autor: WangYuan1
 * @Date: 2022-11-15 15:18:15
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-04-16 17:14:40
-->
<template>
  <el-dialog
    width="60%"
    top="100px"
    v-model="show"
    :close-on-click-modal="false"
  >
    <div class="center" v-if="show">
      <div class="center-title">自定义列表</div>
      <Steps :steps="steps" :currentStep="currentStep" />
      <!-- <div>{{ model }}</div> -->
      <div class="center-content">
        <DataConfig v-if="currentStep == 0" />
        <ListDesign
          v-if="currentStep == 1"
          :itemConfig="model?.design?.itemConfig"
        />

        <ItemDesign v-if="currentStep == 2" :design="model?.design" />
      </div>

      <div class="center-operation">
        <!-- <div class="white-btn mr-10" @click="show = false">取消</div> -->
        <div
          v-if="currentStep > 0"
          class="white-btn mr-10"
          @click="currentStep--"
        >
          上一步
        </div>
        <div
          v-if="currentStep < steps.length - 1"
          class="confirm-btn"
          @click="currentStep++"
        >
          下一步
        </div>

        <div
          v-if="currentStep == steps.length - 1"
          class="confirm-btn"
          @click="handleSubmit"
        >
          确认
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import Steps from "@/components/Steps";
import DataConfig from "./DataConfig.vue";
import ListDesign from "./ListDesign";
import ItemDesign from "./ItemDesign";
import { ref, provide, watch, computed } from "vue";

let show = ref(false);
let model = ref({});
let currentStep = ref(0);
const steps = ref([
  { title: "数据", description: "选择要循环的列表数据" },
  { title: "模板", description: "选择列表项的模板样式" },
  {
    title: "搭建",
    description: "自定义搭建列表项内容，可选择动态字段渲染显示",
  },
]);
const emits = defineEmits(["submit"]);

// 打开弹窗
function open(target) {
  model.value = target;
  show.value = true;
}

// 提交
function handleSubmit() {
  emits("submit", model.value);
  show.value = false;
  currentStep.value = 0;
}

defineExpose({ open });
</script>

<style lang="scss" scoped>
::v-deep .el-tree-node.is-current > .el-tree-node__content {
  border-right: solid 2px $theme-color;
}

.center {
  padding: 20px;

  .center-title {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 20px;
    font-weight: 600;
  }

  .center-content {
    // height: 510px;
  }

  .center-operation {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>

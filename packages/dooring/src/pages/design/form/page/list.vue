<!--
 * @Description: 图片库
 * @Autor: WangYuan1
 * @Date: 2022-11-15 15:18:15
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-25 11:05:16
-->
<template>
  <div class="flex flex-col items-center">
    <Steps class="mt-40" :steps="steps" :currentStep="currentStep" />
    <!-- <div>{{ form?.listDesign?.listConfig }}</div> -->
    <el-card class="w-1500 h-600 rd-10 mt-30">
      <ListDesign
        v-if="currentStep == 0"
        :listConfig="form?.listDesign?.listConfig"
      />
      <LiseItemDesign v-if="currentStep == 1" />
    </el-card>
    <!-- <div class="center-content">
      <DataConfig v-if="currentStep == 0" />
      <ListDesign
        v-if="currentStep == 1"
        :itemConfig="model?.design?.itemConfig"
      />

      <ItemDesign v-if="currentStep == 2" :design="model?.design" />
    </div> -->

    <div class="mt-40">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import Steps from "@/components/Steps";
import ListDesign from "../components/ListDesign";
import LiseItemDesign from "../components/LiseItemDesign";
import { useFormStore } from "@/store/form";
import { ref, reactive, computed, toRefs } from "vue";

const { form } = toRefs(useFormStore());
let model = ref({});
let currentStep = ref(0);
const steps = ref([
  { title: "模板", description: "选择列表项的模板样式" },
  {
    title: "搭建",
    description: "自定义搭建列表项内容，可选择动态字段渲染显示",
  },
]);
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

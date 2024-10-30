<!--
 * @Description: 文本控件
 * @Autor: WangYuan1
 * @Date: 2022-10-18 10:45:43
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-24 16:18:19
-->
<template>
  <div class="setter">
    <div class="setter-title">{{ props?.schema?.title }}</div>
    <div class="setter-description">
      建议：请先选择图片，图片宽度750px，高度不限
    </div>
    <!-- <div class="setter-image">750*高度不限</div> -->
    <div class="setter-upload">
      <span>图片</span>
      <Booth
        v-if="modelValue.image"
        class="ml-20 cursor-pointer"
        size="60"
        :image="modelValue.image"
        @click="handleChangeImage"
      />
      <div class="setter-upload-add" v-else @click="handleChangeImage">+</div>
    </div>
    <div class="setter-button" @click="handleOpen">设计图片</div>

    <ImageCenter ref="imageRef" @choose="handleChooseImage" />
    <!-- <HotSpotDialog ref="HotSpotRef" @submit="handleSubmit" /> -->
    <CubeDesign ref="HotSpotRef" @submit="handleSubmit" />
    <!-- <div>{{ model }}</div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch, computed } from "vue";
import { cloneDeep } from "@design/utils";
import { useVModel } from "@vueuse/core";
import { ElMessage } from "element-plus";
import HotSpotDialog from "./HotSpotDialog";
import CubeDesign from "./CubeDesign";
import Booth from "@/components/Booth/index.vue";
import ImageCenter from "@/components/ImageCenter/index";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
  schema: {
    type: Object,
    default: () => {},
  },
});

// v-model 配置
const emit = defineEmits(["update:modelValue"]);
const model = useVModel(props, "modelValue", emit);
const imageRef = ref<any>();
const HotSpotRef = ref<any>();

function handleOpen() {
  if (model.value.image) {
    HotSpotRef.value.open(cloneDeep(model.value));
  } else {
    ElMessage({
      message: "请先选择图片,再编辑热区",
      type: "warning",
    });
  }
}

function handleChangeImage() {
  imageRef.value.open();
}

function handleChooseImage(url) {
  console.log("url", url);
  model.value.image = url;
  model.value.hotSpotList = [];
}

function handleSubmit(target) {
  model.value = target;
}
</script>

<style lang="scss" scoped>
.setter {
  padding: 0 15px;

  .setter-title {
    padding: 20px 0;
    font-size: 14px;
    color: #333;
  }

  .setter-description {
    margin-bottom: 15px;
    font-size: 12px;
    color: #bbb;
  }

  .setter-image {
    height: 164px;
    background: #f9f9f9;
    border-radius: 3px 3px 3px 3px;
    font-size: 12px;
    color: #bbb;
    text-align: center;
    line-height: 164px;
  }

  .setter-upload {
    display: flex;
    align-items: center;
    height: 96px;
    background: #f9f9f9;
    border-radius: 3px;
    width: 100%;
    margin-top: 20px;
    padding: 0 20px;

    .setter-upload-add {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 64px;
      margin-left: 20px;
      background: #fff;
      border-radius: 4px;
      border: 1px solid #eee;
      font-size: 40px;
      color: #d2d2d2;
      cursor: pointer;
    }
  }

  .setter-button {
    width: 100%;
    height: 36px;
    border-radius: 3px;
    opacity: 1;
    border: 1px solid #eee;
    color: #666;
    font-size: 12px;
    text-align: center;
    line-height: 36px;
    margin-top: 20px;
    cursor: pointer;
  }
}
</style>

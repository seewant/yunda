<!--
 * @Description: 文本控件
 * @Autor: WangYuan1
 * @Date: 2022-10-18 10:45:43
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-27 14:42:28
-->
<template>
  <div>
    <SetterItem v-if="model" :title="props?.schema?.title">
      <div class="w-230">
        <!-- 背景图片 -->
        <div v-if="model.image" class="mb-15">
          <div
            class="flex-center h-100 bg-#f6f7f9 border-1 border-solid border-#dcdee0"
          >
            <div
              class="background-blur w-45 h-full"
              :style="getPagePackgroundStyle(model)"
            >
              <!-- <img :src="model.image" class="w-full" /> -->
            </div>
          </div>
          <el-button class="mt-15 w-full h-40" @click="openImage">
            替换图片
          </el-button>
          <div class="flex justify-between mt-15">
            <el-select size="medium" class="w-100 h-40" v-model="model.mode">
              <el-option label="置顶" value="pinned" />
              <el-option label="填充" value="fill" />
              <el-option label="平铺" value="tiled" />
              <el-option label="拉伸" value="stretch" />
            </el-select>
            <el-button class="w-100 h-40" @click="model.image = ''">
              删除
            </el-button>
          </div>
        </div>
        <!-- 背景颜色 -->
        <div class="p-17 rd-4 border-1 border-solid border-#dcdee0">
          <div class="mb-15 c-#000">背景颜色</div>
          <el-color-picker
            v-model="model.color"
            show-alpha
            color-format="hex"
          />
        </div>
        <!-- 上传 -->
        <el-button
          v-if="!model.image"
          class="mt-15 w-full h-40"
          @click="openImage"
        >
          上传背景图片
        </el-button>
      </div>
    </SetterItem>

    <ImageCenter ref="imageRef" @choose="chooseImage" />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive, computed } from "vue";
import { useVModel } from "@vueuse/core";
import SetterItem from "@/components/SetterItem/index.vue";
import ImageCenter from "@/components/ImageCenter/index";
import { useSetterHook } from "@/hooks/useSetter";
import { getPagePackgroundStyle } from "@design/utils";

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

const imageRef = ref<any>();
// v-model 配置
const emit = defineEmits(["update:modelValue"]);
const model = useVModel(props, "modelValue", emit);

function openImage() {
  imageRef.value.open();
}

function chooseImage(url) {
  model.value.image = url;

  extractBottomColorFromImage(url);
}

function extractBottomColorFromImage(imageUrl) {
  const img = new Image();
  img.crossOrigin = "anonymous"; // 确保可以从跨域的URL加载图片
  img.src = imageUrl;

  img.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // 假设我们取图片底部10%的高度作为样本区域
    const sampleHeight = Math.floor(img.height * 0.05);
    const imageData = ctx.getImageData(
      0,
      img.height - sampleHeight,
      img.width,
      sampleHeight
    );
    const pixelCount = imageData.width * imageData.height;
    let totalR = 0;
    let totalG = 0;
    let totalB = 0;

    for (let i = 0; i < pixelCount; i++) {
      totalR += imageData.data[i * 4];
      totalG += imageData.data[i * 4 + 1];
      totalB += imageData.data[i * 4 + 2];
    }

    // 计算平均颜色
    const avgR = Math.round(totalR / pixelCount);
    const avgG = Math.round(totalG / pixelCount);
    const avgB = Math.round(totalB / pixelCount);

    model.value.color = `rgb(${avgR}, ${avgG}, ${avgB})`;
  };
}
</script>

<style lang="scss" scoped>
::v-deep .el-input {
  height: 40px !important;

  .el-input__suffix {
    display: none;
  }

  .el-input__inner {
    text-align: center;
    font-weight: 500;
    font-size: 14px;
    font-family: "";
  }
}

::v-deep .el-color-picker__trigger {
  width: 200px !important;
  height: 30px !important;
}

.background-blur {
  // background-blend-mode: overlay;

  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), #1b2d36);
}
</style>

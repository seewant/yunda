<template>
  <el-dialog
    width="80%"
    top="50px"
    v-model="show"
    :close-on-click-modal="false"
  >
    <div>
      <div
        class="text-20 p-20 font-600 border-b-solid border-b-1 border-#bebebe40"
      >
        图片设计器
      </div>

      <Design
        v-if="computed"
        :widgetList="model.hotSpotList"
        :canvasHeight="model.height"
        :canvasBackground="model.image"
      />

      <div class="flex justify-end p-20">
        <div class="white-btn mr-10" @click="handleClose">取消</div>
        <div class="confirm-btn" @click="handleSubmit">确认</div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { createId, cloneDeep } from "@design/utils";
import { ref, reactive, computed, toRefs } from "vue";
import Design from "./Design";

let show = ref(false);
let computed = ref(false);
let model = ref({});
let imageHeight = ref(100);
const emits = defineEmits(["submit"]);

// 打开弹窗
function open(target) {
  model.value = target;
  console.log("model.value", model.value);
  getImageHeight();
  model.value.width = 375;
  model.value.height = imageHeight;
  show.value = true;
}

// 获取图片高度
function getImageHeight() {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = model.value.image;
    console.log("model.value.image", model.value.image);
    img.onload = () => {
      imageHeight.value = (img.height / img.width) * 375;
      computed.value = true;
    };
    img.onerror = (error) => {
      reject(error);
    };
  });
}

function handleClose() {
  show.value = false;
  computed.value = false;
}

// 提交
function handleSubmit() {
  show.value = false;
  computed.value = false;
  emits("submit", model.value);
}

defineExpose({ open });
</script>

<style lang="scss" scoped>
::v-deep .vdr-container {
  cursor: pointer;
  border: 0;

  .vdr-handle {
    width: 10px;
    height: 10px;
    border: 0;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }

  .vdr-handle-tl {
    top: -4px;
    left: -4px;
  }

  .vdr-handle-tr {
    top: -4px;
    right: -6px;
  }

  .vdr-handle-bl {
    bottom: -6px;
    left: -4px;
  }

  .vdr-handle-br {
    right: -6px;
    bottom: -6px;
  }
}

::v-deep .active {
  // border: solid 1px #2463d0;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border: dashed 1px #2463d0;
    pointer-events: none;
  }
}
</style>

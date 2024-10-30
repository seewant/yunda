<!--
 * @Description: 图片库
 * @Autor: WangYuan1
 * @Date: 2022-11-15 15:18:15
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-10 17:16:00
-->
<template>
  <el-dialog
    width="40%"
    top="100px"
    v-model="show"
    :close-on-click-modal="false"
  >
    <div class="center">
      <div class="center-title">编辑图片热区</div>
      <div class="center-body">
        <div
          class="editor"
          :style="{
            backgroundImage: `url(${model.image})`,
            height: `${imageHeight}px`,
          }"
        >
          <Vue3DraggableResizable
            v-for="(item, index) in model.hotSpotList"
            :minW="20"
            :minH="20"
            :key="index"
            v-model:x="item.x"
            v-model:y="item.y"
            v-model:w="item.w"
            v-model:h="item.h"
            :draggable="true"
            :resizable="true"
            @resizing="handleResizing($event, item)"
          >
            <div class="editor-item">
              <img v-if="item.image" :src="item.image" class="w-full h-full" />
              <div v-else class="editor-item-empty">{{ index + 1 }}</div>
            </div>
          </Vue3DraggableResizable>
        </div>
        <div class="spot">
          <div class="spot-title">热区管理1</div>
          <div class="confirm-btn" @click="handleAdd">+新增热区</div>
          <ul class="spot-list">
            <li
              v-for="(item, index) in model.hotSpotList"
              :key="index"
              class="spot-item"
            >
              <div class="spot-item-delete" @click="handleDelete(item.id)">
                x
              </div>
              <span>热区 {{ index + 1 }}</span>
              <UploadSetter v-model="item.image" title="图片" />
            </li>
          </ul>
        </div>
      </div>
      <div>{{ model.hotSpotList }}</div>
      <div class="center-operation">
        <div class="white-btn mr-10" @click="show = false">取消</div>
        <div class="confirm-btn" @click="handleSubmit">确认</div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import Vue3DraggableResizable from "vue3-draggable-resizable";
import "vue3-draggable-resizable/dist/Vue3DraggableResizable.css";
import { ref, onMounted, watch, computed } from "vue";

let show = ref(false);
let model = ref({});
let imageHeight = ref(100);
const emits = defineEmits(["submit"]);

// 打开弹窗
function open(target) {
  model.value = target;
  console.log("model.value", model.value);
  getImageHeight();
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
    };
    img.onerror = (error) => {
      reject(error);
    };
  });
}

// 新增热区
function handleAdd() {
  if (model.value?.hotSpotList?.length >= 10) {
    return;
  }

  model.value?.hotSpotList?.push({
    w: 150,
    h: 150,
    x: 10,
    y: 10,
    image: "",
  });
}

// 删除热区
function handleDelete(id: String) {
  let i = model.value?.hotSpotList?.findIndex((item) => item.id == id);
  model.value?.hotSpotList?.splice(i, 1);
}

// 修改尺寸
function handleResizing(event, item) {
  // item.w = event.w;
  // item.h = event.h;
}

// 提交
function handleSubmit() {
  show.value = false;
  emits("submit", model.value);
}

defineExpose({ open });
</script>

<style lang="scss" scoped>
::v-deep .vdr-container {
  cursor: pointer;
}
::v-deep .active {
  border: solid 1px #2463d0;
}

::v-deep .vdr-handle {
  width: 8px;
  height: 8px;
  border: 0;
  background: #2463d0;
  border-radius: 50%;
}

.center {
  padding: 20px;

  .center-title {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 600;
  }

  .center-body {
    display: flex;

    .editor {
      position: relative;
      width: 375px;
      background-size: cover;

      .editor-item {
        width: 100%;
        height: 100%;
        .editor-item-empty {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          color: #fff;
          font-size: 12px;
          text-align: center;
          background: rgba(21, 91, 212, 0.6);
        }
      }
    }

    .spot {
      margin-left: 40px;

      .spot-title {
        font-size: 16px;
        margin-bottom: 15px;
      }

      .spot-list {
        padding: 0 10px;
        margin-top: 20px;

        .spot-item {
          position: relative;
          width: 330px;
          margin-bottom: 15px;
          padding-top: 10px;
          border-radius: 2px;
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

          span {
            padding-left: 10px;
            font-size: 12px;
            color: #7f7f7f;
          }

          .spot-item-delete {
            display: none;
            position: absolute;
            top: -7px;
            right: -7px;
            width: 16px;
            height: 16px;
            line-height: 16px;
            border-radius: 50%;
            background: #b3b3b3;
            color: #fff;
            font-size: 14px;
            text-align: center;
            z-index: 4;
            cursor: pointer;
          }

          &:hover {
            .spot-item-delete {
              display: block;
            }
          }
        }
      }
    }
  }

  .center-operation {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>

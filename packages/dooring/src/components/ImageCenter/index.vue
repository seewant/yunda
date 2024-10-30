<!--
 * @Description: 图片库
 * @Autor: WangYuan1
 * @Date: 2022-11-15 15:18:15
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-05-10 14:43:34
-->
<template>
  <el-dialog v-model="show" width="72%">
    <div class="center">
      <!-- 图片类型面板 -->
      <ul class="center-panel">
        <!-- <li class="center-panel-item" @click="changeType('my')">我的</li> -->
        <li
          v-for="item in typeList"
          :key="item.type"
          class="center-panel-item"
          :class="item.type == activeType ? 'center-panel-active' : ''"
          @click="changeType(item.type)"
        >
          <span>{{ item.label }}</span>
        </li>
      </ul>

      <!-- 图片列表 -->
      <div class="center-content">
        <div>
          <div class="center-content-header">
            <ImageUpload v-if="activeType == 'my'" @success="handleSuccess" />
          </div>
          <div class="center-content-body">
            <template v-if="activeType">
              <!-- 我的 -->
              <MyImageList v-if="activeType == 'my'" @choose="choose" />
              <!-- 照片库 -->
              <ImageList v-else :type="activeType" @choose="choose" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, toRefs, watch, computed } from "vue";
import ImageUpload from "./ImageUpload.vue";
import ImageList from "./ImageList.vue";
import MyImageList from "./MyImageList.vue";

let show = ref(false);
let activeType = ref("");
const emits = defineEmits(["choose"]);
const typeList = ref([
  { label: "我的空间", icon: "#user", type: "my" },
  { label: "唯美", icon: "#new-picture", type: "唯美" },
  { label: "萌宠", icon: "#new-picture", type: "萌宠" },
  { label: "古风", icon: "#new-picture", type: "古风" },
  { label: "可爱", icon: "#new-picture", type: "卡通" },
  { label: "二次元", icon: "#new-picture", type: "二次元" },
  { label: "插画", icon: "#new-picture", type: "插画" },
  { label: "赛博朋克", icon: "#new-picture", type: "赛博朋克" },
  { label: "短句", icon: "#new-picture", type: "短句" },
  { label: "城市", icon: "#new-picture", type: "城市" },
  { label: "旅行", icon: "#new-picture", type: "旅行" },
]);

// 打开弹窗
function open() {
  activeType.value = "";
  setTimeout(() => {
    activeType.value = "唯美";
  }, 100);
  show.value = true;
}

// 修改类型
function changeType(type: String) {
  activeType.value = "";
  setTimeout(() => {
    activeType.value = type;
  }, 100);
}

// 图片上传成功
function handleSuccess() {
  activeType.value = "";
  setTimeout(() => {
    activeType.value = "my";
  }, 100);
}

// 选择图片
function choose(url) {
  emits("choose", url);
  show.value = false;
}

defineExpose({ open });
</script>

<style lang="scss" scoped>
.center {
  display: flex;
  .center-panel {
    width: 210px;
    background: #f6f7f9;
    padding: 16px 8px;
    overflow: auto;
    user-select: none;
    padding-top: 40px;

    .center-panel-item {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      cursor: pointer;
      width: 194px;
      height: 36px;
      padding: 0 13px 0 30px;
      border-radius: 6px;

      &:hover {
        color: $theme-color !important;
        background: #fff;
      }

      svg {
        width: 20px;
        height: 20px;
      }

      span {
        font-weight: 700;
        font-size: 14px;
        margin-left: 9px;
      }
    }

    .center-panel-active {
      color: $theme-color;
      background: #fff;
    }
  }

  .center-content {
    flex: 1;

    .center-content-header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 76px;
      padding: 0 64px 0 24px;
    }

    .center-content-body {
      height: 650px;
      padding: 0 30px;
      margin-bottom: 30px;
      overflow: auto;
    }
  }
}
</style>

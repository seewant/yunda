<!--
 * @Description: 图片库
 * @Autor: WangYuan1
 * @Date: 2022-11-15 15:18:15
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-08-27 20:22:32
-->
<template>
  <el-dialog
    v-if="show"
    v-model="show"
    width="50%"
    :close-on-click-modal="false"
  >
    <div class="center">
      <ul class="center-panel">
        <li
          v-for="item in Constants?.iconfont"
          :key="item.title"
          class="center-panel-item"
          :class="active.title == item.title ? 'center-panel-active' : ''"
          @click="active = item"
        >
          <span>{{ item.title }}</span>
        </li>
      </ul>
      <div class="center-content">
        <div class="flex flex-wrap gap-20 pt-50 pb-40 ml-50 mr-50">
          <div
            v-for="(icon, index1) in active.list"
            :key="index1"
            class="w-70 h-70 flex-center rd-8 cursor-pointer hover:shadow"
            @click="hanldeChoose(icon)"
          >
            <svg class="w-30 h-30" aria-hidden="true">
              <use :xlink:href="`#${icon}`"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, provide, watch, computed } from "vue";
import Constants from "@/constants/index";

let show = ref(false);
let active = ref({
  title: "",
  list: [],
});
const emits = defineEmits(["submit"]);

active.value = Constants?.iconfont[0];

// 打开弹窗
function open(target) {
  show.value = true;
}

// 提交
function hanldeChoose(icon) {
  emits("submit", icon);
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
      align-items: center;
      height: 76px;
      padding: 0 64px 0 24px;
    }

    .center-content-body {
      height: 400px;
      padding: 0 30px;
      margin-bottom: 30px;
      overflow: auto;
    }
  }
}
</style>

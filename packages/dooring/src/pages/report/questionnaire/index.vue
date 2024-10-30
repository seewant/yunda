<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-11-07 16:43:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-08-21 17:23:54
-->
<template>
  <div class="design">
    <div class="design-header">
      <div class="flex items-center h-full">
        <el-tooltip content="返回" placement="bottom" effect="light">
          <iconpark-icon
            class="mb-2 mr-15 text-16 line-height-50 cursor-pointer"
            name="home-two"
            @click="
              router.push({
                name: 'my-questionnaire',
              })
            "
          ></iconpark-icon>
        </el-tooltip>
        <span class="ml-3px text-14 line-height-50 color-#444950">
          问卷数据看板
        </span>
      </div>
      <div class="flex items-center">
        <!-- github -->
        <div class="design-header-item">
          <!-- <iconpark-icon class="text-18" name="github-one"></iconpark-icon>
          <span class="text-14">github</span> -->
        </div>

        <!-- 版权提醒 -->
        <div class="design-header-item mr-12">
          <iconpark-icon
            class="text-18 mr-4"
            name="attention-ck62c1ci"
          ></iconpark-icon>
          <span class="text-14">版权提醒</span>
        </div>
      </div>
    </div>
    <div class="design-menu">
      <router-link
        v-for="item in menuList"
        :key="item.value"
        :to="{ name: item.value, query: { id } }"
        class="design-menu-item"
        exact-active-class="router-link-active"
      >
        <iconpark-icon :name="item.icon" class="mr-5 text-16"></iconpark-icon>
        <span class="text-14">{{ item.label }}</span>
      </router-link>
    </div>
    <!-- <div>{{ questionnaire }}</div> -->
    <div class="design-body">
      <router-view></router-view>
    </div>

    <!-- 发布产品弹窗 -->
    <DialogForm
      title="发布问卷"
      submitText="发布"
      description="你发布的作品可直接扫码观看"
      ref="formRef"
      :form="questionnaire"
      :submit="handlesSubmit"
    >
    </DialogForm>
  </div>
</template>

<script setup lang="ts">
import { http } from "@/utils/http";
import { useRoute, useRouter } from "vue-router";
import { useDesignStore } from "@/store/design";
import { useQuestionnaireStore } from "@/store/questionnaire";
import { useUserStore } from "@/store/user";
import { ref, toRefs, reactive, computed, inject } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import DialogForm from "@/components/DialogForm/index.vue";

const route = useRoute();
const router = useRouter();
const formRef = ref<any>();

const { id, type } = route.query;

// 菜单列表
const menuList = [
  { label: "数据统计", value: "report-questionnaire-overview", icon: "bill" },
  {
    label: "数据列表",
    value: "report-questionnaire-list",
    icon: "setting-one",
  },
  {
    label: "题目分析",
    value: "report-questionnaire-analyze",
    icon: "setting-one",
  },
];

function handleBack() {
  router.push({
    name: "my-questionnaire",
  });
}
</script>

<style lang="scss" scoped>
.design {
  height: 100vh;

  .design-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 54px;
    background: #fff;
    padding: 0 30px;
    border: solid 1px rgba(0, 0, 0, 0.04);
    border-top: 0;

    .design-header-item {
      display: flex;
      align-content: center;
      height: 40px;
      padding: 0 10px;
      color: #33383e;
      font-size: 14px;
      line-height: 40px;
      white-space: nowrap;
      border-radius: 4px;
      cursor: pointer;

      svg {
        width: 20px;
        height: 20px;
      }

      &:hover {
        background: #f0f3f4;
      }
    }
  }

  .design-menu {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    min-width: 980px;
    height: 42px;
    background: #fff;
    font-size: 14px;
    color: #666;
    padding: 7px 34px 7px 34px;
    border-bottom: 1px solid #eff1f4;

    .design-menu-item {
      padding: 0 10px;
      height: 28px;
      line-height: 28px !important;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 24px;
      border-radius: 4px;
      font-weight: 500;
      font-size: 15px;
      text-align: center;
      line-height: normal;
      color: #666;

      &:hover {
        background: $grey-color;

        color: #000000;
      }
    }
  }

  .design-body {
    width: 100%;
    height: calc(100vh - 96px);
  }
}

// 路由高亮
.router-link-active {
  background: $grey-color;
  color: #000000;
}
</style>

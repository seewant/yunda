<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-11-07 16:43:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-26 10:34:54
-->
<template>
  <div class="design">
    <div class="design-header">
      <div class="flex items-center h-full">
        <span class="ml-3 text-15px line-height-50 font-600 color-#444950">
          <span class="mr-4 c-#999999">正在设计:</span>
          {{ curWechatPage.name }}
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

        <!-- 发布 -->
        <el-button
          class="w-90px"
          style="box-shadow: 0 6px 8px 0 rgb(34, 84, 244, 0.16)"
          type="primary"
          color="#2254f4"
          @click="handleOpen"
        >
          保存页面
        </el-button>
      </div>
    </div>
    <!-- 发布页面弹窗 -->
    <DialogForm
      title="发布页面"
      submitText="发布页面"
      description="你发布的作品可直接扫码观看"
      ref="formRef"
      :form="curWechatPage"
      :resetFields="false"
      :submit="handlesSubmit"
    >
      <el-form-item
        label="页面标题"
        prop="name"
        :rules="{
          required: true,
          message: '请输入页面标题',
        }"
      >
        <input v-model="curWechatPage.name" placeholder="请输入页面标题" />
      </el-form-item>

      <el-form-item class="mb-120" label="页面描述" prop="description">
        <input
          v-model="curWechatPage.description"
          placeholder="请输入页面描述"
        />
      </el-form-item>
    </DialogForm>
    <div class="design-body">
      <!-- <div>{{ curWechatPage }}</div> -->
      <DesignProductWork
        type="wechat"
        :isPage="true"
        style="height: calc(100vh - 54px)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useWechatStore } from "@/store/wechat";
import { useDesignStore } from "@/store/design";
import dayjs from "dayjs";
import DesignProductWork from "@/components/DesignProductWork";
import DialogForm from "@/components/DialogForm/index.vue";

const route = useRoute();
const router = useRouter();
const formRef = ref<any>();
const { wechat, curWechatPage } = toRefs(useWechatStore());
const { saveWechatPage } = useWechatStore();
const { initDesign } = useDesignStore();

initDesign(curWechatPage?.value);

// 菜单列表
const menuList = [
  { label: "页面搭建", value: "design-wechat-decorate-build", icon: "bill" },
];

function handleOpen() {
  formRef.value.open();
}

function handlesSubmit() {
  curWechatPage.value.updateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  // saveWechatPage();
  router.push({ name: "design-wechat-index" });
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
    background: #f7f8fa;
  }
}

// 路由高亮
.router-link-active {
  background: $grey-color;
  color: #000000 !important;
}
</style>

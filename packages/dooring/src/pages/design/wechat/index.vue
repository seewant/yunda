<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-11-07 16:43:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-18 15:04:09
-->
<template>
  <div class="design">
    <div class="flex">
      <div class="sidebar">
        <div class="flex-center h-72">
          <img class="w-40 h-40" src="../../../assets/logo.png" />
        </div>
        <router-link
          v-for="item in menuList"
          :key="item.value"
          :to="{ name: item.value }"
          class="sidebar-item"
          exact-active-class="router-link-active"
        >
          <span class="text-14">{{ item.label }}</span>
        </router-link>
      </div>
      <div class="design-body">
        <Header />

        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { http } from "@/utils/http";
import { useRoute, useRouter } from "vue-router";
import { useWechatStore } from "@/store/wechat";
import { ref, toRefs, reactive, computed, inject } from "vue";
import { useUserStore } from "@/store/user";
import Header from "./components/Header.vue";

const route = useRoute();
const router = useRouter();
const formRef = ref<any>();
const { userInfo } = toRefs(useUserStore());
const { initWechat } = useWechatStore();
const { curWechatPage } = toRefs(useWechatStore());

// 菜单列表
const menuList = [
  { label: "导览", value: "design-wechat-index" },
  { label: "页面管理", value: "design-wechat-page" },
  { label: "导航设置", value: "design-wechat-navigation" },
  { label: "个人中心", value: "design-wechat-personCenter" },
  { label: "起始页", value: "design-wechat-advertising" },
];
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

  .sidebar {
    width: 160px;
    padding: 10px;

    .sidebar-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 42px;
      width: 100%;
      height: 48px;
      border-radius: 8px;
      color: #333;
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 0;
      margin-top: 8px;

      &:hover {
        background: $grey-color;
      }
    }
  }

  .design-body {
    flex: 1;
    height: 100vh;
    background: #f7f8fa;
  }
}

// 路由高亮
.router-link-active {
  background: $grey-color;
  color: #000000 !important;
}
</style>

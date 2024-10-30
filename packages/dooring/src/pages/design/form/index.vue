<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-11-07 16:43:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-05 15:07:10
-->
<template>
  <div class="design">
    <Header />

    <div class="design-menu">
      <router-link
        v-for="item in menuList"
        :key="item.value"
        :to="{ name: item.value }"
        class="design-menu-item"
        exact-active-class="router-link-active"
      >
        <iconpark-icon :name="item.icon" class="mr-5 text-16"></iconpark-icon>
        <span class="text-14">{{ item.label }}</span>
      </router-link>
    </div>
    <!-- <div>{{ wechat }}</div> -->
    <!-- <div>{{ curWechatPage }}</div> -->
    <div class="design-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useWechatStore } from "@/store/wechat";
import Header from "./components/Header.vue";

const route = useRoute();
const router = useRouter();
const { wechat, curWechatPage } = toRefs(useWechatStore());
const { saveWechatPage } = useWechatStore();

// 菜单列表
const menuList = [
  { label: "表单设计", value: "design-form-build", icon: "bill" },
  { label: "列表设计", value: "design-form-list", icon: "bill" },
  { label: "详情页设计", value: "design-form-detail", icon: "bill" },
];

function handleSavePage() {
  saveWechatPage();
  router.push({ name: "design-wechat-page" });
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

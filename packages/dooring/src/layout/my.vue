<!--
 * @Description: 侧边栏布局
 * @Autor: WangYuan1
 * @Date: 2023-01-04 19:46:57
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-22 20:12:41
-->
<template>
  <div class="my-layout">
    <div class="sidebar">
      <div class="add" @click="router.push({ name: 'my-create' })">
        + 创建项目
      </div>
      <div v-for="(m, i) in meauList" :key="i">
        <router-link
          v-for="item in m"
          :key="item.value"
          :to="{ name: item.value }"
          class="sidebar-item"
        >
          <svg class="iconpark-icon w-14px h-14px mr-10px">
            <use :href="item.icon"></use>
          </svg>
          <span>{{ item.label }}</span>
        </router-link>
        <div v-show="i != meauList.length - 1" class="sidebar-hr"></div>
      </div>
    </div>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

// 菜单列表
const meauList = [
  [
    { label: "我的小程序", value: "my-wechat", icon: "#home-two" },
    { label: "我的问卷", value: "my-questionnaire", icon: "#home-two" },
    { label: "我的图文", value: "my-article", icon: "#pic" },
    // { label: "我的H5", value: "my-h5", icon: "#block-two" },
    // { label: "图片设计器", value: "my-image", icon: "#block-two" },
    { label: "我的表单", value: "my-form", icon: "#pic" },
  ],
  [],
];
</script>

<style lang="scss" scoped>
// 路由高亮
.router-link-active {
  background: $grey-color;
}
.my-layout {
  display: flex;
  height: calc(100vh - 56px);

  .sidebar {
    width: 220px;
    padding: 20px 24px;

    .sidebar-hr {
      margin-top: 10px;
      margin-bottom: 10px;
      height: 1px;
      background: #f0f0f0;
    }

    .sidebar-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
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

    .add {
      width: 100%;
      height: 48px;
      line-height: 48px;
      text-align: center;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 20px;
      background: #2672ff;
      color: #fff;
      text-align: center;
      cursor: pointer;

      &:hover {
        background: #377dff;
      }
    }
  }

  .content {
    flex: 1;
    overflow: auto;
    background: #f7f8fa;
  }
}
</style>

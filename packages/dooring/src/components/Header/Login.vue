<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2023-01-03 17:15:23
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-22 19:14:44
-->
<template>
  <div class="my">
    <!-- 登录 -->
    <div v-if="!isLogin" class="my-login" @click="openLogin()">注册登录</div>

    <!-- 个人信息 -->
    <div v-else class="flex-center c-theme cursor-pointer">
      <el-popover
        placement="bottom-start"
        :width="260"
        :offset="5"
        :show-arrow="false"
        trigger="hover"
      >
        <!-- 头像 -->
        <template #reference>
          <img
            :src="userInfo.avatar"
            class="w-40 h-40 mr-10 box-border p-5 rd-50% bg-#ffffff shadow-lg cursor-pointer"
          />
        </template>

        <!-- 操作列表 -->
        <div class="operation">
          <div class="flex mb-15">
            <img
              :src="userInfo.avatar"
              class="w-40 h-40 mr-10 box-border p-5 rd-50% bg-#ffffff shadow-lg cursor-pointer"
            />
            <div>
              <div class="mb6 text-15 c-#000">{{ userInfo.userName }}</div>
              <div class="text-12">用户ID：{{ userInfo.id.slice(0, 8) }}</div>
            </div>
          </div>

          <div class="relative bg-#99A3B8 p-14 rd-10">
            <span class="text-18 font-700 c-#fff">开源版</span>
            <img
              class="absolute w-120 h-100 right--20 bottom--40"
              src="https://cdn.dancf.com/fe-assets/img/902ec11fea628015d8f569b8371c4f52.png"
            />
          </div>
          <ul class="operation-list">
            <li
              class="operation-list-item"
              @click="router.push({ name: 'home' })"
            >
              <span>前往官网</span>
            </li>
            <li
              class="operation-list-item"
              @click="router.push({ name: 'my' })"
            >
              <span>工作台</span>
            </li>
            <li
              class="operation-list-item"
              @click="router.push({ name: 'my-widget' })"
            >
              <span>我的物料</span>
            </li>

            <li class="operation-list-item" @click="logoutHandle">
              <span>退出登录</span>
            </li>
          </ul>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/user";
import { useRoute, useRouter } from "vue-router";
import { ref, toRefs, reactive, computed } from "vue";
import { useLogin } from "@/components/Login/useLogin";

const router = useRouter();
const { openLogin } = useLogin();
const { logout } = useUserStore();
const { isLogin, userInfo } = toRefs(useUserStore());

function logoutHandle() {
  logout();
  router.push({ name: "home" });
}
</script>

<style lang="scss" scoped>
.my {
  .my-login {
    width: 80px;
    height: 36px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: rgb(30, 111, 255);
    border: 1px solid #fff;
    border-radius: 8px;
    flex-shrink: 0;
    font-size: 14px;
    user-select: none;
    cursor: pointer;
  }
}

.operation {
  .operation-info {
    display: flex;
    align-items: center;
    padding: 6px 12px 12px 12px;
    border-bottom: 1px solid #f0f0f0;
  }

  .operation-list {
    padding-top: 10px;
    color: #000;
    .operation-list-item {
      display: flex;
      align-items: center;
      margin: 3px 0;
      padding: 6px 10px;
      border-radius: 6px;
      line-height: 24px;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        color: #fff;
        background: $theme-color;
      }

      svg {
        width: 14px;
        height: 14px;
        margin-right: 8px;
      }
    }
  }
}
</style>

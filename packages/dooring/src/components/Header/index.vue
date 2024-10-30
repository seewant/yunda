<template>
  <div ref="headerRef" class="header" :class="{ placeholder: !isHome }">
    <div class="header-content" :class="{ scrolled: isScrolled }">
      <div class="logo-wrap"></div>
      <span class="divide-line" style="display: none"></span>
      <div class="nav-list">
        <router-link
          v-for="item in menuList"
          :key="item.value"
          :to="{ name: item.value, query: { id } }"
          class="nav-list-item"
          active-class="router-link-active"
        >
          <span class="text-14">{{ item.label }}</span>
        </router-link>
      </div>

      <div class="work" @click="router.push({ name: 'my' })">我的工作台</div>

      <Login />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Login from "./Login.vue";

const route = useRoute();
const router = useRouter();
const headerRef = ref(null);
const isScrolled = ref(false);

const currentPath = computed(() => route.path);
const isHome = computed(() => currentPath.value === "/dooring/home");

// 菜单列表
const menuList = [
  { label: "首页", value: "home" },
  {
    label: "资源社区",
    value: "resource",
  },
];

const handleScroll = () => {
  if (window.scrollY > 0) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
.scrolled {
  background: #ffffff !important;
  box-shadow: 0 30px 60px -10px rgba(48, 62, 83, 0.24);
}

.placeholder {
  height: 56px;
  border-bottom: solid 1px #ebeef5;
}

.router-link-active {
  font-weight: 600;
  background: #f5f7fd;
}

.header {
  .header-content {
    position: fixed;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    width: 100%;
    padding: 6px 46px 6px 44px;
    box-sizing: border-box;
    margin: 0 auto;
    background: transparent;
    transition: background-color 0.6s ease;
  }

  .logo-wrap {
    display: inline-block;
    width: 40px;
    height: 40px;
    background: url(../../assets/logo.png) 0px 0px / contain no-repeat;
  }

  .nav-list {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: auto;
    height: 100%;
    position: relative;
    margin: 0 auto 0 0;
    flex-shrink: 0;
    margin-left: 65px;

    .nav-list-item {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      padding: 12px 18px;
      margin-right: 30px;
      border-radius: 8px;
      position: relative;
      cursor: pointer;

      &:hover {
        font-weight: 600;
        background: #f5f7fd;
      }

      .client-dropdown {
        position: absolute;
        top: 35px;
        left: -116px;
        width: 190px;
        height: 278px;
        margin-top: 13px;
        background-image: url(https://www.chuangkit.com/img/download-app-bg.96692bc7.svg);
        background-size: contain;
        background-repeat: no-repeat;
        border-radius: 8px;
        transition: margin 0.15s, opacity 0.15s;
        box-shadow: 0 6px 24px 4px rgba(27, 35, 55, 0.08);
        visibility: hidden;
      }
    }
  }

  .work {
    height: 36px;
    padding: 0 10px;
    margin-right: 40px;
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
</style>

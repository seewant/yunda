<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-11-02 19:29:23
 * @LastEditors: WangYuan
 * @LastEditTime: 2023-01-10 10:29:13
-->
<template>
  <div class="product">
    <!-- banner -->
    <div class="product-banner">
      <div class="content">
        <div class="w-580px">
          <h1 class="mb-25 text-20px font-800">更专业智能的界面设计</h1>
          <p class="text-24px leading-40px">
            专业矢量编辑，智能辅助工具，实时在线交付，创作从未如此得心应手
          </p>
          <div class="content-btn" @click="goDesign">
            <span>免费使用</span>
            <svg class="iconpark-icon"><use href="#arrow-right"></use></svg>
          </div>
        </div>
        <img
          class="w-490px h-490px"
          src="https://mastergo.com/images/design-interface-banner-pic.svg"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useRoute, useRouter } from "vue-router";

const router = useRouter();

// 打开新窗口跳转页面设计器
function goDesign() {
  router.push({ name: "product-design" });
}
</script>
<style lang="scss" scoped>
.product {
  .product-banner {
    padding: 43px 120px;
    background: $theme-color;

    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 1200px;
      color: #fff;
      margin: 0 auto;

      .content-btn {
        position: relative;
        margin: 40px 0 0;
        width: 184px;
        height: 60px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 30px;
        border-radius: 8px;
        background: #ffffff;
        font-size: 24px;
        font-weight: 500;
        color: #000 !important;
        box-shadow: 0 10px 30px #0003;
        cursor: pointer;
        z-index: 1;

        svg {
          position: absolute;
          top: 50%;
          left: 120px;
          transform: translateY(-50%);
          width: 23px;
          height: 23px;
          margin: 0 0 0 10px;
          animation: move 2s infinite;
          animation-timing-function: ease-in-out;
        }

        @keyframes move {
          0% {
            left: 120px;
          }

          20% {
            left: 128px;
          }

          40% {
            left: 120px;
          }

          60% {
            left: 128px;
          }

          80% {
            left: 120px;
          }
        }
      }
    }
  }
}
</style>
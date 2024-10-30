<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-03-15 15:22:25
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-19 10:00:58
-->
<template>
  <div class="my">
    <div class="my-head">
      <img
        class="my-head-bg"
        :src="previewProduct?.configure?.personalCenter?.backgroundImage"
      />
      <div class="my-head-bottom">
        <image
          class="my-head-avatar"
          src="https://img.js.design/assets/compImg/u-9lB0e643014aa8d1bca2b87a6e8d2ffb8cec.png"
        ></image>
        <div class="my-head-info">
          <div class="my-head-info-name">雨尽阑珊</div>
          <div class="my-head-info-welcome">这家伙很神秘，什么都没留下~</div>
        </div>
      </div>
    </div>

    <div class="my-content">
      <div class="navigation">
        <div
          class="navigation-item"
          v-for="(item, index) in previewProduct?.configure?.personalCenter
            ?.menuList"
          :key="index"
        >
          <u-icon name="home" size="28" color="#6cb76e"></u-icon>
          <span>{{ item.name }}</span>
        </div>
      </div>
      <img
        mode="aspectFill"
        class="my-content-banner"
        :src="previewProduct?.configure?.personalCenter?.advertisingImage"
      />
    </div>
    <div class="operation">
      <div class="operation-item">
        <div class="operation-item-name">
          <u-icon name="info-circle" size="16"></u-icon>
          <span>关于我们</span>
        </div>
        <u-icon name="arrow-right" size="14" color="#c0c4cb"></u-icon>
      </div>
      <div class="operation-item">
        <div class="operation-item-name">
          <u-icon name="setting" size="16"></u-icon>
          <span>设置</span>
        </div>
        <u-icon name="arrow-right" size="14" color="#c0c4cb"></u-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, ref, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDesignHook } from "@/hooks/useDesign";

const route = useRoute();
const { previewProduct } = toRefs(useDesignHook());
console.log("previewProduct", previewProduct.value);
</script>

<style lang="scss" scoped>
.my {
  height: 100vh;
  background: #fff;

  .my-head {
    position: relative;
    height: 460rpx;
    overflow: hidden;

    .my-head-bg {
      width: 100%;
    }

    .my-head-bottom {
      position: absolute;
      left: 50rpx;
      bottom: 60rpx;
      display: flex;

      .my-head-avatar {
        width: 150rpx;
        height: 150rpx;
        margin-right: 30rpx;
        border-radius: 50%;
      }
      .my-head-info {
        flex: 1;
        padding-top: 26rpx;

        .my-head-info-name {
          margin-bottom: 22rpx;
          font-size: 48rpx;
          line-height: 48rpx;
          font-weight: 700;
          letter-spacing: 0px;
          color: rgba(0, 0, 0, 1);
          text-align: justify;
          vertical-align: top;
        }

        .my-head-info-welcome {
          font-size: 28rpx;
          font-weight: 400;
          letter-spacing: 0px;
          color: rgba(0, 0, 0, 0.7);
          text-align: justify;
          vertical-align: top;
        }
      }
    }
  }

  .my-content {
    position: relative;
    padding: 60rpx 30rpx 20rpx 30rpx;
    margin-top: -40rpx;
    background: #fff;
    border-top-left-radius: 40rpx;
    border-top-right-radius: 40rpx;

    .navigation {
      display: flex;
      flex-wrap: wrap;
      padding: 20rpx 0;
      margin-bottom: 20rpx;
      border-radius: 5px;
      background: #fff;

      .navigation-item {
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20rpx;
        color: #6cb76e;

        span {
          margin-top: 10rpx;
          font-size: 24rpx;
        }
      }
    }

    .my-content-banner {
      width: 100%;
      height: 200rpx;
      border-radius: 20rpx;
    }
  }

  .operation {
    padding: 10rpx 30rpx;

    .operation-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx 0;
      background: #fff;

      .operation-item-name {
        display: flex;
        align-items: center;
        font-size: 28rpx;

        span {
          margin-left: 14rpx;
        }
      }
    }
  }
}
</style>

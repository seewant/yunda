<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-03-15 15:22:25
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-28 16:28:59
-->
<template>
  <div class="advertising">
    <img
      class="advertising-image"
      :src="previewProduct?.configure?.advertising.image"
      mode="heightFix"
    />
    <div class="advertising-skip">
      跳过{{ previewProduct?.configure?.advertising.time }}S
    </div>
    <div class="advertising-text">
      <!-- <div class="title">Advanture is a must</div>
      <div class="description">
        An adventure is an exciting experience that is typically bold, sometimes
        risky or undertaking. Adventures may be activities with some potential
        for physical danger...
      </div> -->
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
.advertising {
  position: relative;
  height: 100vh;

  .advertising-image {
    width: 100vw;
    height: 100vh;
  }

  .advertising-skip {
    position: absolute;
    top: 140rpx;
    right: 40rpx;
    background: #d4d4d450;
    color: #fff;
    border-radius: 40rpx;
    padding: 8rpx 20rpx;
    font-size: 24rpx;
    letter-spacing: 2rpx;
    cursor: pointer;
  }

  .advertising-text {
    position: absolute;
    bottom: 200rpx;
    left: 40rpx;
    width: 680rpx;
    color: #fff;

    .title {
      font-size: 50rpx;
      margin-bottom: 10rpx;
    }

    .description {
      font-size: 28rpx;
      line-height: 50rpx;
    }
  }
}
</style>

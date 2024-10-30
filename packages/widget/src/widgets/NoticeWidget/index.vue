<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-10-08 16:43:21
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-12 14:58:53
-->
<template>
  <div
    class="notice"
    :style="{
      padding: `${upperLowerMargin * 2}rpx ${pageMargin * 2}rpx`,
    }"
  >
    <u-notice-bar
      :fontSize="'28rpx'"
      :text="text"
      :mode="props.mode"
      :color="props.textColor"
      :bgColor="props.cardBg"
      :style="{
        borderRadius: `${cardRadius == 'round' ? 16 : 0}rpx`,
        boxShadow: cardShadow ? '0px 0px 40rpx 0 rgba(12, 31, 80, 0.14)' : '',
      }"
    ></u-notice-bar>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps({
  text: { type: String, default: "通知文本" },
  mode: { type: String, default: "baseMode" },
  textColor: { type: String, default: "" },
  cardBg: { type: String, default: "" },
  cardRadius: { type: String, default: "" },
  upperLowerMargin: { type: String, default: "" },
  pageMargin: { type: String, default: "" },
  cardShadow: { type: Boolean, default: true },
});
</script>

<style lang="scss" scoped>
::v-deep .u-notice-bar {
  padding: 26rpx 24rpx !important;

  .u-icon__icon {
    font-size: 38rpx !important;
    line-height: 38rpx !important;
  }

  span {
    white-space: nowrap !important;
  }
}

.notice {
  padding: 12rpx 32rpx;
}
</style>

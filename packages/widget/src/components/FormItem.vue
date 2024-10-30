<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-03-29 10:34:56
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-05-31 17:27:56
-->
<template>
  <div class="item">
    <div class="item-label">
      <span v-show="required" class="item-label-check">*</span>
      <span>{{ props.label }}</span>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: { type: String, default: "" },
  required: { type: Boolean, default: false },
});
</script>

<style lang="scss" scoped>
.item {
  padding: 20rpx 48rpx 40rpx 48rpx;
  margin: 0 auto;

  .item-label {
    position: relative;
    font-size: 32rpx;
    color: #333;
    font-weight: 500;
    margin-bottom: 26rpx;
    border-radius: 12rpx;

    .item-label-check {
      position: absolute;
      left: -4rpx;
      top: 4rpx;
      width: 14rpx;
      height: 36rpx;
      float: left;
      font-size: 28rpx;
      font-weight: 500;
      transform: translateX(-100%);
      color: #ff6d56;
    }
  }
}
</style>

<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-10-26 20:35:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-04-02 19:18:18
-->
<template>
  <div class="mask flex-center" @click.stop="intercept">
    <div class="loading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
function intercept() {}
</script>

<style lang="scss" scoped>
.mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
}

.loading {
}

.loading > div {
  position: relative;
  box-sizing: border-box;
}

.loading {
  display: block;
  font-size: 0;
  color: $theme-color;
}

.loading.la-dark {
  color: $theme-color;
}

.loading > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
}

.loading {
  width: 40px;
  height: 32px;
}

.loading > div {
  width: 4px;
  height: 32px;
  margin: 2px;
  margin-top: 0;
  margin-bottom: 0;
  border-radius: 0;
  animation-name: line-scale-party;
  animation-iteration-count: infinite;
}

.loading > div:nth-child(1) {
  animation-duration: 0.43s;
  animation-delay: -0.23s;
}

.loading > div:nth-child(2) {
  animation-duration: 0.62s;
  animation-delay: -0.32s;
}

.loading > div:nth-child(3) {
  animation-duration: 0.43s;
  animation-delay: -0.44s;
}

.loading > div:nth-child(4) {
  animation-duration: 0.8s;
  animation-delay: -0.31s;
}

.loading > div:nth-child(5) {
  animation-duration: 0.74s;
  animation-delay: -0.24s;
}

.loading.la-sm {
  width: 20px;
  height: 16px;
}

.loading.la-sm > div {
  width: 2px;
  height: 16px;
  margin: 1px;
  margin-top: 0;
  margin-bottom: 0;
}

.loading.la-2x {
  width: 80px;
  height: 64px;
}

.loading.la-2x > div {
  width: 8px;
  height: 64px;
  margin: 4px;
  margin-top: 0;
  margin-bottom: 0;
}

.loading.la-3x {
  width: 120px;
  height: 96px;
}

.loading.la-3x > div {
  width: 12px;
  height: 96px;
  margin: 6px;
  margin-top: 0;
  margin-bottom: 0;
}

@keyframes line-scale-party {
  0% {
    transform: scaleY(1);
  }

  50% {
    transform: scaleY(0.3);
  }

  100% {
    transform: scaleY(1);
  }
}
</style>

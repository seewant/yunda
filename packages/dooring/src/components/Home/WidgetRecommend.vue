<!--
 * @Description: 推荐
 * @Autor: WangYuan1
 * @Date: 2023-01-30 15:47:40
 * @LastEditors: WangYuan
 * @LastEditTime: 2023-01-30 15:55:16
-->
<template>
  <div class="resource">
    <div class="resource-container">
      <h2 class="mb-36px text-36px font-900">资源社区</h2>
      <p class="mb-42px text-20px">
        即刻获取常用设计资源，设计快人一步 精选物料
      </p>
      <div class="mb-30px text-24px font-700">精选物料</div>
      <div class="mb-30px text-24px font-700">精选产品</div>

      <div class="resource-container-btn">
        <img
          class="w-32px h-32px"
          src="http://110.41.150.71:8090/img/1674045818012.png"
        />
        <span>进入资源社区</span>
        <span class="text-20px font-600">→</span>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
</script>

<style lang="scss" scoped>
.resource {
  padding-top: 80px;
  background: #000;
  color: #fff;

  .resource-container {
    max-width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .resource-container-btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 258px;
      height: 64px;
      margin: 20px auto 50px;
      padding: 0 32px;
      background: #ffffff;
      border-radius: 8px;
      font-size: 20px;
      color: $theme-color;
      cursor: pointer;
    }
  }
}
</style>

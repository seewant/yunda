<template>
  <div class="scene">
    <div class="scene-header">
      <div class="scene-header-back" @click="router.push({ name: 'my' })">
        <iconpark-icon class="text-22" name="arrow-left"></iconpark-icon>
      </div>
      <span class="c-theme text-16">选择类型</span>
      <iconpark-icon class="ml-14 mr-14" name="right"></iconpark-icon>
      <span class="text-16">选择创建方式</span>
    </div>
    <div class="scene-content">
      <div class="scene-content-item" @click="handleCreateTemplate('wechat')">
        <img
          class="w-44 h-44 mr-10"
          src="https://static.wenjuan.pub/survey1639644702367.svg"
        />
        <div>
          <div class="text-left text-22 mb-5">小程序</div>
          <div class="text-14 c-#666">产品调查 · 市场调研 · 学生调查</div>
        </div>
      </div>
      <!-- <div class="scene-content-item" @click="handleCreateTemplate('h5')">
        <img
          class="w-44 h-44 mr-10"
          src="https://static.wenjuan.pub/survey1639644702367.svg"
        />
        <div>
          <div class="text-left text-22 mb-5">H5</div>
          <div class="text-14 c-#666">产品调查 · 市场调研 · 学生调查</div>
        </div>
      </div> -->
      <div
        class="scene-content-item"
        @click="handleCreateTemplate('questionnaire')"
      >
        <img
          class="w-44 h-44 mr-10"
          src="https://static.wenjuan.pub/survey1639644702367.svg"
        />
        <div>
          <div class="text-left text-22 mb-5">问卷调查</div>
          <div class="text-14 c-#666">产品调查 · 市场调研 · 学生调查</div>
        </div>
      </div>
      <div
        class="scene-content-item"
        @click="handleCreateTemplate('article')"
      >
        <img
          class="w-44 h-44 mr-10"
          src="https://static.wenjuan.pub/survey1639644702367.svg"
        />
        <div>
          <div class="text-left text-22 mb-5">图文文章</div>
          <div class="text-14 c-#666">产品调查 · 市场调研 · 学生调查</div>
        </div>
      </div>
      <div
        class="scene-content-item"
        @click="handleCreateTemplate('form')"
      >
        <img
          class="w-44 h-44 mr-10"
          src="https://static.wenjuan.pub/survey1639644702367.svg"
        />
        <div>
          <div class="text-left text-22 mb-5">自定义表单</div>
          <div class="text-14 c-#666">产品调查 · 市场调研 · 学生调查</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function handleCreateTemplate(type) {
  router.push({
    name: "create-create-template",
    query: {
      type,
    },
  });
}
</script>

<style lang="scss" scoped>
.scene {
  .scene-header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: sticky;
    height: 60px;
    background: #fff;
    border-bottom: 1px solid #eff1f4;
    min-width: 1190px;
    width: 100%;
    z-index: 999;
    top: 0;

    .scene-header-back {
      position: absolute;
      left: 34px;
      top: 18px;
      cursor: pointer;
    }
  }
  .scene-content {
    width: 820px;
    margin: 150px auto 50px auto;

    .scene-content-item {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 378px;
      height: 162px;
      background: #fff;
      margin: 12px;
      border: 1px solid #eff1f4;
      border-radius: 4px;
      text-align: center;
      cursor: pointer;

      &:hover {
        box-shadow: 0 0 10px 0 rgba(78, 89, 105, 0.1);
      }
    }
  }
}
</style>

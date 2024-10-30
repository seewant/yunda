<template>
  <div class="template">
    <div class="template-header">
      <div
        class="template-header-back"
        @click="router.push({ name: 'create-scene' })"
      >
        <iconpark-icon class="text-22" name="arrow-left"></iconpark-icon>
      </div>
      <span class="text-16">选择类型</span>
      <iconpark-icon class="ml-14 mr-14" name="right"></iconpark-icon>
      <span class="text-16 c-theme">选择创建方式</span>
    </div>

    <div class="template-content">
      <div class="template-content-add" @click="handleCreate()">
        <iconpark-icon class="icon" name="plus"></iconpark-icon>
        <div class="mt-20 text-20">空白创建</div>
        <div v-if="type == 'questionnaire'" class="mt-10 color-#707070">
          直接从0搭建问卷
        </div>
        <div v-if="type == 'wechat'" class="mt-10 color-#707070">
          直接从0搭建小程序
        </div>
      </div>
    </div>
    {{ type }}
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useWechatStore } from "@/store/wechat";
import { useQuestionnaireStore } from "@/store/questionnaire";
import { useArticleStore } from "@/store/article";

const route = useRoute();
const router = useRouter();
const { initWechat } = useWechatStore();
const { initQuestionnaire } = useQuestionnaireStore();
const { initArticle } = useArticleStore();
const { type } = route.query;

async function handleCreate() {
  if (type == "wechat") {
    initWechat();
  }

  if (type == "questionnaire") {
    initQuestionnaire();
  }

  if (type == "article") {
    initArticle();
  }

  router.push({
    name: `design-${type}`,
  });
}
</script>

<style lang="scss" scoped>
.template {
  .template-header {
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

    .template-header-back {
      position: absolute;
      left: 34px;
      top: 18px;
      cursor: pointer;
    }
  }

  .template-content {
    width: 1200px;
    margin: 50px auto 50px auto;

    .template-content-add {
      display: flex;
      align-items: center;
      border-radius: 8px;
      background: rgb(255, 255, 255);
      border: 1px solid rgb(239, 241, 244);
      cursor: pointer;
      width: 202px;
      height: 240px;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      &:hover {
        box-shadow: rgba(78, 89, 105, 0.1) 0px 0px 10px 0px;
      }

      .icon {
        width: 44px;
        height: 44px;
        color: $theme-color;
        font-size: 28px;
        border-radius: 8px;
        box-shadow: rgba(38, 114, 255, 0.3) 0px 0px 6px 0px;
      }
    }
  }
}
</style>

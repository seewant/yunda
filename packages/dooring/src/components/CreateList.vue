<template>
  <div class="flex gap-30">
    <div
      v-for="(item, index) in list"
      :key="index"
      @click="handleCreate(item.type)"
    >
      <div
        class="item relative w-300 h-240 bg-#f5f7fd rd-24 overflow-hidden cursor-pointer shadow"
      >
        <div class="relative w-full h-170 overflow-hidden">
          <div class="item-mask flex-center">
            <div class="flex-center w-140 h-60 rd-40 text-14 bg-#ffffff">
              立即体验
            </div>
          </div>

          <img class="item-cover" :src="item.cover" />
        </div>
        <div class="flex p14 pl20 pr20">
          <img class="w-32 h-32 rd-10 shadow-opacity-80" :src="item.icon" />
          <div class="ml16">
            <div class="text-14 lh-24 font-600">{{ item.title }}</div>
            <div class="text-12 c-#8693ab lh-20">{{ item.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, defineProps, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useWechatStore } from "@/store/wechat";
import { useQuestionnaireStore } from "@/store/questionnaire";
import { useArticleStore } from "@/store/article";
import { useFormStore } from "@/store/form";
import wechatImage from "@/assets/create/wechat.png";
import articleImage from "@/assets/create/article.png";
import FormImage from "@/assets/create/form.png";
import QuestionnaireImage from "@/assets/create/questionnaire.png";

const router = useRouter();
const { initWechat } = useWechatStore();
const { initQuestionnaire } = useQuestionnaireStore();
const { initArticle } = useArticleStore();
const { initForm } = useFormStore();

const list = ref([
  {
    title: "小程序",
    description: "设计搭建小程序",
    type: "wechat",
    icon: "https://aigc-pub-prod-oss.chuangkit.com/aigc_module_image/6a91a7a530c5561e9de560f2f198cc30.png",
    cover: wechatImage,
  },
  {
    title: "问卷",
    description: "调查问卷搭建",
    type: "questionnaire",
    icon: "https://aigc-pub-prod-oss.chuangkit.com/aigc_module_image/427fd3cfc35f6ca6eb42fd17a13ddce2.png",
    cover: QuestionnaireImage,
  },
  {
    title: "图文",
    description: "简单方便的图文文章",
    type: "article",
    icon: "https://aigc-pub-prod-oss.chuangkit.com/aigc_module_image/46f18191d54fb10d9d1a827b687c0ad0.png",
    cover: articleImage,
  },
  {
    title: "表单",
    description: "自定义表单",
    type: "form",
    icon: "https://aigc-pub-prod-oss.chuangkit.com/aigc_module_image/ce4aea918a11ef9bdfeef48f844414fa.png",
    cover: FormImage,
  },
]);

async function handleCreate(type) {
  if (type == "wechat") {
    initWechat();
  }

  if (type == "questionnaire") {
    initQuestionnaire();
  }

  if (type == "article") {
    initArticle();
  }

  if (type == "form") {
    initForm();
  }

  router.push({
    name: `design-${type}`,
  });
}
</script>

<style lang="scss" scoped>
.item {
  .item-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #8494a690;
    z-index: 1;
    opacity: 0;

    .item-mask-text {
      position: absolute;
      font-size: 16px;
      color: #fff;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
    }
  }
  &:hover {
    .item-mask {
      opacity: 1;
    }
    .item-cover {
      transform: scale(1.05);
      transition: all 0.3s;
    }
  }
}
</style>

<template>
  <div class="pt-20 pl-24 pr-32">
    <div class="mb-50 text-20 c-#1b2337 font-600">创建设计</div>
    <div class="flex gap-30">
      <div
        v-for="(item, index) in list"
        :key="index"
        @click="handleCreate(item.type)"
      >
        <div
          class="item relative w-300 h-240 bg-#f5f7fd rd-24 overflow-hidden cursor-pointer shadow"
        >
          <div class="w-full h-170 overflow-hidden">
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, defineProps, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useWechatStore } from "@/store/wechat";
import { useQuestionnaireStore } from "@/store/questionnaire";
import { useArticleStore } from "@/store/article";
import wechatImage from "../../../assets/create/wechat.png";
import articleImage from "../../../assets/create/article.png";
import FormImage from "../../../assets/create/form.png";
import QuestionnaireImage from "../../../assets/create/questionnaire.png";

const router = useRouter();
const { initWechat } = useWechatStore();
const { initQuestionnaire } = useQuestionnaireStore();
const { initArticle } = useArticleStore();

const list = ref([
  {
    title: "小程序",
    description: "设计搭建小程序",
    type: "wechat",
    icon: "https://aigc-pub-prod-oss.chuangkit.com/aigc_module_image/6a91a7a530c5561e9de560f2f198cc30.png",
    cover: wechatImage,
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

  router.push({
    name: `design-${type}`,
  });
}
</script>

<style lang="scss" scoped>
.item {
  .item-mask {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #bfc2cc80;
    z-index: 1;

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
      display: block;
    }
    .item-cover {
      transform: scale(1.05);
      transition: all 0.3s;
    }
  }
}
</style>

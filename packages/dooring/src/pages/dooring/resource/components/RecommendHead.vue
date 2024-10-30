<template>
  <div>
    <!-- <img
      class="rd-10"
      src="https://lf3-static.bytednsdoc.com/obj/eden-cn/bqaeh7vhobd/illu_banner.png"
    /> -->
    <img class="rd-10" src="../../../../assets/banner1.png" />
    <div class="swiper-list__content">
      <div
        v-for="(item, index) in recommendList"
        :key="index"
        class="flex items-center w-130 h-50 mr-16 p16 rd-8 c-#1b2337 bg-#f5f7fd cursor-pointer"
        :class="index == 0 ? 'important-bg-#0050ff important-c-#fff' : ''"
        @click="
          router.push({
            name: `resource-template`,
            query: {
              type: item.value,
            },
          })
        "
      >
        <img class="w-24 h-24 mr-8" :src="item.icon" />
        <span class="text-14 font-600">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, defineProps, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();

const recommendList = ref([
  {
    title: "精选模板",
    value: "recommend",
    icon: "https://pub-cdn-oss.chuangkit.com/ad_position/862ee062ad9c4bc8b6e97aad8256ccfc",
  },
  {
    title: "小程序",
    value: "wechat",
    icon: "https://pub-cdn-oss.chuangkit.com/ad_position/7d663631bb5e46999839a145b72e780c",
  },
  // {
  //   title: "H5",
  //   value: "h5",
  //   icon: "https://pub-cdn-oss.chuangkit.com/ad_position/a542807c37c54c3b97f6159264ca88bc",
  // },
  {
    title: "调查问卷",
    value: "questionnaire",
    icon: "https://pub-cdn-oss.chuangkit.com/ad_position/d8821a9846114cb28ccb17527aaa52f3",
  },
  {
    title: "图文",
    value: "article",
    icon: "https://pub-cdn-oss.chuangkit.com/ad_position/71acadcc1eee49709ecdc5197fab59fa",
  },
]);
</script>

<style lang="scss" scoped>
.active {
  .contents-scenes-tab-item__title {
    color: #ffffff;
  }

  .contents-scenes-tab-item__sub-title {
    color: #ffffff90 !important;
  }
}

.swiper-list__content {
  display: flex;
  padding-top: 30px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x proximity;
  scrollbar-width: none;

  .contents-scenes-tab-item {
    width: 120px;
    height: 60px;
    margin-right: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    padding: 12px 16px 0 16px;
    background: #f6f7f9;
    border-radius: 8px;
    cursor: pointer;

    .contents-scenes-tab-item__title {
      margin-bottom: 4px;
      transition: cubic-bezier(0.2, 0, 0, 1) 0.3s;
    }

    .contents-scenes-tab-item__sub-title {
      max-width: 100%;
      font-size: 12px;
      line-height: 18px;
      color: #b4b8bf;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .contents-scenes-tab-item__image {
      position: absolute;
      right: -12px;
      bottom: -12px;
      width: 56px;
      height: 56px;
      pointer-events: none;
    }
  }
}
</style>

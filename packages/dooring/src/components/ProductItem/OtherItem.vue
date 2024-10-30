<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2023-01-09 20:09:28
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-19 09:18:01
-->
<template>
  <div
    class="cover"
    @click="handleEdit(item)"
    @mousemove.stop="handleMouseMove"
  >
    <!-- 封面图 -->
    <div>
      <img class="w-full" :src="cover" />
      <iframe :src="iframeSrc" />
      <div v-show="type == 'h5'" class="cover-tag">H5</div>
    </div>

    <!-- 长图预览 -->
    <div class="cover-long">
      <img
        class="cover-long-img"
        :src="cover"
        :style="{ objectPosition: `0px ${config.progress}%` }"
      />

      <div class="absolute bottom-0 w-full h-4px bg-#00000075">
        <div
          class="bg-white h-full"
          :style="{ width: `${config.progress}%` }"
        ></div>
      </div>
    </div>

    <div></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useWechatStore } from "@/store/wechat";
import Configuration from "@/configuration/index";

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});

const { initWechat } = useWechatStore();
const router = useRouter();
const cover = computed(() => {
  return props.item?.cover;
});

const iframeSrc = computed(() => {
  return `${Configuration.YUNDA_H5_PATH}pages/render/screenshot?id=${item.id}`;
});

const config = reactive({
  height: 0,
  progress: 0,
});

// 监听鼠标位置,计算当前滚动进度
const handleMouseMove = (event) => {
  let x = event.offsetX > 0 ? event.offsetX : 0;
  config.progress = (x / 200) * 100;
  console.log("config.progress", config.progress);
};

function handleEdit(item) {
  console.log("handleEdit", item);
  if (item.type == "wechat") {
    initWechat(item);
    router.push({ name: "design-wechat" });
  }
}
</script>

<style lang="scss" scoped>
.cover {
  position: relative;
  width: 200px;
  height: 405px;
  cursor: pointer;
  // border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);

  &:hover {
    .cover-long {
      opacity: 1;
    }
    .cover-long-img {
      transform: scale(1.02) !important;
    }
  }

  .cover-tag {
    position: absolute;
    left: 10px;
    bottom: 8px;
    height: 20px;
    line-height: 20px;
    padding: 0 8px;
    background: rgba(127, 135, 146, 0.3);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    pointer-events: none;
  }

  .cover-long {
    opacity: 0;

    .cover-long-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: scale(1);
      transition: transform 0.5s ease;
      will-change: transform;
      object-fit: cover;
      vertical-align: middle;
      border-style: none;
      object-fit: cover;
      object-position: top;
      overflow: clip;
    }

    &::after {
      content: "";
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
    }
  }
}
</style>

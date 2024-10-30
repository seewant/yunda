<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2023-01-09 20:09:28
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-28 16:21:07
-->
<template>
  <div class="cover" @click="handleEdit(item)">
    <div class="relative">
      <!-- 封面 -->
      <div v-design-loading="loading">
        <iframe ref="iframeRef" class="canvas" :src="path" @load="handleLoad" />
      </div>
    </div>

    <div class="cover-operation">
      <div v-if="operation == 'preview'" class="w-full h-full flex-center">
        <div class="w-120 h-120 rd-6 bg-#ffffff overflow-hidden">
          <img class="w-full h-full" :src="item.qr" />
        </div>
      </div>
      <div
        v-else
        class="absolute w-full h-full flex flex-col justify-center items-center p-5"
      >
        <div class="w-120 h-120 rd-6 mb-15 bg-#ffffff overflow-hidden">
          <img class="w-full h-full" :src="item.qr" />
        </div>
        <div class="flex-center bg-#ffffff rd-4 w-120 h-30">编辑</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useArticleStore } from "@/store/article";
import Configuration from "@/configuration/index";

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  operation: {
    type: String,
    default: "preview",
  },
});

let loading = ref(true);
const iframeRef = ref(null);
const router = useRouter();
const { initArticle } = useArticleStore();
const path = `${Configuration.YUNDA_H5_PATH}pages/render/screenshot?type=article&id=${props.item.id}`;

// iframe加载完毕后
function handleLoad() {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
}

function handleEdit(item) {
  if (props.operation == "edit") {
    initArticle(item);
    router.push({ name: "design-article" });
  } else {
    router.push({
      name: "template",
      query: {
        type: "article",
        id: props.item.id,
      },
    });
  }
}
</script>

<style lang="scss" scoped>
.canvas {
  width: 200px;
  height: 420px;
  border: none;
  overflow: auto;
}

/* 隐藏滚动条样式 */
iframe::-webkit-scrollbar {
  display: none;
}

/* 隐藏滚动条样式 */
iframe {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.cover {
  position: relative;
  width: 200px;
  height: 404px;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);

  &:hover {
    .cover-operation {
      opacity: 1;
    }
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

  .cover-operation {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.7s;
    background: rgba(0, 0, 0, 0.3);
    z-index: 99;

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.9);
      border: none;

      &:hover {
        background: rgba(232, 234, 236, 0.9);
      }

      svg {
        width: 18px;
        height: 18px;
      }
    }

    .cover-crown {
      width: 32px;
      height: 20px;
      font-size: 14px;
      position: absolute;
      bottom: 10px;
      right: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 6px;
      color: #fff;
      white-space: nowrap;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 18px;
      pointer-events: none;
      backdrop-filter: blur(10px);
      grid-area: bottom-right;
    }
  }
}
</style>

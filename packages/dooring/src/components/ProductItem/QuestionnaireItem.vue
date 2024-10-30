<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2023-01-09 20:09:28
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-28 15:57:32
-->
<template>
  <div class="item rd-6 overflow-hidden">
    <div class="p-12 pb-0">
      <div
        class="cover"
        @click="handleEdit(item)"
        @mousemove.stop="handleMouseMove"
      >
        <!-- 封面图 -->
        <div v-design-loading="loading">
          <iframe
            ref="iframeRef"
            class="canvas"
            :src="path"
            @load="handleLoad"
          />
        </div>

        <div class="cover-operation">
          <div v-if="operation == 'preview'" class="w-full h-full flex-center">
            <div class="w-120 h-120 rd-6 bg-#ffffff overflow-hidden">
              <img class="w-full h-full" :src="item.qr" />
            </div>
          </div>
          <div
            v-else
            class="flex justify-between pl-5 pr-5 w-full absolute bottom-10"
          >
            <el-popover placement="top-start" :width="150" trigger="hover">
              <template #reference>
                <el-button size="small" color="#626aef" plain>预览</el-button>
              </template>
              <img :src="item.qr" />
            </el-popover>
            <el-button
              size="small"
              color="#626aef"
              plain
              @click.stop="handleDataBoard(item)"
              >数据</el-button
            >
            <el-button size="small" color="#626aef" plain>分享</el-button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-#fff pt-20 pb-30 p-10 pr-10"
      style="box-shadow: 0 0 10px 0 rgba(78, 89, 105, 0.1)"
    >
      <div class="w-188 h-32 lh-16 mb-10 text-overflow">{{ item.title }}</div>
      <div class="flex justify-between items-center c-#999 text-12">
        <div>
          <span>{{ item.widgetList.length }}题</span>
          <!-- <span class="ml-5 mr-5">|</span> -->
          <!-- <span>4584引用</span> -->
        </div>
        <div class="c-theme bg-#e9f1ff p-5 rd-4">问卷</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuestionnaireStore } from "@/store/questionnaire";
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
const { initQuestionnaire } = useQuestionnaireStore();
const router = useRouter();
const path = `${Configuration.YUNDA_H5_PATH}pages/render/screenshot?type=questionnaire&id=${props.item.id}`;
const config = reactive({
  progress: 0,
});

// iframe加载完毕后
function handleLoad() {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
}

// 监听鼠标位置,计算当前滚动进度
const handleMouseMove = (event) => {
  let x = event.offsetX > 0 ? event.offsetX : 0;
  config.progress = (x / 184) * 100;
};

function handleEdit(item) {
  if (props.operation == "edit") {
    initQuestionnaire(item);
    router.push({ name: "design-questionnaire" });
  } else {
    router.push({
      name: "template",
      query: {
        type: "questionnaire",
        id: props.item.id,
      },
    });
  }
}

function handleDataBoard(item) {
  router.push({
    name: "report-questionnaire",
    query: { id: item.id },
  });
}
</script>

<style lang="scss" scoped>
.canvas {
  width: 184px;
  height: 260px;
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

.item {
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
}

.cover {
  position: relative;
  width: 184px;
  height: 260px;
  cursor: pointer;
  overflow: hidden;

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
    z-index: 99;
    background: #ffffff90;

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

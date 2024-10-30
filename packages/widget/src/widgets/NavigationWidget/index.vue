<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-10-13 16:57:06
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-25 19:46:30
-->
<template>
  <div
    class="navigation"
    :style="{
      backgroundColor: backgroundColor,
      margin: `0 ${backgroundMargin * 2}rpx`,
      borderRadius: backgroundShape == 'square' ? '' : '20rpx',
    }"
  >
    <!-- 导航栏单行滑动模式 -->
    <u-scroll-list v-if="mode == 'single'" :indicator="false">
      <div class="single-panel">
        <div
          v-for="item in list"
          :key="item.id"
          class="single-panel-item"
          @click="handleRoute(item)"
        >
          <image
            mode="widthFix"
            class="image"
            :style="{ borderRadius: shape == 'square' ? '' : '50%' }"
            :src="
              item.image ||
              'https://www.sunmao-design.top/mall-cook/image/1710233946476.jpg'
            "
          />
          <span class="single-panel-item-text" :style="{ color: textColor }">{{
            item.name
          }}</span>
        </div>
      </div>
    </u-scroll-list>

    <!-- 导航栏多行tab模式 -->
    <div v-if="mode == 'multi'" class="multi-panel">
      <div
        v-for="item in list"
        :key="item.id"
        class="multi-panel-item"
        :style="{ width: `${100 / props.colNumber}%` }"
        @click="handleRoute(item)"
      >
        <image
          mode="widthFix"
          class="image"
          :style="{ borderRadius: shape == 'square' ? '' : '50%' }"
          :src="
            item.image ||
            'https://www.sunmao-design.top/mall-cook/image/1710233946476.jpg'
          "
        />
        <span class="multi-panel-item-text" :style="{ color: textColor }">{{
          item.name
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive, computed } from "vue";

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  mode: {
    type: String,
    default: "",
  },
  colNumber: {
    type: String,
    default: "",
  },
  rowNumber: {
    type: String,
    default: "",
  },
  shape: {
    type: String,
    default: "",
  },
  indicatorColor: {
    type: String,
    default: "",
  },
  textColor: {
    type: String,
    default: "",
  },
  backgroundColor: {
    type: String,
    default: "",
  },
  backgroundMargin: {
    type: String,
    default: "",
  },
  backgroundShape: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["route"]);

function handleRoute(item) {
  emits("route", item.route);
}
</script>

<style lang="scss" scoped>
::v-deep .u-scroll-list {
  padding: 0;
}

.navigation {
  padding-bottom: 20rpx;
}

image {
  width: 100rpx;
  height: 100rpx;
}

.single-panel {
  display: flex;
  padding-left: 30rpx;
  .single-panel-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 54rpx;
    margin-top: 30rpx;

    .single-panel-item-text {
      margin-top: 14rpx;
      font-size: 24rpx;
    }
  }
}

.multi-panel {
  display: flex;
  flex-wrap: wrap;
  padding: 0 20rpx;

  .multi-panel-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30rpx;

    .multi-panel-item-text {
      margin-top: 14rpx;
      font-size: 24rpx;
    }
  }
}
</style>

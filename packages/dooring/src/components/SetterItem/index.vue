<!--
 * @Description: 设置器容器
 * @Autor: WangYuan1
 * @Date: 2022-11-03 20:29:24
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-13 14:40:33
-->
<template>
  <div class="setter-container">
    <!-- 单项设置器容器 -->
    <div v-if="!aloneTitle" class="basis">
      <span class="basis-label">{{ title }}</span>
      <div
        class="basis-body"
        :style="{ justifyContent: props.isSide ? 'flex-end' : '' }"
      >
        <slot></slot>
      </div>
    </div>

    <!-- 独立设置器容器 -->
    <div v-else class="independent">
      <div class="independent-contnet">
        <div>{{ title }}</div>
        <slot name="header"></slot>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "属性",
  },
  aloneTitle: {
    type: Boolean,
    default: false,
  },
  isSide: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.setter-container {
  margin-top: 5px;
  padding: 0 12px;
  .basis {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;

    .basis-label {
      height: 30px;
      line-height: 30px;
      color: #7f7f7f;
      font-size: 12px;
      width: 68px;
    }

    .basis-body {
      display: flex;
      justify-content: flex-end;
      flex: 1;
    }
  }
  .independent {
    width: 100%;
    padding-top: 12px;
    border-top: 1px solid #f5f5f5;
    .independent-contnet {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      font-size: 13px;
      font-weight: 600;
    }
  }
}
</style>

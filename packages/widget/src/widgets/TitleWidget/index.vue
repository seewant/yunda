<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-10-08 16:43:21
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-03-21 16:45:15
-->
<template>
  <div class="title" :style="{ padding: `${upperLowerPadding}px 0` }">
    <div
      v-if="['baseMode', 'descriptionMode'].includes(mode)"
      class="title-base"
    >
      <div :style="{ fontSize: `${titleSize}px`, color: titleColor }">
        {{ title }}
      </div>
      <div
        v-if="mode == 'descriptionMode'"
        class="title-base-description"
        :style="{ fontSize: `${descriptionSize}px`, color: descriptionColor }"
      >
        {{ description }}
      </div>
    </div>

    <div v-if="mode == 'jumpMode'" class="title-jump">
      <div>{{ title }}</div>
      <div class="title-jump-btn">
        <span>{{ jumpText }}</span>
        <img
          src="https://www.sunmao-design.top/mall-cook/image/1711010195294.png"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps({
  mode: { type: String, default: "baseMode" },
  title: { type: String, default: "标题" },
  description: { type: String, default: "描述" },
  jumpText: { type: String, default: "更多" },
  upperLowerPadding: { type: String, default: "10" },
  titleSize: { type: String, default: "14" },
  titleColor: { type: String, default: "" },
  descriptionSize: { type: String, default: "14" },
  descriptionColor: { type: String, default: "" },
});
</script>

<style lang="scss" scoped>
.title {
  .title-base {
    text-align: center;
    .title-base-description {
      padding: 5px 0;
    }
  }

  .title-jump {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    .title-jump-btn {
      display: flex;
      align-items: center;
      color: #999999;
      font-size: 12px;

      img {
        width: 12px;
        height: 12px;
      }
    }
  }
}
</style>

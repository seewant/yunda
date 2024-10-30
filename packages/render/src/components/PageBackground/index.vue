<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-07-02 16:56:57
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-30 14:14:25
-->
<template>
  <div class="bg" :style="[getPagePackgroundStyle(configure)]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  configure: {
    type: Object,
  },
});

function getPagePackgroundStyle(config: any) {
  let result = {};

  if (config) {
    result.backgroundColor = config.color || "#ffffff";
    result.backgroundImage = `url(${config.image})`;

    if (config.mode === "fill") {
      result.backgroundSize = `auto 100%`;
    } else if (config.mode === "tiled") {
      result.backgroundSize = ` 100% auto`;
      result.backgroundRepeat = `repeat`;
    } else if (config.mode === "stretch") {
      result.backgroundSize = `100% 100%`;
      result.backgroundRepeat = `no-repeat`;
    } else if (config.mode === "pinned") {
      result.backgroundImage = `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0, ${config.color} 300px), url(${config.image})`;
      result.backgroundRepeat = `no-repeat`;
      result.backgroundSize = `100% 300px`;
    } else {
      result.backgroundSize = ` 100% auto`;
      result.backgroundRepeat = `no-repeat`;
    }
  }

  return result;
}
</script>

<style lang="scss" scoped></style>

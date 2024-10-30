<!--
 * @Description: 可视化页面设计器
 * @Autor: WangYuan1
 * @Date: 2022-10-08 15:15:11
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-23 19:46:34
-->
<template>
  <div>
    <div class="design">
      <DesignLeft />
      <DesignCenter id="target" />
      <DesignRight :isPage="isPage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide } from "vue";
import DesignLeft from "./DesignLeft/index.vue";
import DesignCenter from "./DesignCenter/index.vue";
import DesignRight from "./DesignRight/index.vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  isPage: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
  },
});

const route = useRoute();

provide("type", props.type);
</script>

<style lang="scss" scoped>
.design {
  height: 100%;
  display: flex;
  justify-content: space-between;
  background: #f7f8fa;
}
</style>

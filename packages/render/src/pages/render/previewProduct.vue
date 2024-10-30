<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-03-15 15:22:25
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-05-16 20:38:46
-->
<template>
  <div
    v-if="page"
    class="page"
    :style="getPagePackgroundStyle(page?.configure?.background)"
  >
    <Render :widgetList="page.widgetList" />
  </div>
</template>

<script setup lang="ts">
import { toRefs, ref, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDesignHook } from "@/hooks/useDesign";
import { getPagePackgroundStyle } from "@design/utils";
import Render from "@/components/Render/index";

const route = useRoute();
const { previewProduct } = toRefs(useDesignHook());
console.log("previewProduct", previewProduct.value);

let page = ref(null);
let { pageId } = route.query;

page.value =
  previewProduct.value.pageList.find((item) => item.id == pageId) ||
  previewProduct?.value.pageList[0];
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
}
</style>

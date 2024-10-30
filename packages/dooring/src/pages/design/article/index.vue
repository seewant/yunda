<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-11-07 16:43:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-23 19:45:31
-->
<template>
  <div class="h-100vh">
    <Header />
    <DesignProductWork
      type="article"
      :isPage="true"
      style="height: calc(100vh - 54px)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useArticleStore } from "@/store/article";
import { useDesignStore } from "@/store/design";
import DesignProductWork from "@/components/DesignProductWork";
import Header from "./components/Header";

const { article } = toRefs(useArticleStore());
const { initDesign } = useDesignStore();

initDesign(article?.value);
</script>

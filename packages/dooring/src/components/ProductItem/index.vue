<!--
 * @Description: 产品列表
 * @Autor: WangYuan1
 * @Date: 2022-11-17 18:42:28
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-08-23 16:58:25
-->
<template>
  <div>
    <QuestionnaireItem
      v-if="type == 'questionnaire'"
      :operation="operation"
      :item="item"
    />
    <FormItem v-else-if="type == 'form'" :item="item" />
    <WechatItem
      v-else-if="type == 'wechat'"
      :item="item"
      :operation="operation"
    />
    <ArticleItem
      v-else-if="type == 'article'"
      :operation="operation"
      :item="item"
    />
    <OtherItem v-else :item="item" :operation="operation" />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive, defineProps } from "vue";
import OtherItem from "./OtherItem.vue";
import QuestionnaireItem from "./QuestionnaireItem.vue";
import FormItem from "./FormItem.vue";
import WechatItem from "./WechatItem.vue";
import ArticleItem from "./ArticleItem.vue";

const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
  type: {
    type: String,
    default: "",
  },
  gap: {
    type: String,
    default: "25",
  },
  operation: {
    type: String,
    default: "preview",
  },
});

const emits = defineEmits(["clickItem"]);

const page = reactive({
  total: 0,
  pageNo: 1,
  pageSize: 14,
  finish: false,
  list: [] as any[],
});
</script>

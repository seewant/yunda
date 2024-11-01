<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-10-30 14:58:09
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-11-01 11:24:12
-->
<template>
  <div class="page">
    <div class="c-#222529 font-extrabold text-20px mb-24px">推荐小程序</div>
    <div class="flex flex-wrap gap-30 mb-50">
      <ProductItem
        v-for="(item, index) in wechatList"
        :key="index"
        :item="item"
        type="wechat"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { http } from "@/utils/http";
import { ref, toRefs, reactive, defineProps } from "vue";
import ProductForPage from "@/components/ProductForPage";
import ProductItem from "@/components/ProductItem";

let wechatList = ref([]);
let questionnaireList = ref([]);
let articleList = ref([]);

getwWchatList();
getQuestionnaireList();
getArticleList();

function getwWchatList(page: any = { pageNo: 1, pageSize: 10 }) {
  return http
    .post("/wechat/getForPage", {
      pageNo: page.pageNo,
      pageSize: page.pageSize,
      recommend: true,
    })
    .then(function (res: any) {
      wechatList.value = res.data.list;
    });
}

function getQuestionnaireList(page: any = { pageNo: 1, pageSize: 10 }) {
  return http
    .post("/questionnaire/getForPage", {
      pageNo: page.pageNo,
      pageSize: page.pageSize,
      recommend: true,
    })
    .then(function (res: any) {
      questionnaireList.value = res.data.list;
    });
}

function getArticleList(page: any = { pageNo: 1, pageSize: 10 }) {
  return http
    .post("/article/getForPage", {
      pageNo: page.pageNo,
      pageSize: page.pageSize,
      recommend: true,
    })
    .then(function (res: any) {
      articleList.value = res.data.list;
    });
}
</script>

<style lang="scss" scoped></style>

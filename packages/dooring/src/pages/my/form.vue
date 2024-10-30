<!--
 * @Description: 我的产品
 * @Autor: WangYuan1
 * @Date: 2023-01-04 20:53:48
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-28 18:19:54
-->
<template>
  <div class="pl-30 pr-30">
    <div class="flex justify-between items-center mt-30 mb-20 text-18">
      <span>自定义表单</span>
      <!-- <div class="confirm-btn" @click="handleCreate">新增表单</div> -->
    </div>
    <el-alert
      title="为有牺牲多壮志，敢教日月换新天"
    >
    </el-alert>
    <ProductForPage :getList="getList" type="form" :gap="20" />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, computed, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
import { http } from "@/utils/http";
import { useFormStore } from "@/store/form";
import ProductForPage from "@/components/ProductForPage/index.vue";

function getList(page: any = { pageNo: 1, pageSize: 10 }) {
  return http
    .post("/form/getForPageFromUser", {
      pageNo: page.pageNo,
      pageSize: page.pageSize,
    })
    .then(function (res: any) {
      return res;
    });
}

const { initForm } = useFormStore();
const router = useRouter();

function handleCreate() {
  initForm();
  router.push({ name: "design-form" });
}
</script>

<style lang="scss" scoped>
.wrap {
  max-width: 1588px;
  margin: 20px auto;
  .wrap-type {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    border-bottom: solid 1px #f1f2f4;
    margin-bottom: 40px;
  }
  .wrap-list {
    display: grid;
    grid-template-columns: repeat(6, 248px);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }
}
</style>

<!--
 * @Description: 我的产品
 * @Autor: WangYuan1
 * @Date: 2023-01-04 20:53:48
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-23 16:20:36
-->
<template>
  <div class="pl-30 pr-30">
    <div class="mt-30 mb-20 text-18">我的小程序</div>
    <el-alert
      title="埋骨何须桑梓地，人生无处不青山"
    >
    </el-alert>
    <ProductForPage :getList="getList" type="wechat" :gap="31" operation="edit"/>
  </div>
</template>

<script setup lang="ts">
import { http } from "@/utils/http";
import ProductForPage from "@/components/ProductForPage/index.vue";

function getList(page: any = { pageNo: 1, pageSize: 10 }) {
  return http
    .post("/wechat/getForPageFromUser", {
      pageNo: page.pageNo,
      pageSize: page.pageSize,
    })
    .then(function (res: any) {
      return res;
    });
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

<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-10-22 11:30:57
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-11-01 11:26:50
-->
<template>
  <div class="p-20">
    <div>{{ type }}</div>
    <div>
      <div class="flex mb-14 text-14">
        <span class="mr-16 lh-32 c-#8693ab">分类：</span>
        <div
          v-for="(item, index) in typeList"
          :key="index"
          class="pl-6 pl-6 pr-6 rd-6 lh-32 mr-16 cursor-pointer"
          :class="fliter.type == item.value ? 'important-bg-#f1f3f9' : ''"
          @click="
            () => {
              fliter.type = item.value;
              fliter.use = '';
            }
          "
        >
          {{ item.label }}
        </div>
      </div>
      <div class="flex text-14">
        <span class="mr-16 lh-32 c-#8693ab">用途：</span>
        <div
          v-for="(item, index) in [
            { label: '全部', value: '' },
            ...Constants.UseType,
          ]"
          :key="index"
          class="pl-6 pl-6 pr-6 rd-6 lh-32 mr-16 cursor-pointer"
          :class="fliter.use == item.value ? 'important-bg-#f1f3f9' : ''"
          @click="fliter.use = item.value"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="mt-20 mb-20 h-1px bg-#ebeef5"></div>
    </div>

    <div class="mt-10">
      <div class="flex flex-wrap gap-20">
        <div v-for="(item, index) in page.list" :key="index">
          <ProductItem :item="item" :type="fliter.type" />
        </div>
      </div>
      <Observer
        :finish="page.finish"
        :handle-intersect="getList"
        :empty="page.list.length == 0"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, defineProps, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { http } from "@/utils/http";
import Constants from "@/constants/index";
import ProductItem from "@/components/ProductItem";
import Observer from "@/components/Observer";

const route = useRoute();
let query = route.query;
let loading = ref(true);
let fliter = ref({
  type: query.type || "wechat",
  use: "",
});

const typeList = ref([
  { label: "小程序", value: "wechat" },
]);

const page = reactive({
  total: 0,
  pageNo: 1,
  pageSize: 14,
  finish: false,
  list: [],
});

watch(
  fliter,
  (newValue) => {
    page.total = 0;
    page.pageNo = 1;
    page.pageSize = 14;
    page.finish = false;
    page.list = [];
    loading.value = true;

    setTimeout(() => {
      getList();
    }, 800);
  },
  { deep: true }
);

function getList() {
  http
    .post(`/${fliter.value.type}/getForPage`, {
      pageNo: page.pageNo,
      pageSize: page.pageSize,
      ...fliter.value,
    })
    .then((res) => {
      console.log("res", res);
      let { list, total } = res.data;
      page.total = total;
      page.pageNo++;
      page.list = [...page.list, ...list];
      console.log("page.list", page.list);

      if (list.length == page.total) {
        page.finish = true;
      }
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>

<style lang="scss" scoped></style>

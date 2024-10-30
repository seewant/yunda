<!--
 * @Description: 产品列表
 * @Autor: WangYuan1
 * @Date: 2022-11-17 18:42:28
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-24 10:17:37
-->
<template>
  <div :style="{ marginTop: `${gap}px` }">
    <div class="flex flex-wrap" :style="{ gap: `${gap}px` }">
      <div v-for="(item, index) in page.list" :key="index">
        <ProductItem :item="item" :type="type" :operation="operation" />
      </div>
    </div>
    <Observer
      :finish="page.finish"
      :handle-intersect="getList"
      :empty="page.list.length == 0"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive, defineProps } from "vue";
import Observer from "@/components/Observer";
import ProductItem from "@/components/ProductItem";

const props = defineProps({
  getList: {},
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

let loading = ref(true);
const emits = defineEmits(["clickItem"]);
const page = reactive({
  total: 0,
  pageNo: 1,
  pageSize: 14,
  finish: false,
  list: [] as any[],
});

function getList() {
  loading.value = true;

  if (props.getList) {
    props
      .getList(page)
      .then((res) => {
        console.log("res", res);
        let { list, total } = res.data;
        page.total = total;
        page.pageNo++;
        page.list = [...page.list, ...list];

        if (list.length == page.total) {
          page.finish = true;
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }
}
</script>

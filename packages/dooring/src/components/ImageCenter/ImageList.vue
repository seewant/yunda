<!--
 * @Description: 图片分页列表
 * @Autor: WangYuan1
 * @Date: 2022-11-17 20:12:06
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-24 10:31:32
-->
<template>
  <div class="content">
    <div class="list">
      <div v-for="(item, index) in list.data" :key="index" :item="item">
        <ImageIlistItem
          class="list-item"
          size="140"
          :image="item.thumbUrl"
          @click="choose(item.thumbUrl)"
        />
        <!-- <button @click="hanldeDelete(item.thumbUrl)">删除</button> -->
      </div>
    </div>

    <Observer
      :finish="list.finish"
      :handle-intersect="getList"
      :empty="list.data.length == 0"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, defineProps, computed } from "vue";
import { http } from "@/utils/http";
import ImageIlistItem from "./ImageIlistItem";
import Observer from "@/components/Observer";

const props = defineProps({
  type: {
    type: String,
  },
});

let loading = ref(true);
let list = ref({
  pageNo: 1,
  pageSize: 28,
  total: 0,
  finish: false,
  data: [] as any[],
});
const emits = defineEmits(["choose"]);

// 获取图片列表
function getList() {
  loading.value = true;
  http
    .post("/crawler/getForPage", {
      pageNo: list.value.pageNo,
      pageSize: list.value.pageSize,
      type: props.type,
    })
    .then(function (res: any) {
      let data = res.data.list;
      list.value.total = res.data.total;

      list.value.pageNo++;
      list.value.data = [...list.value.data, ...data];

      if (list.value.data.length == list.value.total) {
        list.value.finish = true;
        return;
      }
    })
    .finally(() => {
      loading.value = false;
    });
}

function hanldeDelete(thumbUrl) {
  http
    .post("/crawler/delete", {
      thumbUrl,
    })
    .then((res) => {
      // refresh();
    });
}
// 刷新图片列表
function refresh() {
  console.log("刷新图片列表");

  list.value = {
    pageNo: 1,
    pageSize: 30,
    total: 0,
    finish: false,
    data: [] as any[],
  };

  getList();
}

// 选择图片
function choose(url) {
  emits("choose", url);
}

defineExpose({ refresh });
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin: 0 auto;
  gap: 20px;

  .list-item {
    position: relative;
    // margin: 12px;
    margin-bottom: 35px;
    cursor: pointer;

    &::after {
      display: none;
      content: "";
      background: rgba(0, 0, 0, 0.15);
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      transition: opacity 0.5s ease;
      z-index: 10;
      pointer-events: none;
    }

    &:hover::after {
      display: block;
      opacity: 0.4;
    }
  }
}

.observer {
  margin-top: -50px;
}
</style>

<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-07-11 17:27:13
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-11 19:44:17
-->
<template>
  <data>
    <div v-if="!type" class="type">
      <div class="item" v-for="(element, index) in elementList" :key="index">
        <div class="flex justify-between flex-items-center h-36 pl-3 pr-3">
          <span class="text-14 c-#222529 font-700">{{ element.name }}</span>
          <span
            class="text-12 c-#4c535c cursor-pointer"
            @click="type = element.name"
            >查看更多</span
          >
        </div>
        <div class="item-content">
          <div
            class="item-content-element"
            v-for="(item, index) in element.list"
            :key="index"
            @dragstart="handleDragstartFun(item)"
            @dragend="handleDragend"
          >
            <img class="w-48 h-48 m-6" :src="item.largeUrl" />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        class="flex items-center mt-10 mb-20 cursor-pointer text-15 font-600 c-#222529"
        @click="type = ''"
      >
        <iconpark-icon
          class="mr-5"
          name="arrow-left"
          color="#222529"
          blod
        ></iconpark-icon>
        {{ type }}
      </div>
      <div class="flex flex-wrap">
        <div
          class="w-72 h-72 p-8 rd-5 cursor-pointer hover:bg-#d4d5d6"
          v-for="(item, index) in list"
          :key="index"
          @dragstart="handleDragstartFun(item)"
          @dragend="handleDragend"
        >
          <img class="w-full h-full" :src="item.largeUrl" />
        </div>
      </div>
    </div>
  </data>
</template>

<script setup lang="ts">
import { http } from "@/utils/http";
import { ref, reactive, watch, toRefs } from "vue";
import { useDesignHook } from "./useDesign";
import { cloneDeep } from "@design/utils";

let type = ref("");
let list = ref([]);
const { widgetMetaList } = toRefs(useDesignHook());
const { handleDragstart, handleDragend } = useDesignHook();
const elementList = ref([
  { name: "对话框", list: [] },
  { name: "夏日", list: [] },
]);

watch(
  () => type,
  (newVal) => {
    if (newVal) {
      getTypeList();
    } else {
      list.value = [];
    }
  },
  { immediate: true, deep: true }
);

getElementList();

function getElementList() {
  elementList.value.map((element) => {
    http
      .post("/crawler/getForPage", {
        pageNo: 1,
        pageSize: 8,
        type: `元素—${element.name}`,
      })
      .then(function (res: any) {
        element.list = res.data.list;
      });
  });
}

function getTypeList() {
  http
    .post("/crawler/getForPage", {
      pageNo: 1,
      pageSize: 100,
      type: `元素—${type.value}`,
    })
    .then(function (res: any) {
      list.value = res.data.list;
    });
}

function handleDragstartFun(element) {
  console.log("element", element);
  let meta = cloneDeep(
    widgetMetaList.value.find((item) => item.componentName === "image")
  );
  console.log("meta", meta);
  meta.w = 100;
  meta.h = 100;
  meta.props[0].defaultValue = element.largeUrl;

  handleDragstart(meta);
}
</script>

<style lang="scss" scoped>
.type {
  .item {
    .item-content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 8px;
      margin-top: 4px;
      margin-bottom: 20px;
      border-radius: 8px;
      background: #f1f2f4;
    }

    .item-content-element {
      border-radius: 8px;
      cursor: pointer;

      &:hover {
        background: #d4d5d6;
      }
    }
  }
}
</style>

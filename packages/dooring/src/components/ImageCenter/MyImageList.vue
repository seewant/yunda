<!--
 * @Description: 图片分页列表
 * @Autor: WangYuan1
 * @Date: 2022-11-17 20:12:06
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-07 11:23:24
-->
<template>
 <div class="content">
   <div class="list">
     <div v-for="(item, index) in list.data" :key="index" :item="item">
       <Booth
         class="list-item"
         size="140"
         :image="item.url"
         @click="choose(item.url)"
       />
     </div>
   </div>

   <Observer :finish="list.finish" :handle-intersect="getList" />
 </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, defineProps, computed } from "vue";
import { http } from "@/utils/http";
import Booth from "@/components/Booth/index.vue";
import Observer from "@/components/Observer";

const props = defineProps({
 type: {
   type: String,
 },
});

const emits = defineEmits(["choose"]);
let list = ref({
 pageNo: 1,
 pageSize: 30,
 total: 0,
 finish: false,
 data: [] as any[],
});

// 获取图片列表
function getList() {
 http
   .post("/img/getForPage", {
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
}

.flex-row {
 display: flex;
 flex-direction: row;
 width: 90vw;
 margin-left: 5vw;
 justify-content: space-around;
 align-items: flex-start;
}

// 可以利用meta属性做一个响应式，比如屏幕宽度超过多宽就显示5列，屏幕宽度为多宽就显示4列
.flex-column {
 display: flex;
 flex-direction: column;
 width: 25%;
 margin: 10px;
}

.flex-column-ele {
 img {
   width: 100%;
   max-height: 500px;
   object-fit: contain;
 }

 padding: 5px;
 margin: 5px;
 background-color: #f8f5f5;
 border-radius: 5px;
 box-shadow: 2px 5px 5px 0px #f3f3f3;
}

.list {
 display: flex;
 flex-wrap: wrap;
 flex: 1;
 box-sizing: border-box;
 padding: 0 24px;

 .list-item {
   position: relative;
   margin: 9px;
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

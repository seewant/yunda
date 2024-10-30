<!--
 * @Description: 自定义物料模板列表
 * @Autor: WangYuan1
 * @Date: 2022-10-08 15:16:23
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-28 16:50:28
-->
<template>
  <div class="group">
    <div class="group-type">
      <div
        class="group-type-item"
        :class="{ 'c-theme': activeWidgetType === item.group }"
        v-for="(item, index) in widgetMetaGroupList"
        :key="index"
        @click="activeWidgetType = item.group"
      >
        <iconpark-icon :name="item.icon" class="text-19 mb-5" />
        <span class="text-12">{{ item.group }}</span>
      </div>
    </div>

    <div v-for="(item, index) in widgetMetaGroupList" :key="index">
      <ul
        v-if="item.group == activeWidgetType"
        class="group-list"
        @dragstart="handleDragStart"
        @dragend="handleDragend"
      >
        <li
          v-for="(widget, index) in item.list"
          :key="index"
          class="group-list-item"
          :draggable="true"
          :data-component="JSON.stringify(widget)"
        >
          <img :src="widget.cover" class="pointer-events-none" />
          <div class="flex-center h-30">{{ widget.title }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDesignStore } from "@/store/design";
import { useIframeBusHook } from "@/hooks/useIframeBus";
import { useWidgetMetaHook } from "@/hooks/useWidgetMeta";
import { ref, reactive, toRefs, inject, computed } from "vue";
import { cloneDeep } from "@design/utils";
import Constants from "@/constants/index";

const { iframeBus } = useIframeBusHook();
const { setInDragStatus } = useDesignStore();
const { widgetMetaList } = toRefs(useWidgetMetaHook());
const type = inject("type");
let activeWidgetType = ref("基础");

const widgetMetaGroupList = computed(() => {
  let widgetTypeList = cloneDeep(Constants.widgetTypeList);
  const list = widgetMetaList.value.filter((meta) =>
    meta?.configure?.design?.types?.includes(type)
  );
  console.log("物料metalist", list);

  const otherTypeList = widgetTypeList.find((w) => w.group == "其他");

  list.forEach((item) => {
    const typeList = widgetTypeList.find((w) => w.group == item.group);
    typeList ? typeList.list.push(item) : otherTypeList.list.push(item);
  });

  // 过滤没有物料的分组
  widgetTypeList = widgetTypeList.filter((item) => item.list.length > 0);

  // 排序
  widgetTypeList.forEach((item) =>
    item.list.sort((a, b) => {
      const weightA = a.sortWeight || -Infinity;
      const weightB = b.sortWeight || -Infinity;
      return weightB - weightA; // 降序排列
    })
  );

  // 默认选择第一个类型
  activeWidgetType.value = widgetTypeList[0]?.group;

  return widgetTypeList;
});

// 开始拖拽
function handleDragStart(e: any) {
  console.log("开始拖拽物料", e.target.dataset);
  iframeBus.emit("dragstart", JSON.parse(e.target.dataset.component));
  setInDragStatus(true);
}

// 拖拽完成
function handleDragend() {
  console.log("结束拖拽物料");
  iframeBus.emit("dragend");
  setInDragStatus(false);
}
</script>

<style lang="scss" scoped>
.group {
  display: flex;
  width: 300px;
  background: #fff;
  box-shadow: inset -1px 0 0 0 #ebedf0;
  overflow: auto;

  .group-type {
    width: 70px;
    padding-top: 20px;
    padding-left: 10px;
    border-right: solid 1px #f0f0f0;

    .group-type-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 72px;
      cursor: pointer;
    }
  }

  .group-list {
    width: 230px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px;

    .group-list-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: calc(50% - 5px);
      background: #ebeffd;
      margin-bottom: 20px;
      font-size: 13px;
      border-radius: 5px;
      border: solid 2px #ebeffd;
      cursor: pointer;
    }
  }
}
</style>

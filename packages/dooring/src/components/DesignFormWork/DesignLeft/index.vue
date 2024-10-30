<!--
 * @Description: 自定义物料模板列表
 * @Autor: WangYuan1
 * @Date: 2022-10-08 15:16:23
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-04-18 09:59:45
-->
<template>
  <div class="group">
    <div v-for="(item, index) in widgetMetaGroupList" :key="index">
      <div class="group-name">{{ item.name }}</div>
      <ul
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
          <iconpark-icon
            :name="widget.icon"
            class="mt-12 text-18 c-#222222"
          ></iconpark-icon>
          <span class="mt-12 c-#222222">{{ widget.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWidgetMetaHook} from "@/hooks/useWidgetMeta";
import { useIframeBusHook } from "@/hooks/useIframeBus";
import { useFormStore } from "@/store/form";
import { ref, reactive, toRefs, defineProps, computed } from "vue";

const { iframeBus } = useIframeBusHook();
const { setInDragStatus } = useFormStore();
const { widgetMetaList } = toRefs(useWidgetMetaHook());

const widgetMetaGroupList = computed(() => {
  let result = [];
  let list = widgetMetaList.value.filter(
    (meta) => meta?.configure?.component?.isFrom
  );
  list.forEach((item) => {
    let { category } = item;
    let existGroup = result.find((w) => w.name == category);
    console.log("existGroup", existGroup);
    if (existGroup) {
      existGroup.list.push(item);
    } else {
      result.push({
        name: category,
        list: [item],
      });
    }
  });

  return result;
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
  width: 300px;
  height: calc(100vh - 96px);
  padding: 20px 15px 15px 15px;
  background: #fff;
  box-shadow: inset -1px 0 0 0 #ebedf0;

  .group-name {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    padding-bottom: 20px;
    font-size: 16px;
    color: #484848;
    cursor: pointer;
  }

  .group-list {
    display: flex;
    flex-wrap: wrap;

    .group-list-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 73px;
      height: 66px;
      margin-right: 17px;
      margin-bottom: 10px;
      font-size: 13px;
      color: #666;
      border-radius: 5px;
      background: #fafafa;
      cursor: pointer;

      &:hover {
        box-shadow: 0 0 5px 0 rgba(100, 134, 244, 0.5);
        border-right: 5px;
        transform: scale(1.1);
        transition: all 0.2s;
      }
    }
  }
}
</style>

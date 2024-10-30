<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2023-01-09 20:09:28
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-08-21 17:38:03
-->
<template>
  <div class="item" @click="handleEdit(item)">
    <div class="item-content">
      <div class="flex">
        <span
          class="block c-#00bf6f text-13 pt-6 pb-6 pl-8 pr-8 rd-3 bg-#00c37210"
        >
          表单
        </span>
      </div>
      <div class="c-#333 text-17 mt-18 line-height-24">
        {{ item?.title }}
      </div>
      <div class="flex-1 c-#999 text-13 mt-18">
        <span class="mr-5">{{ item?.description }}</span>
      </div>
      <div class="item-content-update">
        <div class="flex items-center">
          <div class="w-6 h-6 rd-50% mr-6 bg-#00bf6f"></div>
          <span class="c-#00bf6f">收集中</span>
        </div>
        <span class="c-#959595">20小时前更新</span>
      </div>
      <div class="item-content-operation">
        <div class="grey-btn text-8">编译</div>
        <div class="grey-btn">分享</div>
        <div class="grey-btn" @click.stop="handleDataBoard(item)">数据</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, computed, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDesignStore } from "@/store/design";
import { useFormStore } from "@/store/form";

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});

const { form } = toRefs(useFormStore());
const { initForm } = useFormStore();
const { initDesign } = useDesignStore();
const router = useRouter();

function handleEdit(item: any) {
  initForm(item);
  router.push({ name: "design-form" });
}

function handleDataBoard(item) {
  router.push({
    name: "report-form",
    query: { id: item.id },
  });
}
</script>

<style lang="scss" scoped>
.item {
  width: 217px;
  height: 212px;
  background: #fff;
  border: 1px solid #eff1f4;
  border-radius: 8px;
  padding: 18px 16px;
  cursor: pointer;

  &:hover {
    border: solid 1px $theme-color;

    .item-content-update {
      display: none !important;
    }
    .item-content-operation {
      display: flex !important;
    }
  }

  .item-content {
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;

    .item-content-update {
      width: 100%;
      display: flex;
      justify-content: space-between;
      position: absolute;
      bottom: 0;
      font-size: 13px;
    }

    .item-content-operation {
      display: none;
      width: 100%;
      justify-content: space-between;
      position: absolute;
      bottom: 0;
      font-size: 13px;
    }
  }
}
</style>

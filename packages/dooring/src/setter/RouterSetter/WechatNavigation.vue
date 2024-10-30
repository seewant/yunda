<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-05-14 10:41:04
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-13 11:36:24
-->
<template>
  <div class="page">
    <div class="h-70 lh-70">选择跳转的菜单导航</div>

    <div v-for="(tree, index) in pageTree" :key="index">
      <!-- <div class="mb-15 text-15 fw-1000 c-#000">{{ tree.name }}</div> -->
      <div class="flex flex-wrap gap-20 mb-20">
        <div
          v-for="item in tree.list"
          :key="item.id"
          class="h-30 lh-30 bg-#f5f5f5 pl30 pr-30 cursor-pointer hover:bg-#3662ec hover:c-#fff"
          :class="
            model.id == item.id ? 'important-bg-#3662ec important-c-#fff' : ''
          "
          @click="handleChoose(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, inject, computed } from "vue";
import { useWechatStore } from "@/store/wechat";
import { useVModel } from "@vueuse/core";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

let show = inject("show");
const { wechat } = toRefs(useWechatStore());
// v-model 配置
const emit = defineEmits(["update:modelValue"]);
const model = useVModel(props, "modelValue", emit);

const pageTree = computed(() => {
  const navigationPage = wechat.value.configure.navigation.list
    .filter((item) => item.status)
    .map((item) => item.router.value);
  console.log("navigationPage", navigationPage);
  return [
    {
      name: "小程序导航",
      list: wechat.value.configure.navigation.list
        .filter((item) => item.status)
        .map((item) => {
          return { name: item.name, id: item.path, type: "navigation" };
        }),
    },
  ];
});

function handleChoose(item) {
  model.value = item;
  show.value = false;
}
</script>

<style lang="scss" scoped></style>

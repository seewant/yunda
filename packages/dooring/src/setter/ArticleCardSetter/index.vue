<!--
 * @Description: 文本控件
 * @Autor: WangYuan1
 * @Date: 2022-10-18 10:45:43
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-02 16:25:18
-->
<template>
  <SetterItem :title="props?.schema?.title" :aloneTitle="true">
    <div class="flex flex-wrap gap-10 mt-10px">
      <div
        class="w-90px h-50px bg-#f4f5f9 rd-4px cursor-pointer"
        :class="item.id == model ? 'border-solid border-2 border-#2254f4' : ''"
        v-for="(item, index) in list"
        :key="index"
        @click="model = item.id"
      >
        <img class="w-full" :src="item.cover" />
      </div>
    </div>
  </SetterItem>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive, computed } from "vue";
import { useVModel } from "@vueuse/core";
import SetterItem from "@/components/SetterItem/index.vue";
import { useSetterHook } from "@/hooks/useSetter";
import { http } from "@/utils/http";

const props = defineProps({
  modelValue: {
    type: String,
  },
  widget: {
    type: Object,
    default: () => {},
  },
  schema: {
    type: Object,
    default: () => {},
  },
});

let list = ref([]);

// v-model 配置
const emit = defineEmits(["update:modelValue"]);
const model = useVModel(props, "modelValue", emit);

async function init() {
  http.post("/articleCard/getForPage", { pageSize: 100 }).then((res) => {
    if (res.code == "00000") {
      list.value = res.data.list;
    }
  });
}

init();
</script>

<style lang="scss" scoped></style>

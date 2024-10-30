<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-05-14 10:41:04
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-26 11:23:50
-->
<template>
  <div class="page">
    <div class="h-70 lh-70">选择跳转的问卷调查</div>
    <div class="flex flex-wrap gap-10">
      <!-- <div
        v-for="item in list"
        :key="item.id"
        class="h-30 lh-30 bg-#f5f5f5 pl30 pr-30 cursor-pointer hover:bg-#3662ec hover:c-#fff"
        :class="
          model.id == item.id ? 'important-bg-#3662ec important-c-#fff' : ''
        "
        @click="handleChoose(item)"
      >
        {{ item.title }}
      </div> -->

      <el-table
        :data="list"
        :border="false"
        height="500"
        :row-style="{
          height: '52px',
          fontSize: '12px',
        }"
        :cell-style="{
          borderColor: '#f5f5f5',
          padding: '0',
        }"
        :header-cell-style="{
          height: '47px',
          color: '#515a6e',
          backgroundColor: '#e0e7fe',
        }"
      >
        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>
        <el-table-column label="描述">
          <template #default="{ row }">
            {{
              row.description?.length > 60
                ? row.description?.substring(0, 60) + "..."
                : row.description
            }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template #default="{ row }">
            <el-button
              color="#2254f4"
              :plain="row.id != model"
              @click="handleChoose(row)"
            >
              选择
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, inject, computed } from "vue";
import { useWechatStore } from "@/store/wechat";
import { useVModel } from "@vueuse/core";
import { http } from "@/utils/http";

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
const list = ref([]);

function getList(page: any = { pageNo: 1, pageSize: 10 }) {
  return http
    .post("/questionnaire/getForPageFromUser", {
      pageNo: 1,
      pageSize: 100,
    })
    .then(function (res: any) {
      list.value = res.data.list;
    });
}

getList();

function handleChoose({ id, name }) {
  model.value = { type: "questionnaire", id, name };
  show.value = false;
}
</script>

<style lang="scss" scoped></style>

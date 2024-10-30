<!--
 * @Description: 图片库
 * @Autor: WangYuan1
 * @Date: 2022-11-15 15:18:15
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-08-24 09:48:47
-->
<template>
  <el-dialog
    width="50%"
    top="100px"
    v-model="show"
    :close-on-click-modal="false"
  >
    <div class="center" v-if="show">
      <div class="center-title">选择自定义表单</div>
      <div class="flex justify-end mb-10">
        <el-button color="#2254f4" plain @click="handleCreate"
          >创建新表单</el-button
        >
      </div>
      <div>
        <el-table
          v-design-loading="loading"
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
          <el-table-column prop="id" label="ID" width="180"> </el-table-column>
          <el-table-column prop="title" label="表单" width="100">
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间" width="180">
          </el-table-column>
          <el-table-column prop="description" label="描述"> </el-table-column>
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
  </el-dialog>
</template>

<script setup lang="ts">
import { http } from "@/utils/http";
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFormStore } from "@/store/form";

let show = ref(false);
let model = ref({});
let list = ref([]);
let loading = ref(true);
let templateForm = ref({});
const { initForm } = useFormStore();
const router = useRouter();
const emits = defineEmits(["submit"]);

// 打开弹窗
function open(target) {
  model.value = target;
  getFormList();
  getTargetFromDetailIsUser();
  show.value = true;
}

// 选中表单是否属于当前用户
function getTargetFromDetailIsUser() {
  http
    .post("/form/getTargetFromDetailIsUser", {
      id: model.value,
    })
    .then((res) => {
      templateForm.value = res.data;
      console.log("res", res);
    });
}
function getFormList() {
  console.log("model.value", model.value);

  loading.value = true;
  list.value = [];
  http
    .post("/form/getForPageFromUser", {
      pageSize: 100,
      formId: model.value,
    })
    .then((res) => {
      if (res.code == "00000") {
        list.value = res.data.list;
        loading.value = false;
      }
    });
}

function handleChoose(row) {
  model.value = row.id;
  show.value = false;
  emits("submit", model.value);
}

function handleCreate() {
  initForm();
  router.push({
    name: "design-form",
    query: {
      back: "design-wechat-decorate",
    },
  });
}

defineExpose({ open });
</script>

<style lang="scss" scoped>
.center {
  padding: 20px;

  .center-title {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
    padding-bottom: 10px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
  }

  .center-content {
    // height: 510px;
  }

  .center-operation {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>

<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-04-09 19:36:17
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-14 14:56:36
-->
<template>
  <div class="w-1600 h-800 mt-30 p-40 ml-auto mr-auto bg-#fff">
    <div class="mb-20">
      <div class="confirm-btn" @click="handleCreate">新增页面</div>
    </div>
    <el-table
      :data="wechat?.pageList"
      style="width: 100%"
      :border="false"
      :row-style="{
        height: '62px',
        fontSize: '13px',
      }"
      :header-cell-style="{
        height: '60px',
        color: '#000',
        backgroundColor: '#f7f8fa',
      }"
    >
      <el-table-column label="页面名称" width="200">
        <template #default="scope">
          <div class="mb-1 c-theme cursor-pointer">{{ scope.row.name }}</div>
          <div>
            <el-tag
              v-if="scope.row.isHome"
              color="#fff"
              type="info"
              size="small"
              >小程序首页</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="200">
        <template #default="scope"> {{ scope.row.createTime }} </template>
      </el-table-column>
      <el-table-column label="更新时间" width="200">
        <template #default="scope"> {{ scope.row.updateTime }} </template>
      </el-table-column>
      <el-table-column label="备注">
        <template #default> - </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template #default="scope">
          <span
            class="mr-10 p-8 text-12px c-theme cursor-pointer bg-#155bd408"
            @click="handleEdit(scope.row.id)"
          >
            编辑
          </span>
          <span class="mr-10 p-8 text-12px c-theme cursor-pointer bg-#155bd408">
            复制
          </span>
          <span
            v-if="!scope.row.isHome"
            class="mr-10 p-8 text-12px c-theme cursor-pointer bg-#155bd408"
          >
            设为主页
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useWechatStore } from "@/store/wechat";
import { useDesignStore } from "@/store/design";
import { createId, cloneDeep } from "@design/utils";
import dayjs from "dayjs";

const router = useRouter();
const { wechat, curWechatPage } = toRefs(useWechatStore());
const { setCurWechatPage } = useWechatStore();
const { initDesign } = useDesignStore();

function handleCreate() {
  const page = {
    id: createId(),
    name: `页面-${createId(2)}`,
    createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    configure: {
      background: {
        mode: "pinned",
      },
    },
    widgetList: [],
  };

  wechat.value.pageList.push(page);
}

function handleEdit(id: any) {
  setCurWechatPage(id);
  // initDesign(curWechatPage?.value);

  router.push({
    name: "design-wechat-decorate",
  });
}
</script>

<style lang="scss" scoped></style>

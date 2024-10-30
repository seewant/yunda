<!--
 * @Description: 图片库
 * @Autor: WangYuan1
 * @Date: 2022-11-15 15:18:15
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-04-11 20:45:36
-->
<template>
  <div class="data">
    <div class="data-menu">
      <el-tree
        :default-expand-all="true"
        :highlight-current="true"
        :current-node-key="type"
        :data="menuTree"
        :props="{
          children: 'children',
          label: 'label',
        }"
        node-key="id"
        @node-click="(val) => val.id && (type = val.id)"
      />
    </div>
    <div class="data-content">
      <div v-if="type == 'articleType'">分类文章</div>
      <div v-if="type == 'CustomForm'">自定义表单</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

let type = ref("articleType");

const menuTree = [
  {
    label: "文章",
    children: [
      {
        label: "分类文章",
        id: "articleType",
      },
    ],
  },
  {
    label: "自定义",
    children: [
      {
        label: "自定义表单",
        id: "CustomForm",
      },
    ],
  },
];
</script>

<style lang="scss" scoped>
::v-deep .el-tree-node.is-current > .el-tree-node__content {
  border-right: solid 2px $theme-color;
}

.data {
  display: flex;

  .data-menu {
    width: 170px;
    border-right: 1px solid #eee;
  }

  .data-content {
    flex: 1;
  }
}
</style>

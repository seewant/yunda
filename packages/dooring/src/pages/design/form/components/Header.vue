<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-11-07 16:43:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-11 16:12:49
-->
<template>
  <div>
    <div class="design-header">
      <div class="flex items-center h-full">
        <el-tooltip
          v-if="back"
          content="返回设计器"
          placement="bottom"
          effect="light"
        >
          <iconpark-icon
            class="mb-2 mr-15 text-16 line-height-50 cursor-pointer"
            name="arrow-left"
            @click="
              router.push({
                name: back,
              })
            "
          ></iconpark-icon>
        </el-tooltip>
        <el-tooltip
          v-else
          content="返回我的表单"
          placement="bottom"
          effect="light"
        >
          <iconpark-icon
            class="mb-2 mr-15 text-16 line-height-50 cursor-pointer"
            name="home-two"
            @click="
              router.push({
                name: 'my-form',
              })
            "
          ></iconpark-icon>
        </el-tooltip>
        <span class="ml-3 text-15px line-height-50 font-600 color-#444950">
          自定义表单
        </span>
      </div>
      <div class="flex items-center">
        <!-- github -->
        <div class="design-header-item">
          <!-- <iconpark-icon class="text-18" name="github-one"></iconpark-icon>
          <span class="text-14">github</span> -->
        </div>

        <!-- 版权提醒 -->
        <div class="design-header-item mr-12">
          <iconpark-icon
            class="text-18 mr-4"
            name="attention-ck62c1ci"
          ></iconpark-icon>
          <span class="text-14">版权提醒</span>
        </div>

        <!-- 预览 -->
        <el-button class="w-70px ml-5" @click="handlePreview"> 预览 </el-button>

        <!-- 发布 -->
        <el-button
          class="w-70px"
          style="box-shadow: 0 6px 8px 0 rgb(34, 84, 244, 0.16)"
          type="primary"
          color="#2254f4"
          @click="open"
        >
          发布
        </el-button>
      </div>
    </div>
    <!-- 发布表单弹窗 -->
    <DialogForm
      title="发布表单"
      :submitText="back ? '发布表单，并返回设计器' : '发布表单'"
      description="发布自定义表单"
      ref="formRef"
      :form="form"
      :resetFields="false"
      :submit="handlesSubmit"
    >
      <el-form-item
        label="表单名称"
        prop="title"
        :rules="{
          required: true,
          message: '请输入表单名称',
        }"
      >
        <input v-model="form.title" placeholder="请输入表单名称" />
      </el-form-item>

      <el-form-item class="mb-120" label="表单介绍（可选）" prop="description">
        <input v-model="form.description" placeholder="请输入表单介绍" />
      </el-form-item>
    </DialogForm>

    <PreviewForm ref="previewRef" />
  </div>
</template>

<script setup lang="ts">
import { http } from "@/utils/http";
import { useRoute, useRouter } from "vue-router";
import { useFormStore } from "@/store/form";
import { ref, toRefs, reactive, computed, inject } from "vue";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/user";
import DialogForm from "@/components/DialogForm/index.vue";
import PreviewForm from "@/components/Preview/PreviewForm";

const route = useRoute();
const router = useRouter();
const formRef = ref<any>();
const previewRef = ref<any>();
const { userInfo } = toRefs(useUserStore());
const { form } = toRefs(useFormStore());
const { back } = route.query;

function open() {
  formRef.value.open();
}

function handlePreview() {
  previewRef.value.open();
}

async function handlesSubmit() {
  let res = await http.post("/form/publish", {
    userId: userInfo.value.id,
    ...form.value,
  });

  if (res.code == "00000") {
    ElMessage({
      message: "表单发布成功！",
      type: "success",
    });
    router.push({
      name: back ? back : "my-form",
    });
  }
}
</script>

<style lang="scss" scoped>
.design-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 54px;
  background: #fff;
  padding: 0 30px;
  border: solid 1px rgba(0, 0, 0, 0.04);
  border-top: 0;

  .design-header-item {
    display: flex;
    align-items: center;
    height: 40px;
    margin-right: 8px;
    padding: 0 16px;
    color: #33383e;
    font-size: 14px;
    line-height: 40px;
    white-space: nowrap;
    border-radius: 4px;
    cursor: pointer;

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      background: #f0f3f4;
    }
  }
}
</style>

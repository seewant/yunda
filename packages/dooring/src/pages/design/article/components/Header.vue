<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-11-07 16:43:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-22 20:01:47
-->
<template>
  <div>
    <div class="design-header">
      <div class="flex items-center h-full">
        <el-tooltip content="返回我的图文" placement="bottom" effect="light">
          <iconpark-icon
            class="mb-2 mr-15 text-16 line-height-50 cursor-pointer"
            name="home-two"
            @click="
              router.push({
                name: 'my-article',
              })
            "
          ></iconpark-icon>
        </el-tooltip>
        <span class="ml-3 text-15px line-height-50 font-600 color-#444950">
          图文设计器
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
    <!-- 发布图文弹窗 -->
    <DialogForm
      title="发布图文"
      submitText="发布图文"
      description="你发布的作品可直接扫码观看"
      ref="formRef"
      :form="article"
      :resetFields="false"
      :submit="handlesSubmit"
    >
      <el-form-item
        label="图文标题"
        prop="title"
        :rules="{
          required: true,
          message: '请输入图文标题',
        }"
      >
        <input v-model="article.title" placeholder="请输入图文标题" />
      </el-form-item>

      <el-form-item
        label="图文描述"
        prop="description"
        :rules="{
          required: true,
          message: '请输入图文标题',
        }"
      >
        <input v-model="article.description" placeholder="请输入图文描述" />
      </el-form-item>

      <el-form-item
        class="mb-120"
        label="图文用途"
        prop="use"
        :rules="{
          required: true,
          message: '请选择图文标题',
        }"
      >
        <el-select
          v-model="article.use"
          placeholder="请选择图文用途"
          style="width: 100%"
          size="large"
        >
          <el-option
            v-for="(item, index) in Constants.UseType"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </DialogForm>

    <!-- 生成进度 -->
    <el-dialog
      class="progress"
      v-model="progress.show"
      width="13%"
      top="15%"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="flex flex-col items-center pt-50 pb-70 pl-40 pr-40">
        <img
          src="https://img.zcool.cn/community/012e5a5b99d79ba8012099c81012fc.gif"
        />
        <div class="mt-20 c-#667188 text-18 tracking-widest">创建中</div>
        <div class="mt-20 c-#b2bac8 text-center text-14 tracking-widest">
          {{ progress.text }}
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { http } from "@/utils/http";
import { useRoute, useRouter } from "vue-router";
import { createId } from "@design/utils";
import { useUserStore } from "@/store/user";
import { useArticleStore } from "@/store/article";
import { ref, toRefs, reactive, computed, inject } from "vue";
import { ElMessage } from "element-plus";
import DialogForm from "@/components/DialogForm/index.vue";
import Constants from "@/constants/index";

const progress = reactive({
  show: false,
  text: "正在构建项目",
});
const router = useRouter();
const formRef = ref<any>();
const { userInfo } = toRefs(useUserStore());
const { article } = toRefs(useArticleStore());

function open() {
  formRef.value.open();
}

async function createQr() {
  let res = await http.post("/qr/getQr", {
    id: article.value.id,
    type: "article",
  });

  article.value.qr = res.data.url;
}

async function handlesSubmit() {
  formRef.value.close();
  progress.show = true;

  delete article.value._id;

  if (!article.value.qr) {
    console.log("生成二维码");
    await createQr();
  }

  let res = await http.post("/article/publish", {
    ...article.value,
    userId: userInfo.value.id,
  });

  if (res.code == "00000") {
    ElMessage({
      message: "图文发布成功！",
      type: "success",
    });

    setTimeout(() => {
      progress.show = false;
      router.push({
        name: "my-article",
      });
    }, 500);
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

.loader {
  width: 50px;
  --b: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #514b82;
  -webkit-mask: repeating-conic-gradient(
      #0000 0deg,
      #000 1deg 70deg,
      #0000 71deg 90deg
    ),
    radial-gradient(
      farthest-side,
      #0000 calc(100% - var(--b) - 1px),
      #000 calc(100% - var(--b))
    );
  -webkit-mask-composite: destination-in;
  mask-composite: intersect;
  animation: l5 1s infinite;
}
@keyframes l5 {
  to {
    transform: rotate(0.5turn);
  }
}
</style>

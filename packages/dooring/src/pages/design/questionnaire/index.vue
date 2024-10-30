<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-11-07 16:43:35
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-24 19:07:54
-->
<template>
  <div class="design">
    <Header />
    <div class="design-menu">
      <router-link
        v-for="item in menuList"
        :key="item.value"
        :to="{ name: item.value }"
        class="design-menu-item"
        exact-active-class="router-link-active"
      >
        <iconpark-icon :name="item.icon" class="mr-5 text-17"></iconpark-icon>
        <span class="text-16">{{ item.label }}</span>
      </router-link>
    </div>
    <!-- <div>{{ questionnaire }}</div> -->
    <div class="design-body">
      <router-view></router-view>
    </div>

    <!-- 发布产品弹窗 -->
    <DialogForm
      title="发布问卷"
      submitText="发布"
      description="你发布的作品可直接扫码观看"
      ref="formRef"
      :form="questionnaire"
      :submit="handlesSubmit"
    >
    </DialogForm>
  </div>
</template>

<script setup lang="ts">
import { http } from "@/utils/http";
import { useRoute, useRouter } from "vue-router";
import { useDesignStore } from "@/store/design";
import { useQuestionnaireStore } from "@/store/questionnaire";
import { useUserStore } from "@/store/user";
import { ref, toRefs, reactive, computed, inject } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import DialogForm from "@/components/DialogForm/index.vue";
import Header from "./components/Header.vue";

const route = useRoute();
const router = useRouter();
const formRef = ref<any>();
const { userInfo } = toRefs(useUserStore());
const { initDesign } = useDesignStore();
console.log("useDesignStore", useDesignStore());
console.log("initDesign", initDesign);
const { questionnaire } = toRefs(useQuestionnaireStore());
// 菜单列表
const menuList = [
  { label: "内容", value: "design-questionnaire-build", icon: "bill" },
  { label: "样式", value: "design-questionnaire-style", icon: "setting-one" },
];

initDesign(questionnaire.value);

// 产品设计平台初始化
// async function init() {
//   let { id } = route.query;
//   if (id) {
//     http.post("/questionnaire/getDetailById", { id }).then((res) => {
//       if (res.code == "00000") {
//         initQuestionnaire(res.data);
//         setcurrentWidgetList(questionnaire.value.widgetList);
//       } else {
//         router.back();
//       }
//     });
//   } else {
//     initQuestionnaire();
//   }
// }

function open() {
  ElMessageBox.confirm(
    `你要发布问卷《${questionnaire.value.title}》吗？`,
    "发布确认",
    {
      confirmButtonText: "确认发布",
      cancelButtonText: "取消",
      showClose: false,
    }
  ).then(() => {
    console.log("questionnaire?.value", questionnaire?.value);

    handlesSubmit();
  });
}

function handlePreview() {
  router.push({
    name: "design-questionnaire-style",
  });
}

async function handlesSubmit() {
  http
    .post("/questionnaire/publish", {
      userId: userInfo.value.id,
      ...questionnaire.value,
    })
    .then((res) => {
      if (res.code == "00000") {
        ElMessage({
          message: "问卷发布成功！",
          type: "success",
        });

        handleBack();
      } else {
        Promise.reject();
      }
    });
}

function handleBack() {
  router.push({
    name: "my-questionnaire",
  });
}
</script>

<style lang="scss" scoped>
.design {
  height: 100vh;

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
      align-content: center;
      height: 40px;
      padding: 0 10px;
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

  .design-menu {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    min-width: 980px;
    height: 42px;
    background: #fff;
    font-size: 14px;
    color: #666;
    padding: 7px 34px 7px 34px;
    border-bottom: 1px solid #eff1f4;

    .design-menu-item {
      padding: 0 10px;
      height: 28px;
      line-height: 28px !important;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 24px;
      border-radius: 4px;
      font-weight: 500;
      font-size: 15px;
      text-align: center;
      line-height: normal;
      color: #666;

      &:hover {
        background: $grey-color;

        color: #000000;
      }
    }
  }

  .design-body {
    width: 100%;
    height: calc(100vh - 96px);
    background: #f7f8fa;
  }
}

// 路由高亮
.router-link-active {
  background: $grey-color;
  color: #000000;
}
</style>

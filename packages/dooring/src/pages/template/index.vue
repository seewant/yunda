<template>
  <div class="flex flex-col h-full">
    <div
      class="h-56 flex items-center pl-40 bg-#fff border-b-solid border-1 border-#eff1f4"
    >
      <iconpark-icon
        class="text-22 cursor-pointer"
        name="arrow-left"
        @click="router.back()"
      ></iconpark-icon>
    </div>
    <div class="flex flex-1 bg-#f6f7f9" v-design-loading="!complete">
      <div class="flex w-full h-full">
        <div
          class="w-200 pl-40 pt-30 pb-30 bg-#fff overflow-auto"
          style="height: calc(100vh - 56px)"
        >
          <div
            v-for="(page, index) in pageList"
            :key="index"
            @click="currentPage = page"
          >
            <div class="relative w-120 h-200 rd-8 mb-20">
              <iframe
                class="w-120 h-200 rd-8 border-0 mb-20 pointer-events-none"
                :src="page"
              />
              <div
                v-show="currentPage == page"
                class="absolute top-0 left-0 w-full rd-8 h-full border-2 border-solid shadow"
              ></div>
            </div>
          </div>
        </div>
        <div class="flex-center flex-1 rd-6 p-30">
          <PageShell>
            <iframe
              class="w-375 h-667 border-0"
              :src="currentPage"
              :key="currentPage"
            />
          </PageShell>
        </div>
        <div class="w-370 bg-#fff ml-20 p-40 pt-30 rd-6">
          <div class="pb-20">
            <div class="mb-20"></div>
            <div class="mb-20 text-20 font-500 c-#000">
              {{ product?.title }}
            </div>
            <div class="mb-20 text-14 font-500 c-#8693ab">
              {{ product?.description }}
            </div>
            <div>
              <div
                class="confirm-btn w-180 important-h-40 important-text-14"
                @click="handleCreate"
              >
                使用模板
              </div>
            </div>
          </div>
          <div
            class="flex items-center pt-25 pb-25 border-t border-b border-t-solid border-b-solid border-#e8eaec"
          >
            <img
              class="w-85 h-85 mr-10"
              src="https://img1.baidu.com/it/u=418130785,3372968603&fm=253&fmt=auto&app=138&f=JPEG?w=511&h=500"
            />
            <div>
              <div class="mb-10 text-14 font-600 c-#1b2337">手机扫码预览</div>
              <div class="text-12 c-#8693ab">扫码二维码在手机预览模板效果</div>
            </div>
          </div>
          <div class="pt-20 text-14">
            <div class="flex justify-between pb-18">
              <span class="c-#636c78">产品类型</span>
              <span>小程序</span>
            </div>
            <div class="flex justify-between pb-18">
              <span class="c-#636c78">创建时间</span>
              <span>{{ product?.createTime }}</span>
            </div>
            <div class="flex justify-between pb-18">
              <span class="c-#636c78">编号</span>
              <span>{{ product?.id }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { http } from "@/utils/http";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/user";
import { useRoute, useRouter } from "vue-router";
import { createId, cloneDeep } from "@design/utils";
import { useLogin } from "@/components/Login/useLogin";
import { ref, toRefs, reactive, computed, inject } from "vue";
import { useQuestionnaireStore } from "@/store/questionnaire";
import { useArticleStore } from "@/store/article";
import { useWechatStore } from "@/store/wechat";
import Configuration from "@/configuration/index";
import PageShell from "@/components/PageShell/index.vue";

const route = useRoute();
const pageList = ref([]);
const router = useRouter();
const { openLogin } = useLogin();
const { type, id } = route.query;
const { userInfo } = toRefs(useUserStore());
const { initQuestionnaire } = useQuestionnaireStore();
const { initArticle } = useArticleStore();
const { initWechat } = useWechatStore();
let currentPage = ref("");
let product = ref(null);
let complete = ref(false);

setTimeout(() => {
  complete.value = true;
}, 3000);

getDetail();

function getDetail() {
  if (type == "wechat") {
    http.post("/wechat/getDetailById", { id }).then((res) => {
      if (res.code == "00000") {
        product.value = res.data;

        product.value.pageList.map((page) =>
          pageList.value.push(
            `${Configuration.YUNDA_H5_PATH}pages/render/screenshot?type=wechat&id=${id}&pageId=${page.id}`
          )
        );

        currentPage.value = pageList.value[0];
      }
    });
  }

  if (type == "questionnaire") {
    http.post("/questionnaire/getDetailById", { id }).then((res) => {
      if (res.code == "00000") {
        product.value = res.data;
        pageList.value.push(
          `${Configuration.YUNDA_H5_PATH}pages/render/screenshot?type=questionnaire&id=${id}`
        );
        currentPage.value = pageList.value[0];
      }
    });
  }

  if (type == "article") {
    http.post("/article/getDetailById", { id }).then((res) => {
      if (res.code == "00000") {
        product.value = res.data;
        pageList.value.push(
          `${Configuration.YUNDA_H5_PATH}pages/render/screenshot?type=article&id=${id}`
        );
        currentPage.value = pageList.value[0];
      }
    });
  }
}

function handleCreate() {
  if (!userInfo) {
    openLogin();
    return;
  }
  // 使用小程序模板
  if (type == "wechat") handleCopyWechat();

  if (type == "questionnaire") handleCopyQuestionnaire();

  if (type == "article") handleCopyArticle();
}

// 复制小程序
async function handleCopyWechat() {
  const params = formatCopyProduct(cloneDeep(product.value));
  const id = params.product.id;

  const res = await http.post("/wechat/copy", params);
  console.log("res", res);

  if (res.code == "00000") {
    const res1 = await http.post("/wechat/getDetailById", { id });
    const wechat = res1.data;
    console.log("wechat", wechat);

    if (res1.code == "00000") {
      ElMessage({
        message: "小程序模板新增成功！",
        type: "success",
      });

      setTimeout(() => {
        initWechat(wechat);
        router.push({ name: "design-wechat" });
      }, 1000);
    }
  }
}

function formatCopyProduct(product) {
  const replaceList = [];
  product.recommend = false;
  // 递归替换自定义表单新id
  const replaceCustomFormNewId = (list = []) => {
    for (const widget of list) {
      // 查询自定义表单，如果存在则替换为新表单id
      if (
        ["CustomListWIdget", "CustomFormWidget"].includes(widget.componentName)
      ) {
        const copyCustomForm = replaceList.find(
          (item) => item.copyId == widget.props.formId
        );

        if (copyCustomForm) {
          // 当前自定义表单已存入拷贝列表，则直接替换为新id
          widget.props.formId = copyCustomForm.newId;
        } else {
          // 当前自定义表单未存入拷贝列表，则存入拷贝列表并替换为新id
          const newId = createId();
          replaceList.push({
            copyId: widget.props.formId,
            newId,
            type: "form",
          });
          widget.props.formId = newId;
        }
      }

      if (widget.children) {
        replaceCustomFormNewId(widget.children);
      }
    }
  };

  // 递归替换问卷新id
  const replaceQuestionnaireNewId = (obj) => {
    // 检查是否为对象或数组
    if (typeof obj === "object" && obj !== null) {
      // 如果是数组
      if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
          replaceQuestionnaireNewId(obj[i]);
        }
      } else {
        // 如果是对象
        // 检查 type 是否为 "questionnaire"
        if (obj.type === "questionnaire") {
          // 更新 id
          console.log("找到目标：", obj);

          const copyCustomForm = replaceList.find(
            (item) => item.copyId == obj.id
          );

          if (copyCustomForm) {
            // 当前自问卷已存入拷贝列表，则直接替换为新id
            obj.id = copyCustomForm.newId;
          } else {
            // 当前问卷未存入拷贝列表，则存入拷贝列表并替换为新id
            const newId = createId();
            replaceList.push({
              copyId: obj.id,
              newId,
              type: "questionnaire",
            });
            obj.id = newId;
          }
        }

        // 遍历对象的每个属性
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            replaceQuestionnaireNewId(obj[key]);
          }
        }
      }
    }
    // 如果不是对象或数组，则不进行任何操作
  };

  delete product._id;
  product.id = createId();
  product.userId = userInfo.value.id;
  product.createTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  product.updateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

  // 递归替换自定义表单新id
  product.pageList.map((page) => {
    replaceCustomFormNewId(page.widgetList);
  });

  // 递归替换问卷新id
  replaceQuestionnaireNewId(product.pageList);

  return { product, replaceList };
}

function handleCopyQuestionnaire() {
  const questionnaire = cloneDeep(product.value);
  delete questionnaire._id;
  questionnaire.id = createId();
  questionnaire.userId = userInfo.value.id;
  questionnaire.recommend = false;
  questionnaire.createTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  questionnaire.updateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

  http.post("/questionnaire/publish", questionnaire).then((res) => {
    if (res.code == "00000") {
      ElMessage({
        message: "调查问卷模板新增成功！",
        type: "success",
      });

      setTimeout(() => {
        initQuestionnaire(questionnaire);
        router.push({ name: "design-questionnaire" });
      }, 1000);
    }
  });
}

function handleCopyArticle() {
  const article = cloneDeep(product.value);
  delete article._id;
  article.id = createId();
  article.userId = userInfo.value.id;
  article.recommend = false;
  article.createTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  article.updateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

  http.post("/article/publish", article).then((res) => {
    if (res.code == "00000") {
      ElMessage({
        message: "图文模板新增成功！",
        type: "success",
      });

      setTimeout(() => {
        initArticle(article);
        router.push({ name: "design-article" });
      }, 1000);
    }
  });
}
</script>

<style lang="scss" scoped></style>

<!--
 * @Description: 渲染截图页
 * @Autor: WangYuan1
 * @Date: 2024-04-07 16:01:32
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-09-06 11:01:49
-->
<template>
  <div id="screenshot" class="screenshot">
    <template v-if="product">
      <!-- 问卷 -->
      <template v-if="productType == 'questionnaire'">
        <div class="questionnaire">
          <img class="questionnaire-banner" :src="product?.backgroundImage" />
          <div class="form">
            <!-- <div>{{ model }}</div> -->
            <div class="form-title">{{ product?.title }}</div>
            <div class="form-description">{{ product?.description }}</div>
            <div
              v-for="widget in product.widgetList"
              :key="widget.id"
              class="form-item"
            >
              <component
                :is="widget.componentName"
                :widget="widget"
                v-bind="widget.props"
              />
            </div>
            <div class="form-submit">提交</div>
          </div>
        </div>
      </template>
      <!-- 小程序 -->
      <PageBackground
        v-else-if="['article', 'wechat'].includes(productType)"
        class="page"
        :configure="product?.configure?.background"
      >
        <Render :widgetList="product?.widgetList" />
      </PageBackground>
    </template>
  </div>
</template>

<script setup lang="ts">
import { http } from "@/utils/http";
import Render from "@/components/Render/index";
import { useRoute, useRouter } from "vue-router";
import { ref, toRefs, reactive, computed, inject } from "vue";
import PageBackground from "@/components/PageBackground";

const route = useRoute();
let productType = ref("");
let product = ref(null);

init();

function init() {
  let { id, pageId, type } = route.query;
  productType.value = type;

  if (type == "wechat")
    http.post("/wechat/getDetailById", { id }).then((res) => {
      if (res.code == "00000") {
        const { pageList } = res.data;
        product.value = pageId
          ? pageList.find((item) => item.id == pageId)
          : pageList[0];
      }
    });

  if (type == "questionnaire")
    http.post("/questionnaire/getDetailById", { id }).then((res) => {
      if (res.code == "00000") {
        product.value = res.data;
      }
    });

  if (type == "article")
    http.post("/article/getDetailById", { id }).then((res) => {
      if (res.code == "00000") {
        product.value = res.data;
      }
    });
}
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
}

::v-deep .item {
  padding: 10px 0 0 0;
}

.questionnaire {
  position: relative;

  .questionnaire-banner {
    position: relative;
    width: 100%;
    z-index: -1;
  }

  .form {
    margin-top: -40rpx;
    background: #ffffff;
    border-radius: 40rpx 40rpx 0 0;
    padding: 72rpx 48rpx 60rpx;

    .form-title {
      margin-bottom: 16rpx;
      font-size: 40rpx;
      font-weight: 600;
      text-align: center;
      color: #333;
    }

    .form-description {
      margin-bottom: 60rpx;
      font-size: 28rpx;
      line-height: 46rpx;
      color: #666;
      white-space: pre-wrap;
    }

    .form-item {
      padding-bottom: 40rpx;

      .form-item-error {
        height: 60rpx;
        color: #ff6d56;
        font-size: 28rpx;
        font-weight: 400;
        margin-top: 16rpx;
      }
    }

    .form-submit {
      height: 96rpx;
      line-height: 96rpx;
      border-radius: 8rpx;
      margin: 76rpx auto 0;
      text-align: center;
      font-size: 36rpx;
      color: #fff;
      background: #6782ff;
    }

    .form-sign {
      height: 95px;
      line-height: 95px;
      text-align: center;
      font-size: 13px;
      color: #666;
    }
  }
}
</style>

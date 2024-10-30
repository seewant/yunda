<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-03-15 15:22:25
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-25 10:35:27
-->
<template>
  <div class="questionnaire">
    <img class="questionnaire-banner" :src="previewProduct?.backgroundImage" />
    <div class="form">
      <!-- <div>{{ model }}</div> -->
      <div class="form-title">{{ previewProduct?.title }}</div>
      <div class="form-description">{{ previewProduct?.description }}</div>
      <div v-for="widget in widgetList" :key="widget.id" class="form-item">
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

<script setup lang="ts">
import { useDesignHook } from "@/hooks/useDesign";
import { ref, toRefs, computed } from "vue";

const { previewProduct } = toRefs(useDesignHook());

// 物料列表
const widgetList = computed(() => previewProduct.value?.widgetList || []);
</script>

<style lang="scss" scoped>
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
    margin-top: -20px;
    background: #ffffff;
    border-radius: 20px 20px 0 0;
    padding: 36px 24px 30px;

    .form-title {
      margin-bottom: 8px;
      font-size: 20px;
      font-weight: 600;
      text-align: center;
      color: #333;
    }

    .form-description {
      margin-bottom: 30px;
      font-size: 14px;
      line-height: 23px;
      color: #666;
      white-space: pre-wrap;
    }

    .form-item {
      padding-bottom: 20px;

      .form-item-error {
        height: 30px;
        color: #ff6d56;
        font-size: 14px;
        font-weight: 400;
        margin-top: 8px;
      }
    }

    .form-submit {
      height: 48px;
      line-height: 48px;
      border-radius: 4px;
      margin: 38px auto 0;
      text-align: center;
      font-size: 18px;
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

<!--
 * @Description: 表单输入框物料
 * @Autor: WangYuan1
 * @Date: 2024-03-28 15:29:02
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-12 15:08:50
-->
<template>
  <FormItem :label="props.label" :required="props.required">
    <u-rate :count="5" v-model="model[field]" size="30" gutter="14"></u-rate>
    <div v-show="model == 1" class="evaluate">"非常不满意"</div>
    <div v-show="model == 2" class="evaluate">"比较不满意"</div>
    <div v-show="model == 3" class="evaluate">"一般"</div>
    <div v-show="model == 4" class="evaluate">"比较满意"</div>
    <div v-show="model == 5" class="evaluate">"非常满意"</div>
  </FormItem>
</template>

<script setup lang="ts">
import FormItem from "../../components/FormItem.vue";

const props = defineProps({
  model: { type: Object, default: {} },
  field: { type: String, default: "" },
  required: { type: Boolean, default: false },
});
</script>

<style lang="scss" scoped>
::v-deep .u-rate {
  .u-rate__content__item:active {
    animation: shake 2s ease infinite;
  }

  .u-icon__icon {
    font-size: 60rpx !important;
    line-height: 60rpx !important;
  }

  .uicon-star-fill {
    color: transparent !important; /* 将文本颜色设为透明 */
    background-image: linear-gradient(
      135deg,
      #ffdd69,
      #ff930b
    ); /* 设置渐变背景 */
    background-clip: text; /* 将背景应用到文本上 */
  }
}

.evaluate {
  margin-top: 10px;
  color: #f4c055;
  font-size: 12px;
}

/* 定义抖动动画 */
@keyframes shake {
  0%,
  100% {
    transform: rotate(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: rotate(-30deg);
  }
  15%,
  35%,
  55%,
  75% {
    transform: rotate(30deg);
  }
}
</style>

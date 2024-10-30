<!--
 * @Description: 表单输入框物料
 * @Autor: WangYuan1
 * @Date: 2024-03-28 15:29:02
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-12 15:01:07
-->

<template>
  <FormItem :label="props.label" :required="props.required">
    <u-input
      placeholder="请输入"
      border="surround"
      v-model="model[field]"
      :style="{ border: focus ? `solid 1px #3662ec !important` : '' }"
      @blur="() => (focus = false)"
      @focus="() => (focus = true)"
    ></u-input>
  </FormItem>
</template>

<script setup lang="ts">
import FormItem from "../../components/FormItem.vue";
import { ref, watch } from "vue";

const props = defineProps({
  model: { type: Object, default: {} },
  label: { type: String, default: "" },
  field: { type: String, default: "" },
  required: { type: Boolean, default: false },
});

let focus = ref(false);
</script>

<style lang="scss" scoped>
::v-deep .u-input {
  height: 52rpx;
  padding: 16rpx 24rpx !important;
  border: 0;
  background: #f8f9fa;
  border: solid 1rpx #fff !important;

  .u-input__content__field-wrapper__field {
    font-size: 34rpx !important;
  }

  &:hover {
    border: solid 1rpx #3662ec !important;
  }
}
</style>

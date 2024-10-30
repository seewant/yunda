<!--
 * @Description: 表单单选物料
 * @Autor: WangYuan1
 * @Date: 2024-03-28 15:29:02
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-12 15:07:11
-->
<template>
  <FormItem :label="props.label" :required="props.required">
    <u-radio-group
      v-model="model[field]"
      activeColor="#3662ec"
      placement="column"
      iconSize="0"
    >
      <u-radio
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :name="item.id"
      >
      </u-radio>
    </u-radio-group>
  </FormItem>
</template>

<script setup lang="ts">
import FormItem from "../../components/FormItem.vue";

const props = defineProps({
  model: { type: Object, default: {} },
  field: { type: String, default: "" },
  label: { type: String, default: "" },
  options: { type: Array, default: [] },
  required: { type: Boolean, default: false },
});
</script>

<style lang="scss" scoped>
::v-deep .u-radio-group {
  .u-radio {
    margin-bottom: 20rpx !important;
  }
  .u-radio__icon-wrap {
    width: 32rpx !important;
    height: 32rpx !important;
    margin-right: 16rpx !important;

    span {
      width: 16rpx !important;
      height: 16rpx !important;
      border-radius: 50%;
      background: #fff !important;
    }
  }
  .u-radio__text {
    font-size: 32rpx !important;
  }
}
</style>

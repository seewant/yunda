<!--
 * @Description: 文本控件
 * @Autor: WangYuan1
 * @Date: 2022-10-18 10:45:43
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-03-29 15:16:33
-->
<template>
  <div>
    <SetterItem v-show="condition" :title="props?.schema?.title" :isSide="true">
      <div class="setter" @click="changeImage">
        <Booth :image="model" size="14" class="setter-color"></Booth>
        <div>图片</div>
        <!-- <div>100%</div> -->
      </div>
    </SetterItem>

    <ImageCenter ref="imageRef" @choose="chooseImage" />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch, computed } from "vue";
import { useVModel } from "@vueuse/core";
import { useSetterHook } from "@/hooks/useSetter";
import Booth from "@/components/Booth/index.vue";
import SetterItem from "@/components/SetterItem/index.vue";
import ImageCenter from "@/components/ImageCenter/index";

const props = defineProps({
  modelValue: {
    type: String,
  },
  widget: {
    type: Object,
    default: () => {},
  },
  schema: {
    type: Object,
    default: () => {},
  },
});

const { condition } = useSetterHook(props);
const imageRef = ref<any>();

// v-model 配置
const emit = defineEmits(["update:modelValue"]);
const model = useVModel(props, "modelValue", emit);

function changeImage() {
  imageRef.value.open();
}

function chooseImage(url) {
  model.value = url;
}
</script>

<style lang="scss" scoped>
.upload {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background: #fff;
  box-shadow: 0 0 8px rgb(0 0 0 / 12%);
  border-radius: 4px;
  font-size: 20px;
  color: #777e89;
  cursor: pointer;
}
.pointer {
  cursor: pointer;
}

.setter {
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  padding: 0 8px;
  border-radius: 6px;
  background: #f0f0f0;
  color: #6b6d6b;
  font-size: 13px;
  cursor: pointer;
  .setter-color {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    margin-right: 10px;
    border-radius: 3px;
    position: relative;
  }
}
</style>

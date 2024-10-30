<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-11-15 19:48:47
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-08-28 15:02:46
-->
<template>
  <div class="booth">
    <!-- <el-image v-show="!loading" :src="props.image"  :style="imageStyle" /> -->
    <img v-show="!loading" :src="props.image" :style="imageStyle" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, defineProps, watch } from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "200",
  },
  image: {
    type: String,
    default: "",
  },
});

let loading = ref(true);
let imageStyle = ref({});

watch(
  () => props.image,
  () => {
    if (!props.image) return;
    const img = new Image();
    img.src = props.image;
    img.onload = () => {
      let than = img.width / img.height;
      imageStyle.value =
        than > 1
          ? { width: "100%", height: "auto" }
          : { width: "auto", height: "100%" };
      loading.value = false;
      console.log("imageStyle.value", imageStyle.value);
    };
  },
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.booth {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 140px;
  width: 140px;
  border-radius: 10px;
  background: #f6f7f9;
  padding: 12px;
}
</style>

<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-11-15 19:48:47
 * @LastEditors: WangYuan
 * @LastEditTime: 2023-12-26 17:18:26
-->
<template>
  <div
    class="booth"
    :style="{ width: `${props.size}px`, height: `${props.size}px` }"
  >
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
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  background-image: linear-gradient(
      45deg,
      #eee 25%,
      transparent 0,
      transparent 75%,
      #eee 0,
      #eee
    ),
    linear-gradient(45deg, #eee 25%, #fff 0, #fff 75%, #eee 0, #eee);
}
</style>

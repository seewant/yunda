<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-10-13 16:57:06
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-23 20:16:13
-->
<template>
  <div>
    <img
      class="img"
      :style="{ borderRadius: `${getUpx(radius)}` }"
      :src="props.url || baseUrl"
      mode="widthFix"
      @click="handleRoute"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive, computed } from "vue";
import { getUpx } from "../../utils/tools";

const props = defineProps({
  url: { type: String, default: "" },
  radius: { type: String, default: "0" },
  route: { type: Object, default: { type: "", value: "" } },
});

const emits = defineEmits(["route"]);

let baseUrl =
  "https://img01.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png!large.webp";

function handleRoute() {
  console.log('props.route', props.route);
  emits("route", props.route);
}
</script>

<style lang="scss" scoped>
.img {
  display: block;
  width: 100%;
}
</style>

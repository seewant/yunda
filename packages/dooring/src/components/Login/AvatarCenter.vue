<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2023-12-20 10:33:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2023-12-20 11:55:31
-->
<template>
  <div>
    <div class="setter" @click="show = true">
      <Booth
        v-if="!model"
        :image="model"
        size="80"
        class="cursor-pointer"
      ></Booth>
      <img
        v-else
        :src="model"
        class="w-80 h-80 box-border p-8 m-10 rd-18 bg-#ffffff shadow-[0_5px_60px_-15px_rgba(0,0,0,0.4)] cursor-pointer"
      />
    </div>

    <el-dialog v-model="show" top="5vh" width="32%">
      <div class="p36">
        <h2 class="mb-5 text-24 font-600 c-#252525">选择头像</h2>
        <div class="mb-15 c-#cdcdcd">选择个自己喜欢的头像吧！</div>
        <div class="flex flex-wrap">
          <img
            v-for="(avatar, index) in avatarList"
            :key="index"
            :src="avatar"
            class="w-80 h-80 box-border p-8 m-10 rd-18 bg-#ffffff shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] cursor-pointer"
            @click="
              () => {
                model = avatar;
                show = false;
              }
            "
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, inject, computed } from "vue";
import { useVModel } from "@vueuse/core";
import Booth from "@/components/Booth/index.vue";

const props = defineProps({
  modelValue: {
    type: String,
  },
});

let show = ref(false);
// v-model 配置
const emit = defineEmits(["update:modelValue"]);
const model = useVModel(props, "modelValue", emit);

const avatarList = [];

for (let i = 1; i <= 35; i++) {
  avatarList.push(
    `http://www.sunmao-design.top/sunmao/assets-iamge/avatar-${i}.jpg`
  );
}
</script>

<style lang="scss" scoped>
.test {
}
</style>

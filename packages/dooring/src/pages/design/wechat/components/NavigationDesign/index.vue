<!--
 * @Description: 画布
 * @Autor: WangYuan1
 * @Date: 2022-10-08 15:14:20
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-28 17:34:51
-->
<template>
  <div class="flex" :style="{ height: 'calc(100vh - 54px)' }">
    <div class="flex-1 overflow-auto pt-50 pb50">
      <PageShell class="relative" v-design-loading="loading">
        <template #footer>
          <!-- 底部导航 -->
          <div
            v-if="wechat?.configure?.navigation?.mode == 'bottom'"
            class="flex h-full"
          >
            <div
              class="flex flex-1 flex-col items-center h-full text-12"
              v-for="item in wechat?.configure?.navigation?.list.filter(
                (item) => item.status
              )"
              :key="item.id"
            >
              <svg class="w-30 h-30" aria-hidden="true">
                <use :xlink:href="`#${item.icon}`" fill="#cccccc"></use>
              </svg>
              <span class="pt-3">{{ item.name }}</span>
            </div>
          </div>
          <!-- 悬浮导航 -->
          <div
            v-if="wechat?.configure?.navigation?.mode == 'floating'"
            class="floating"
          >
            <div
              class="flex flex-1 flex-col items-center text-12"
              v-for="item in wechat?.configure?.navigation?.list.filter(
                (item) => item.status
              )"
              :key="item.id"
            >
              <svg class="w-32 h-32" aria-hidden="true">
                <use :xlink:href="`#${item.icon}`" fill="#cccccc"></use>
              </svg>
            </div>
          </div>
        </template>
      </PageShell>
    </div>
    <!-- 物料属性设置器 -->
    <div class="w-350 bg-#ffffff overflow-auto">
      <template v-if="wechat?.configure?.navigation">
        <component
          v-for="(model, index) in meta?.props"
          :key="index"
          :is="model.setter.componentName"
          v-model="wechat.configure.navigation[model.name]"
          :schema="model"
          :project="wechat"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import meta from "./meta";
import PageShell from "@/components/PageShell/index.vue";
import { useWechatStore } from "@/store/wechat";
import { ref, reactive, toRefs, defineProps, computed } from "vue";

const { wechat } = toRefs(useWechatStore());
const project = computed(() => wechat.value);
let loading = ref(true);

// 进入页面进行1s的loading,用于iframe重新渲染
setTimeout(() => {
  loading.value = false;
}, 400);
</script>

<style lang="scss" scoped>
.floating {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  width: calc(100% - 60px);
  height: 50px;
  border-radius: 25px;
  justify-content: space-around;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.06);
}
</style>

<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-04-12 15:41:31
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-03 17:07:01
-->
<template>
  <div class="flex overflow-hidden">
    <div class="flex-1 flex-center pt-20 pb-20 bg-#f7f8fa">
      <div class="w-375">
        <div
          class="flex justify-center flex-wrap"
          :style="{
            gap: `${listConfig.props.gap}px`,
            paddingTop: `${listConfig.props.gap}px`,
          }"
        >
          <div
            v-for="(item, index) in 6"
            :key="index"
            ref="container"
            :style="containerStyle"
            class="transparent"
            :class="[
              `${
                listConfig.props.showbackground ? 'bg-transparent' : 'bg-white'
              }`,
            ]"
            :widget="listConfig"
          ></div>
        </div>
      </div>
    </div>

    <div class="w-300">
      <!-- <div>{{ listConfig }}</div> -->
      <component
        v-for="(meta, index) in containerMeta?.props"
        :key="index"
        :is="meta.setter.componentName"
        v-model="listConfig.props[meta.name]"
        :widget="listConfig.props"
        :schema="meta"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, inject } from "vue";
import containerMeta from "./meta";
import PageShell from "@/components/PageShell/index.vue";

const props = defineProps({
  listConfig: {
    type: Object,
    default: () => {},
  },
});

const containerStyle = computed(() => ({
  borderRadius: `${props.listConfig.props.radius}px`,
  width: `${props.listConfig.props.width}px`,
  height: `${props.listConfig.props.height}px`,
  boxShadow: props.listConfig.props.showShadow
    ? "0 2px 4px rgba(0, 0, 0, 0.1)"
    : "none",
  backgroundImage: props.listConfig.props.backgroundImage
    ? `url(${props.listConfig.props.backgroundImage})`
    : "none",
}));

const init = () => {
  containerMeta.props.map((item) => {
    props.listConfig.props[item.name] = item.defaultValue;
  });
};

defineExpose({ init });
</script>

<style scoped lang="scss">
.bg-transparent {
  border: dashed 1px $theme-color;
}
</style>

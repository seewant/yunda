<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-04-12 15:41:31
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-05-30 19:32:56
-->
<template>
  <div class="flex overflow-hidden">
    <div class="flex-1 flex-center pt-20 pb-20 bg-#f7f8fa">
      <PageShell background="#f2f3f5" class="h-540">
        <div
          class="flex justify-center flex-wrap"
          :style="{
            gap: `${itemConfig.props.gap}px`,
            paddingTop: `${itemConfig.props.gap}px`,
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
                itemConfig.props.showbackground ? 'bg-transparent' : 'bg-white'
              }`,
            ]"
            :widget="itemConfig"
          ></div>
        </div>
      </PageShell>
    </div>

    <div class="w-300">
      <div>{{ itemConfig }}</div>
      <component
        v-for="(meta, index) in containerMeta?.props"
        :key="index"
        :is="meta.setter.componentName"
        v-model="itemConfig.props[meta.name]"
        :widget="itemConfig.props"
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
  itemConfig: {
    type: Object,
    default: () => {},
  },
});

const containerStyle = computed(() => ({
  borderRadius: `${props.itemConfig.props.radius == "round" ? 8 : 0}px`,
  width: `${props.itemConfig.props.width}px`,
  height: `${props.itemConfig.props.height}px`,
  boxShadow: props.itemConfig.props.showShadow
    ? "0 2px 4px rgba(0, 0, 0, 0.1)"
    : "none",
  backgroundImage: props.itemConfig.props.backgroundImage
    ? `url(${props.itemConfig.props.backgroundImage})`
    : "none",
}));

const init = () => {
  containerMeta.props.map((item) => {
    props.itemConfig.props[item.name] = item.defaultValue;
  });
};

defineExpose({ init });
</script>

<style scoped lang="scss">
.bg-transparent {
  border: dashed 1px $theme-color;
}
</style>

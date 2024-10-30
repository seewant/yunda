<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-01-16 19:18:08
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-21 15:10:30
-->
<template>
  <div
    ref="widgetListRef"
    class="page"
    :class="[widgetList.length ? '' : 'empty']"
  >
    <WidgetListNext v-if="widgetList.length" v-model="widgetList" />
    <div v-if="drag?.type == 'page'" class="page-insert">物料加入页面</div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onUnmounted, onMounted } from "vue";
import WidgetListNext from "@/components/Design/WidgetListNext";
import { useDesignHook } from "@/hooks/useDesign";

const { widgetList, drag } = toRefs(useDesignHook());
const { handleSetCurrentWidget, handleWidgetContextmenu } = useDesignHook();
const widgetListRef = ref(null);

window.addEventListener("scroll", function () {
  handleWidgetContextmenu({
    show: false,
    widgetId: "",
    x: "",
    y: "",
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", function () {});
});
</script>

<style lang="scss" scoped>
.page {
  min-height: 667px;

  .page-insert {
    background: #457af7;
    text-align: center;
    color: #fff;
    font-size: 12px;
    padding: 8px 0;
    border-radius: 5px;
  }
}

.empty {
  position: relative;
  background: url("https://file.qingflow.com/assets/empty-content/applying-editorial-tips.png?x-oss-process=image/format,webp");
  background-size: 120px 120px;
  background-repeat: no-repeat;
  background-position: 125px 220px;
  &::after {
    content: "拖拽左侧组件进页面";
    position: absolute;
    top: 340px;
    left: 50%;
    transform: translateX(-50%);
    color: #8591a2;
    font-size: 10px;
  }
}
</style>

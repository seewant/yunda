<!--
 * @Description: 触底懒加载（交叉观察者实现）
 * @Autor: WangYuan1
 * @Date: 2022-11-20 16:29:51
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-24 10:31:59
-->
<template>
  <div class="target" ref="target">
    <div class="loading" v-if="!finish">拼命加载中...</div>
    <div class="finish" v-if="finish && !empty">- THE END -</div>
    <Empty v-if="!loading && empty" />
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  watch,
  defineProps,
  onMounted,
  onBeforeUnmount,
} from "vue";
import Empty from "@/components/Empty";

const props = defineProps({
  finish: {
    type: Boolean,
    default: false,
  },
  empty: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  handleIntersect: Function,
  rootSelector: String,
  total: Number,
});

let observer = null;
const target = ref(null);

onMounted(() => {
  const options = {
    root: document.querySelector(props.rootSelector),
    // rootMargin: "200px 0px",
  };

  // 构建观察器
  observer = new IntersectionObserver(([entry]) => {
    // 目标元素与根元素相交
    console.log("目标元素与根元素相交");
    if (entry?.isIntersecting) {
      props.handleIntersect();
    }
  }, options);

  // 观察目标元素
  observer.observe(target.value);
});

// watch(
//   () => props.finish,
//   () => {
//     if (props.finish) observer.disconnect();
//   },
//   {
//     immediate: true,
//   }
// );

// 组件销毁前停止监听
onBeforeUnmount(() => {
  observer.disconnect();
});
</script>

<style lang="scss" scoped>
.target {
  width: 100%;
  padding: 20px 0;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.57);
}

.finish {
  width: 100%;
  font-size: 12px;
  text-align: center;
  color: rgba(0, 0, 0, 0.57);
}
</style>

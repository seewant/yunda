<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-04-11 17:03:49
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-04-12 11:00:11
-->
<template>
  <div class="flex-center pb-20 pt-10">
    <div class="step-container">
      <div v-for="(step, index) in steps" :key="index" class="step">
        <div class="step-node">
          <div
            class="step-node-circle"
            :class="[index <= currentStep ? 'complete-background' : '']"
          ></div>

          <div
            class="step-node-title"
            :class="[index <= currentStep ? 'complete-color' : '']"
          >
            {{ step.title }}
          </div>
          <div
            class="text-11 mt-5 c-#bbb"
            :class="[index <= currentStep ? 'complete-color' : '']"
          >
            {{ step.description }}
          </div>
        </div>
        <div
          v-if="index < steps.length - 1"
          class="step-node-line"
          :class="[index <= currentStep - 1 ? 'complete-background' : '']"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  steps: {
    type: Array,
    default: () => [],
  },
  currentStep: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.step-container {
  display: flex;
  align-items: center;
}

.step {
  position: relative;
  display: flex;
  justify-content: center;
  width: 300px;

  .step-node {
    display: flex;
    flex-direction: column;
    align-items: center;

    .step-node-circle {
      width: 10px;
      height: 10px;
      margin: 0 6px 10px 6px;
      border-radius: 50%;
      display: flex;
      background-color: #cdcdcd;
    }
  }
  .step-node-line {
    position: absolute;
    top: 3px;
    left: 162px;
    height: 3px;
    width: 276px;
    background-color: #ebebeb;
  }
}

.complete-color {
  color: #2254f4;
}

.complete-background {
  background-color: #2254f4 !important;
}
</style>

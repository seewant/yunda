<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-07-11 10:28:29
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-11 17:26:42
-->
<template>
  <div class="left">
    <div class="left-meau">
      <div
        v-for="(meau, index) in meauList"
        :key="index"
        class="left-meau-item"
        :class="{ 'left-meau-item-active': meau.id == activeMeau }"
        @click="activeMeau = meau.id"
      >
        <div class="left-meau-item-icon">
          <img v-if="meau.id != activeMeau" class="w-24" :src="meau.icon" />
          <img v-else class="w-24" :src="meau.activeIcon" />
        </div>
        <span class="left-meau-item-label">{{ meau.name }}</span>
      </div>
    </div>
    <div class="left-content">
      <DesignLeftWidget v-show="activeMeau == 'widget'" />
      <DesignLeftElement v-show="activeMeau == 'element'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, toRefs } from "vue";
import DesignLeftWidget from "./DesignLeftWidget.vue";
import DesignLeftElement from "./DesignLeftElement.vue";

let activeMeau = ref("template");
const meauList = [
  {
    id: "widget",
    name: "添加",
    icon: "https://cdn.dancf.com/fe-assets/20240110/ac1fcd04749da1e14de455577c75d989.svg",
    activeIcon:
      "https://cdn.dancf.com/fe-assets/20240110/df5a696243b3af89c8fb5d756804d72c.svg",
  },
  {
    id: "template",
    name: "模板",
    icon: "https://cdn.dancf.com/fe-assets/20240110/d4e27c21a874df312544938075bddfdb.svg",
    activeIcon:
      "https://cdn.dancf.com/fe-assets/20240110/13f97bb37d5203ce8ec38ca2752dc72e.svg",
  },
  {
    id: "element",
    name: "元素",
    icon: "https://cdn.dancf.com/fe-assets/20240110/5ce6d198cf438fd4c936c13735e0bff8.svg",
    activeIcon:
      "https://cdn.dancf.com/fe-assets/20240110/b98bf19653ab22af1e956eab084b89e8.svg",
  },
  {
    id: "image",
    name: "图片",
    icon: "https://cdn.dancf.com/fe-assets/20240110/385189e77857511173548af8a1281e6b.svg",
    activeIcon:
      "https://cdn.dancf.com/fe-assets/20240110/1e38e009e37a4953d87efe124ce44557.svg",
  },
];
</script>

<style lang="scss" scoped>
.left {
  display: flex;
  background: #fff;
  box-shadow: inset -1px 0 0 0 #ebedf0;

  .left-meau {
    padding: 10px 5px;
    border-right: solid 1px #ebedf0;

    .left-meau-item {
      position: relative;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 56px;
      margin: 4px;
      margin-bottom: 20px;
      font-size: 12px;
      cursor: pointer;

      .left-meau-item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 54px;
        height: 36px;
        border-radius: 12px;

        &:hover {
          background: #e8eaec;
        }
      }

      .left-meau-item-label {
        margin-top: 4px;
        line-height: 110%;
        color: #4c535c;
        text-align: center;
        transform: scale(0.92);
      }
    }

    .left-meau-item-active {
      .left-meau-item-icon {
        background: #e8eaec;
      }

      .left-meau-item-label {
        color: #222529;
        font-weight: 700;
      }
    }
  }

  .left-content {
    width: 320px;
    padding: 16px;
  }
}
</style>

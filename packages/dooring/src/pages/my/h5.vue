<!--
 * @Description: 文本控件
 * @Autor: WangYuan1
 * @Date: 2022-10-18 10:45:43
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-19 15:27:30
-->
<template>
  <div>
    <div
      class="relative"
      :style="{ height: `${canvas.height}px`, width: `${canvas.width}px` }"
    >
      <div
        v-for="(attr, index) in work[0]"
        :key="index"
        class="absolute flex-center"
        :style="{
          top: `${attr.transform.posY}px`,
          left: `${attr.transform.posX}px`,
          height: `${attr.attribute.height}px`,
          width: `${attr.attribute.width}px`,
        }"
      >
        <img
          v-if="attr.meta.type == 'image'"
          class="w-full h-full"
          :src="attr.attribute.picUrl"
        />
        <div
          v-if="attr.meta.type == 'text'"
          :style="{
            fontSize: `${attr.attribute.fontSize}px`,
            color: rgbaToString(attr.attribute.color),
            letterSpacing: `${attr.attribute.letterSpacing}px`,
            fontWeight: `${attr.attribute.fontWeight}`,
          }"
        >
          {{ getText(attr.attribute.text) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import textJson from "./text.json";
import { http } from "@/utils/http";

console.log("textJson", textJson);
const { canvas, pageAttr, work } = textJson.msg.doc;

function rgbaToString(color) {
  if (color) return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
}

function getText(arr) {
  if (arr) {
    let text = arr[0];
    text = text.replace("\u0000", "");
    return text;
  }
}
</script>

<style lang="scss" scoped></style>

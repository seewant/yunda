<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-11-17 19:22:46
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-11-22 20:36:02
-->
<template>
  <div class="bg">
    <div class="bg-element top-left"></div>
    <div class="bg-element top-right"></div>
    <div class="bg-element bottom-left"></div>
    <div class="bg-element bottom-right"></div>

    <div class="bg-content">
      <h2 class="mb-6 text-9 font-600 color-#000">
        {{ title }}
      </h2>
      <p class="mb12 text-18px">{{ describe }}</p>
      <div class="relative flex-center w-580px h-56px bg-white rd-2">
        <svg class="iconpark-icon w-20px h-20px ml-4 color-#ababab">
          <use href="#search"></use>
        </svg>
        <input
          type="text"
          :placeholder="placeholder"
          v-model="keyword"
          @keyup.enter="search"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, defineProps, computed } from "vue";

const props = defineProps({
  title: {
    type: String,
  },
  describe: {
    type: String,
  },
  placeholder: {
    type: String,
  },
});

let keyword = ref("image-widget");

const emits = defineEmits(["search"]);

function search() {
  emits("search", keyword.value);
}
</script>

<style lang="scss" scoped>
.bg {
  position: relative;
  height: 330px;
  overflow: hidden;
  background: linear-gradient(
      99deg,
      #cee8ff,
      #cee8ff 0,
      rgba(234, 241, 242, 0) 49%,
      #ffeaea 98%,
      #ffeaea 0
    ),
    linear-gradient(
      180deg,
      #eff7ff,
      #eff7ff 0,
      rgba(255, 239, 239, 0) 100%,
      rgba(255, 239, 239, 0) 0
    ),
    #f0f6ff;

  .bg-content {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 20;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 60px 0 16px 0;

    input {
      width: calc(100% - 20px);
      height: 40px;
      padding-left: 20px;
      border-radius: 0;
      border: none;
      font-size: 16px;
      outline: unset;
      background: none;
      color: rgba(0, 0, 0, 0.75);

      &::placeholder {
        color: #ababab;
      }
    }
  }

  .bg-element {
    position: absolute;
    height: 100%;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: 50%;
    z-index: 11;
  }

  .top-left {
    left: 287.59px;
    top: -83.27px;
    width: 174.44px;
    height: 174.68px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBmaWxsPSJub25lIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxNzQuNDM4ODg4NTQ5ODA0NyIgaGVpZ2h0PSIxNzQuNjgwMTc1NzgxMjUiIHZpZXdCb3g9IjAgMCAxNzQuNDM4ODg4NTQ5ODA0NyAxNzQuNjgwMTc1NzgxMjUiPjxnIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpwYXNzdGhyb3VnaCI+PHBhdGggZD0iTTUzLjI5MzUsOS4wMDMwMUM1OC4yNjQsMC4zOTM3MzYsNjkuMjcyNiwtMi41NTYwMiw3Ny44ODE5LDIuNDE0NTVMMTY1LjQzNiw1Mi45NjM5QzE3NC4wNDUsNTcuOTM0NCwxNzYuOTk1LDY4Ljk0MywxNzIuMDI0LDc3LjU1MjNMMTIxLjE0NSwxNjUuNjc3QzExNi4xNzUsMTc0LjI4NiwxMDUuMTY2LDE3Ny4yMzYsOTYuNTU3LDE3Mi4yNjZMOS4wMDMwMSwxMjEuNzE2QzAuMzkzNzQyLDExNi43NDYsLTIuNTU2MDIsMTA1LjczNywyLjQxNDU1LDk3LjEyNzhMNTMuMjkzNSw5LjAwMzAxWiIgZmlsbD0iI0YwRjZGRiIgZmlsbC1vcGFjaXR5PSIxIi8+PC9nPjwvc3ZnPg==);
  }

  .top-right {
    right: 52px;
    top: -60px;
    width: 196.68px;
    height: 211.66px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBmaWxsPSJub25lIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxOTYuNjc3MTU0NTQxMDE1NjIiIGhlaWdodD0iMjExLjY2MDY0NDUzMTI1IiB2aWV3Qm94PSIwIDAgMTk2LjY3NzE1NDU0MTAxNTYyIDIxMS42NjA2NDQ1MzEyNSI+PGcgc3R5bGU9Im1peC1ibGVuZC1tb2RlOnBhc3N0aHJvdWdoIj48cGF0aCBkPSJNMTkyLjU0OCwxMTUuMDk2QzE5OC43ODUsMTE5LjYyMSwxOTcuNzc3LDEyOS4yMDMsMTkwLjczNSwxMzIuMzNMMTQuMDYxNCwyMTAuNzg1QzcuMDE5LDIxMy45MTIsLTAuNzY1MzgxLDIwOC4yMzUsMC4wNjA0ODU4LDIwMC41NzRMMjAuNzE4NSw4Ljk0MDM2QzIxLjU0MTksMS4zMDE2OSwzMC4zMTQsLTIuNTkzNjksMzYuNTMyOSwxLjkxNzdMMTkyLjU0OCwxMTUuMDk2WiIgZmlsbD0iI0Q2RTdGRiIgZmlsbC1vcGFjaXR5PSIwLjUiLz48L2c+PC9zdmc+);
  }

  .bottom-left {
    left: 49.63px;
    bottom: -90px;
    width: 186.03px;
    height: 186.91px;
    border-radius: 10px;
    transform: rotate(15deg);
    background: #b9d6ff;
    box-shadow: 0 4px 10px rgb(16 96 255 / 6%);
  }

  .bottom-right {
    right: 333px;
    bottom: -125px;
    width: 249px;
    height: 249px;
    border-radius: 100%;
    background: #f7e5f0;
  }
}
</style>

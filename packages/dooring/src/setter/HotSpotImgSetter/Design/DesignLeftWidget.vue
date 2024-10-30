<template>
  <div class="list">
    <div>
      <div class="design-left-list">
        <div
          class="design-left-list-item"
          v-for="(meta, index) in widgetMetaList"
          :key="index"
          :draggable="true"
          @dragstart="handleDragstart(meta)"
          @dragend="handleDragend"
        >
          <img
            v-if="meta.componentName == 'text'"
            class="w-20 mt-3"
            src="https://cdn.dancf.com/fe-assets/20231010/icon/4493fe6ba2683f3f2769dd25263687ea.svg"
          />
          <svg
            v-if="meta.componentName == 'block'"
            class="w-20 mt-3"
            role="img"
            aria-label="shape-rectangle"
            focusable="false"
            data-icon="shape-rectangle"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.5 19V5C19.5 4.72386 19.2761 4.5 19 4.5L5 4.5C4.72386 4.5 4.5 4.72386 4.5 5L4.5 19C4.5 19.2761 4.72386 19.5 5 19.5H19C19.2761 19.5 19.5 19.2761 19.5 19ZM21 5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5Z"
              fill="currentColor"
            ></path>
          </svg>
          <svg
            v-if="meta.componentName == 'image'"
            class="w-20 mt-3"
            role="img"
            aria-label="upload-image"
            focusable="false"
            data-icon="upload-image"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V11H19.5V5C19.5 4.72386 19.2761 4.5 19 4.5H5C4.72386 4.5 4.5 4.72386 4.5 5V12.9394L8.47927 8.96013L12.8993 13.0401L15.9793 9.96013L18 11.8254V13.8668L16.0208 12.0399L14.0024 14.0584L15.5088 15.4489L14.4913 16.5511L8.52085 11.0399L4.5 15.0607V19C4.5 19.2761 4.72386 19.5 5 19.5H16V21H5C3.89543 21 3 20.1046 3 19V5Z"
              fill="currentColor"
            ></path>
            <path
              d="M18.5303 16.8713L16.8107 18.591L15.75 17.5303L19.2803 14L22.8107 17.5303L21.75 18.591L20.0303 16.8713L20.0303 21.0607H18.5303V16.8713Z"
              fill="currentColor"
            ></path>
          </svg>
          <span class="text-12">{{ meta.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, toRefs } from "vue";
import { useDesignHook } from "./useDesign";

const { widgetMetaList } = toRefs(useDesignHook());
const { handleDragstart, handleDragend } = useDesignHook();
</script>

<style lang="scss" scoped>
.design-left-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .design-left-list-item {
    width: 88px;
    height: 74px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    line-height: 18px;
    background: #f1f2f4;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;

    &:hover {
      background: #e0e0e0;
    }
  }
}
</style>

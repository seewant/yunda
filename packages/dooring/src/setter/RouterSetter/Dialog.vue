<!--
 * @Description: 图片库
 * @Autor: WangYuan1
 * @Date: 2022-11-15 15:18:15
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-29 16:53:07
-->
<template>
  <el-dialog v-model="show" width="50%">
    <div class="center">
      <ul class="center-panel">
        <li
          v-for="item in typeList"
          :key="item.type"
          class="center-panel-item"
          :class="type == item.type ? 'center-panel-active' : ''"
          @click="type = item.type"
        >
          <span>{{ item.label }}</span>
        </li>
      </ul>

      <div class="center-content">
        <div>
          <div class="center-content-body">
            <WechatNavigation v-if="type == 'navigation'" v-model="model" />
            <WechatPage v-if="type == 'page'" v-model="model" />
            <QuestionnaireRoute
              v-if="type == 'questionnaire'"
              v-model="model"
            />
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { ref, provide, watch, computed } from "vue";
import WechatPage from "./WechatPage.vue";
import WechatNavigation from "./WechatNavigation.vue";
import QuestionnaireRoute from "./QuestionnaireRoute.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

// v-model 配置
const emit = defineEmits(["update:modelValue"]);
const model = useVModel(props, "modelValue", emit);

let show = ref(false);
let type = ref("");
const typeList = ref([
  {
    label: "菜单导航",
    type: "navigation",
  },
  {
    label: "搭建页面",
    type: "page",
  },
  // {
  //   label: "调查问卷",
  //   type: "questionnaire",
  // },
]);

provide("show", show);
type.value = model.value.id ? model.value.type : typeList.value[0].type;

// 打开弹窗
function open(target) {
  model.value = target;
  console.log("model.value", model.value);
  show.value = true;
}

defineExpose({ open });
</script>

<style lang="scss" scoped>
.center {
  display: flex;
  .center-panel {
    width: 210px;
    background: #f6f7f9;
    padding: 16px 8px;
    overflow: auto;
    user-select: none;
    padding-top: 40px;

    .center-panel-item {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      cursor: pointer;
      width: 194px;
      height: 36px;
      padding: 0 13px 0 30px;
      border-radius: 6px;

      &:hover {
        color: $theme-color !important;
        background: #fff;
      }

      svg {
        width: 20px;
        height: 20px;
      }

      span {
        font-weight: 700;
        font-size: 14px;
        margin-left: 9px;
      }
    }

    .center-panel-active {
      color: $theme-color;
      background: #fff;
    }
  }

  .center-content {
    flex: 1;

    .center-content-header {
      display: flex;
      align-items: center;
      height: 76px;
      padding: 0 64px 0 24px;
    }

    .center-content-body {
      height: 400px;
      padding: 0 30px;
      margin-bottom: 30px;
      overflow: auto;
    }
  }
}
</style>

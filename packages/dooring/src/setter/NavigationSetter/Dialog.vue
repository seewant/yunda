<!--
 * @Description: 图片库
 * @Autor: WangYuan1
 * @Date: 2022-11-15 15:18:15
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-09-24 11:15:14
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
            <div class="h-70 lh-70">选择导航可配置的搭建页面</div>

            <div v-for="(tree, index) in pageTree" :key="index">
              <!-- <div class="mb-15 text-15 fw-1000 c-#000">{{ tree.name }}</div> -->
              <div class="flex flex-wrap gap-20 mb-20">
                <div
                  v-for="item in tree.list"
                  :key="item.id"
                  class="h-30 lh-30 bg-#f5f5f5 pl30 pr-30 cursor-pointer hover:bg-#3662ec hover:c-#fff"
                  :class="
                    model.id == item.id
                      ? 'important-bg-#3662ec important-c-#fff'
                      : ''
                  "
                  @click="handleChoose(item)"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { ref, provide, toRefs, computed } from "vue";
import { useWechatStore } from "@/store/wechat";

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
const { wechat } = toRefs(useWechatStore());
const typeList = ref([
  {
    label: "搭建页面",
    type: "page",
  },
]);

const pageTree = computed(() => {
  return [
    {
      name: "搭建页面",
      list: [
        ...wechat.value.pageList.map((item) => {
          return {
            name: item.name,
            id: item.id,
            type: "page",
          };
        }),
        {
          name: "我的",
          id: "my",
          type: "page",
        },
      ],
    },
  ];
});

provide("show", show);
type.value = model.value.id ? model.value.type : typeList.value[0].type;

// 打开弹窗
function open(target) {
  model.value = target;
  console.log("model.value", model.value);
  show.value = true;
}

function handleChoose(item) {
  model.value = item;
  show.value = false;
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

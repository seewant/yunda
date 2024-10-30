<!--
 * @Description: 列表控件
 * @Autor: WangYuan1
 * @Date: 2022-10-18 10:45:43
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-31 17:00:02
-->
<template>
  <SetterItem :title="props?.schema?.title" :aloneTitle="true">
    {{ model }}
    <!-- {{ props?.schema }} -->
    <!-- {{ props.widget.children }} -->
    <div class="array-setter">
      <div class="array-setter-body">
        <!-- 渲染模式，根据schema子类遍历数组渲染单项设置器 -->
        <ul>
          <li
            v-for="(item, index) in model.list"
            :key="index"
            class="array-setter-item"
          >
            <StringSetter
              v-model="item.name"
              :schema="{ title: '标签' }"
            ></StringSetter>
            <div class="array-setter-item-delete" @click="delItem(item.id)">
              x
            </div>
          </li>
        </ul>

        <!-- 新增单项 -->
        <div class="array-setter-item-add" @click="addItem">新增标签</div>
      </div>
    </div>
  </SetterItem>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { createId, cloneDeep } from "@design/utils";
import { initTabPanelWidgetModel } from "@design/utils";
import SetterItem from "@/components/SetterItem/index.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: {
      activeId: "",
      list: [],
    },
  },
  // 当前是否属性面板设计中
  inDesign: {
    type: Boolean,
    default: false,
  },
  schema: {
    type: Array,
    default: (): any => {},
  },

  widget: {
    type: Object,
    default: (): any => {},
  },
});

// v-model 配置
const emit = defineEmits(["update:modelValue"]);
const model = useVModel(props, "modelValue", emit);

// 新增单项
function addItem() {
  let newTab = {
    id: createId(2),
    name: "标签",
  };
  model.value.list.push(newTab);

  // 新增Tab单项同时，为Tab物料子类增加TabPanelWidget(单个Tab面板物料)
  console.log("props.widget", props.widget);
  props.widget.children.push({
    componentName: "ItemInTabsWidget",
    id: createId(8),
    isPrivate: true,
    props: cloneDeep({ tabId: newTab.id }),
    children: [],
  });
}

// 删除单项
function delItem(id: String) {
  let i = model.value.list.findIndex((item) => item.id == id);
  model.value.list.splice(i, 1);

  // 删除Tab单项同时，删除物料数据对应TabPanelWidget(单个Tab面板物料)数据
  if (!props.inDesign) {
    // let i = props.widget.children.findIndex((item) => item.props.id == id);
    props.widget.children.splice(i, 1);
  }
}
</script>

<style lang="scss" scoped>
.array-setter {
  padding: 10px 0;

  .array-setter-body {
    background: #f7f8fa;
    padding: 10px;

    .array-setter-remark {
      color: #969799;
      font-size: 12px;
      margin-bottom: 10px;
    }
    .array-setter-item {
      position: relative;
      margin-bottom: 10px;
      border-radius: 2px;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      .array-setter-item-delete {
        display: none;
        position: absolute;
        top: -7px;
        right: -7px;
        width: 16px;
        height: 16px;
        line-height: 16px;
        border-radius: 50%;
        background: #b3b3b3;
        color: #fff;
        font-size: 14px;
        text-align: center;
        z-index: 4;
        cursor: pointer;
      }

      &:hover {
        .array-setter-item-delete {
          display: block;
        }
      }
    }

    .array-setter-item-add {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 12px;
      padding: 9px 16px;
      border: 1px solid $theme-color;
      border-radius: 2px;
      background: #fff;
      color: $theme-color;
      font-size: 14px;
      line-height: 20px;
      cursor: pointer;
    }
  }
}

.array-design {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

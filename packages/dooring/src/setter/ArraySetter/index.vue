<!--
 * @Description: 列表控件
 * @Autor: WangYuan1
 * @Date: 2022-10-18 10:45:43
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-17 14:54:35
-->
<template>
  <SetterItem :title="props?.schema?.title" :aloneTitle="true">
    <template v-slot:header>
      <!-- 新增单项 -->
      <div
        v-if="schema?.setter?.props?.allowCreate == false ? false : true"
        class="add flex-center"
        @click="addItem"
      >
        <iconpark-icon
          name="plus"
          class="w-18 h-18 color-#929292"
        ></iconpark-icon>
      </div>
    </template>
    <div class="array-setter">
      <div class="array-setter-body">
        <ul>
          <li
            v-for="(item, index) in model"
            :key="index"
            class="array-setter-item"
          >
            <div
              v-for="(prop, index) in schema?.setter?.props?.items"
              :key="index"
            >
              <component
                :is="prop?.setter?.componentName"
                v-model="item[prop?.name]"
                :schema="prop"
                :project="project"
              >
              </component>
              <div
                v-if="
                  schema?.setter?.props?.allowDelete == false ? false : true
                "
                class="array-setter-item-delete"
                @click="delItem(item.id)"
              >
                x
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </SetterItem>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useVModel } from "@vueuse/core";
import SetterItem from "@/components/SetterItem/index.vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  schema: {
    type: Array,
    default: (): any => {
      return {
        // props: {
        //   allowDelete: true,
        //   allowCreate: true,
        //   items: [],
        // },
      };
    },
  },
  project: {
    type: Object,
    default: () => {},
  },
});

// v-model 配置
const emit = defineEmits(["update:modelValue"]);
const model = useVModel(props, "modelValue", emit);

// 新增单项
function addItem() {
  console.log("新增单项.........");
  console.log("getItemModel()", getItemModel());
  console.log("model.value", model.value);
  model.value.push(getItemModel());
}

// 删除单项
function delItem(id: String) {
  let i = model.value.findIndex((item) => item.id == id);
  model.value.splice(i, 1);
}

// 获取默认单项对象值
function getItemModel() {
  return props.schema?.setter?.props.items.reduce(
    (pre: any, cur: any) => {
      pre[cur.name] = cur.defaultValue;
      return pre;
    },
    { id: String(Math.floor(Math.random() * 10000)) }
  );
}
</script>

<style lang="scss" scoped>
.add {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
}
.array-setter {
  padding: 10px 0;

  .array-setter-body {
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

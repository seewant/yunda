<!--
 * @Description: Number控件
 * @Autor: WangYuan1
 * @Date: 2022-10-18 10:45:43
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-13 14:38:25
-->
<template>
  <SetterItem v-show="condition" :title="props?.schema?.title" >
    <div class="setter">
      <div class="setter-sliding flex-center" @mousedown="start">N</div>
      <span v-if="setter.draging" class="setter-input">{{ setter.val }}</span>
      <input
        v-else
        class="setter-input"
        type="text"
        v-model="setter.val"
        @click="selectText"
        @blur="getComplianceValue(setter.val)"
      />
      {{ setter.val }}
    </div>
  </SetterItem>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, onBeforeUnmount, watch } from "vue";
import { useVModel } from "@vueuse/core";
import { useSetterHook } from "@/hooks/useSetter";
import SetterItem from "@/components/SetterItem/index.vue";

const props = defineProps({
  modelValue: {
    type: Number,
  },
  widget: {
    type: Object,
    default: () => {},
  },
  schema: {
    type: Object,
    default: () => {},
  },
});

const { condition } = useSetterHook(props);

const setter = reactive({
  min: 0,
  max: 9999,
  val: 0,
  location: 0,
  draging: false,
});

// v-model 配置
const emit = defineEmits(["update:modelValue"]);
const model = useVModel(props, "modelValue", emit);

onBeforeMount(() => {
  // setter.val = props.modelValue;
  if (props.schema?.setter?.min) setter.min = props.schema?.setter?.min;
  if (props.schema?.setter?.max) setter.max = props.schema?.setter?.max;
});

watch(
  () => props.modelValue,
  () => {
    setter.val = props.modelValue;
  },
  { immediate: true }
);

// 监听鼠标移动
window.addEventListener("mousemove", move);

// 监听鼠标抬起
window.addEventListener("mouseup", end);

// 鼠标按下
function start(e: any) {
  if (nonComplianceValue(setter.val)) return;

  const { screenX: location } = e;
  setter.location = location;
  setter.draging = true;

  // 调整大小开始，修改为移动鼠标样式
  const body = document.querySelector("body");
  body.style.cursor =
    "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAoZJREFUWEftlM9r2mAYx5+YLKbZKFpXEUFoDp04dxg0ICITA4MSd4r7dXQSPfWwQ2HrXbZB/wNv4g7CYH/BaCkooiBUMkVoLwVPukMmm24ysownmFGGJsIKveS9ePB5v9/P+32ePARc8yGu2R8cACcBJwEnAbsE8H9qvqw0APhtsbiIVCpFnpyc4B2sw3rbYwVAAgADAGy/33+4tbV1p9frveV5/tcS1RsAcOv09DQZDofj1Wr1jSzL3+wIlgGg+RoAeOr1+lOO4w4xCYZh7vl8vv4CUdTBet94PK4Oh8M4x3GfKpXKYzuIRQB/zRVF2fN4PAeSJEG5XAZVVVPJZFJZ8io3AGyoqlrJ5/M72WwWRFE0Ib4DgL7o3r8ArvlLvN1ud299fd0wHwwGcHR0BNFodKLr+tLe6rpOkCS5JkkS1Wq1oFQqGRDHx8fS7u7uZBUA7KOn3W7Lfr//nWmOF1mWBYoy59G6s5PJBDRNA5IkDYh0Ov2BoqjnKwO0Wq0XgUDgMJPJGK/Hs7m5CQyDM2l/RqMRzGYzo7BYLEKhUPjocrmerAJgtmDj/Pz8NU3TeyYEtiASiXwBgJ8YNUEQ+uVfFNc0zUXTtC+TybgbjYZhLstyo9PppHmeH68CgDXmECLEKxMCh3A6nSZjsdiiIcRZwni8qqq+z+VyO6IoGua1Wu2RIAhovtIQmpCYBIuCZ2dn+263+yX2n2XZ+16v9/MlMTRGYfMzvI2fYafTiScSCdP8q1XTVllENy8uLp4Fg8G7w+FwPxQK/VgiSOMiUhRF3N7eftBsNg8EQbA0Rx27VYxJYEuMFtut4nkt3sHa/17F9uN+BRV2CVyBhbWEA+Ak4CTgJPAHcmHjIWSFoCcAAAAASUVORK5CYII=) 15 15 , auto";
}

// 鼠标移动
function move(e: any) {
  if (!setter.draging) return;

  if (nonComplianceValue(setter.val)) return;

  let val = Number(setter.val);
  let differ = e.screenX - setter.location;
  // 更新上一次位置
  setter.location = e.screenX;

  // 到达最小值且还要减小
  if (val == setter.min && differ < 0) return;

  // 到达最大值且还要增加
  if (val >= setter.max && differ > 0) return;

  let temp = val + differ;
  if (temp < setter.min) temp = setter.min;
  if (temp > setter.max) temp = setter.max;

  setter.val = temp;
}

// 鼠标抬起
function end(e: any) {
  if (nonComplianceValue(setter.val)) return;

  setter.draging = false;
  setter.val = getComplianceValue(setter.val);
  model.value = setter.val;

  // 调整大小结束，恢复默认鼠标样式
  const body = document.querySelector("body");
  body.style.cursor = "default";
}

// 单击选中输入框文本
function selectText(e) {
  e.currentTarget.select();
}

// 获取符合规则的值
function getComplianceValue(val) {
  // 如果值为空或非数字字符串，则重置为上一次的值
  if (nonComplianceValue(val)) {
    setter.val = model.value;
    return model.value;
  }

  if (val < setter.min) {
    setter.val = setter.min;
    return setter.min;
  }
  if (val > setter.max) {
    setter.val = setter.max;
    return setter.max;
  }

  return val;
}

// 判断是否是不符合规则的值（空字符串/非数字字符串）
function nonComplianceValue(str) {
  if (str === "") return true;

  const reg = /^[0-9]+.?[0-9]*$/;
  return !reg.test(str);
}

// 组件销毁前停止监听
onBeforeUnmount(() => {
  window.removeEventListener("mousemove", move);
  window.removeEventListener("mouseup", end);
});
</script>

<style lang="scss" scoped>
// 重置 el-input-number
::v-deep .el-input-number {
  height: 33px !important;
  .el-input {
    width: 100px;
  }
  .el-input__wrapper {
    padding: 0 !important;
    background: transparent;
    box-shadow: 0 0 0 0 transparent;

    input {
      text-align: left;
      font-size: 12px;
    }
  }
}
.setter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  padding: 0 18px 0 8px;
  border-radius: 6px;
  background: #f0f0f0;
  color: #6b6d6b;
  font-size: 12px;
  user-select: none;

  &:focus-within {
    box-shadow: 0 0 0 2px $theme-color !important;
  }

  .setter-sliding {
    width: 14px;
    height: 14px;
    user-select: none;
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAoZJREFUWEftlM9r2mAYx5+YLKbZKFpXEUFoDp04dxg0ICITA4MSd4r7dXQSPfWwQ2HrXbZB/wNv4g7CYH/BaCkooiBUMkVoLwVPukMmm24ysownmFGGJsIKveS9ePB5v9/P+32ePARc8yGu2R8cACcBJwEnAbsE8H9qvqw0APhtsbiIVCpFnpyc4B2sw3rbYwVAAgADAGy/33+4tbV1p9frveV5/tcS1RsAcOv09DQZDofj1Wr1jSzL3+wIlgGg+RoAeOr1+lOO4w4xCYZh7vl8vv4CUdTBet94PK4Oh8M4x3GfKpXKYzuIRQB/zRVF2fN4PAeSJEG5XAZVVVPJZFJZ8io3AGyoqlrJ5/M72WwWRFE0Ib4DgL7o3r8ArvlLvN1ud299fd0wHwwGcHR0BNFodKLr+tLe6rpOkCS5JkkS1Wq1oFQqGRDHx8fS7u7uZBUA7KOn3W7Lfr//nWmOF1mWBYoy59G6s5PJBDRNA5IkDYh0Ov2BoqjnKwO0Wq0XgUDgMJPJGK/Hs7m5CQyDM2l/RqMRzGYzo7BYLEKhUPjocrmerAJgtmDj/Pz8NU3TeyYEtiASiXwBgJ8YNUEQ+uVfFNc0zUXTtC+TybgbjYZhLstyo9PppHmeH68CgDXmECLEKxMCh3A6nSZjsdiiIcRZwni8qqq+z+VyO6IoGua1Wu2RIAhovtIQmpCYBIuCZ2dn+263+yX2n2XZ+16v9/MlMTRGYfMzvI2fYafTiScSCdP8q1XTVllENy8uLp4Fg8G7w+FwPxQK/VgiSOMiUhRF3N7eftBsNg8EQbA0Rx27VYxJYEuMFtut4nkt3sHa/17F9uN+BRV2CVyBhbWEA+Ak4CTgJPAHcmHjIWSFoCcAAAAASUVORK5CYII=)
        15 15,
      auto !important;
  }
  .setter-input {
    width: 100%;
    margin-left: 8px;
    padding: 0;
    border: 0;
    color: 0;
    outline: none;
    list-style: none;
    font-family: inherit;
    background: transparent;
    user-select: none;
    font-size: 12px;
    color: #333333;
  }
}
</style>

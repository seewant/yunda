<template>
  <div class="cube">
    <!-- 布局容器 -->
    <ul v-for="y in model.row" :key="y" class="cube-container">
      <li
        v-for="x in model.col"
        :key="mergeKey(y, x)"
        :data-key="mergeKey(y, x)"
        :data-y="y"
        :data-x="x"
        class="wrap-item flex-center"
        :class="[editKeys.includes(mergeKey(y, x)) ? 'move-wrap' : '']"
        :style="{ width: `${cellWidth}px`, height: `${cellWidth}px` }"
        @click="clickWrap"
        @mouseover="move"
      >
        <!-- <span class="text-24">+</span> -->
      </li>
    </ul>

    <!-- 编辑容器块 -->
    <div
      v-for="(item, index) in model.cubeList"
      :key="index"
      class="edit-wrap flex-column flex-center"
      :class="[cuurIndex === index ? 'edit-wrap-active' : '']"
      :style="getStyle(item)"
      @click="clickItem(index)"
    >
      <div
        v-show="mode === 'custom'"
        class="edit-wrap-close"
        @click.stop="deleteEditWrap(index)"
      >
        <span>x</span>
      </div>
      <div class="text-12px text-center">
        <div v-if="model.row == 1">宽度{{ showWrapUnit(item.width) }}像素</div>
        <div v-else-if="model.row > 5" class="text-9">
          {{ showWrapUnit(item.width) }} x{{ showWrapUnit(item.height) }}
        </div>
        <div v-else>
          <div class="mb-3">
            {{ showWrapUnit(item.width) }}
            x{{ showWrapUnit(item.height) }}
          </div>
          <div>或同等比例</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, watchEffect, computed } from "vue";
import { useVModel } from "@vueuse/core";
import lodash from "lodash-es";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  mode: {
    type: String,
  },
});

// v-model 配置
const emit = defineEmits(["update:modelValue", "choose"]);
const model = useVModel(props, "modelValue", emit);

const startKey = ref(0);
const cuurIndex = ref(-1);
const edit = ref(false);
const editKeys = ref([]);

const cellWidth = computed(() => 300 / model.value.col);

const clickWrap = (e) => {
  if (!edit.value) {
    let key = e.target.dataset.key;
    console.log("e.target.dataset.key", e.target.dataset.key);
    editKeys.value.push(Number(key));
    console.log("key：", key);
    startKey.value = key;
    edit.value = true;
  } else {
    let keys = lodash.sortBy(editKeys.value);
    let start = splitKey(keys[0]);
    let end = splitKey(keys[keys.length - 1]);

    let temp = {
      top: start.y,
      left: start.x,
      bottom: end.y + 1,
      right: end.x + 1,
      height: end.y - start.y + 1,
      width: end.x - start.x + 1,
      image: "",
    };

    console.log("temp", temp);
    model.value.cubeList.push(temp);
    cuurIndex.value = model.value.cubeList.length - 1;

    editKeys.value = [];
    edit.value = false;

    emit("choose", cuurIndex.value);
  }
};

const move = (e) => {
  if (!edit.value) return;

  let keys = [];
  let start = splitKey(startKey.value);
  let end = splitKey(e.target.dataset.key);
  let ys = lodash.sortBy([start.y, end.y]);
  let xs = lodash.sortBy([start.x, end.x]);

  if (antiCollision(start, end)) {
    return;
  }

  for (let i = ys[0]; i <= ys[1]; i++) {
    for (let j = xs[0]; j <= xs[1]; j++) {
      keys.push(mergeKey(i, j));
    }
  }

  editKeys.value = keys;
};

const antiCollision = (start, end) => {
  let result = false;

  lodash.cloneDeep(model.value.cubeList).map((item) => {
    --item.bottom;
    --item.right;

    if (
      isIntersection(lodash.sortBy([start.x, end.x]), [item.left, item.right])
    ) {
      if (start.y < item.top && end.y >= item.top) {
        result = true;
      }
      if (start.y > item.bottom && end.y <= item.bottom) {
        result = true;
      }
    }

    if (
      isIntersection(lodash.sortBy([start.y, end.y]), [item.top, item.bottom])
    ) {
      if (start.x < item.left && end.x >= item.left) {
        result = true;
      }
      if (start.x > item.right && end.x <= item.right) {
        result = true;
      }
    }
  });

  return result;
};

const mergeKey = (y, x) => {
  return Number(x + y * 10);
};

const splitKey = (key) => {
  if (key >= 10) {
    return { y: parseInt((key % 100) / 10), x: key % 10 };
  } else {
    return { y: 0, x: Number(key) };
  }
};

const getStyle = (style) => {
  console.log("执行getStyle");
  let result = {
    top: `${(style.top - 1) * cellWidth.value}px`,
    left: `${(style.left - 1) * cellWidth.value}px`,
    width: `${style.width * cellWidth.value}px`,
    height: `${style.height * cellWidth.value}px`,
  };

  return result;
};

function showWrapUnit(num) {
  return Math.floor(num * cellWidth.value * 2.5);
}

const isIntersection = (arrA, arrB) => {
  var max = [arrA[0], arrB[0]];
  var min = [arrA[1], arrB[1]];

  if (Math.max.apply(null, max) <= Math.min.apply(null, min)) {
    return true;
  }

  return false;
};

const deleteEditWrap = (index) => {
  model.value.cubeList.splice(index, 1);
  cuurIndex.value = model.value.cubeList.length - 1;
};

const clickItem = (index) => {
  cuurIndex.value = index;
  emit("choose", index);
};

// 重置容器
function reset() {
  cuurIndex.value = -1;
  edit.value = false;
}

defineExpose({ reset });
</script>

<style lang="scss" scoped>
.cube {
  position: relative;
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
  margin-bottom: 20px;
  width: 300px;

  .cube-container {
    display: flex;
  }

  .wrap-item {
    background: #f8f8f8;
    border-bottom: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
    color: #bbb;
    cursor: pointer;

    i {
      pointer-events: none;
    }
  }

  .move-wrap {
    background: #e0edff;

    i {
      display: none;
    }
  }

  .edit-wrap {
    position: absolute;
    background-color: #fff;
    border: 1px solid #ebedf0;
    font-size: 10px;
    color: #7d7e80;
    z-index: 2;
    cursor: pointer;

    .edit-wrap-close {
      display: none;
      position: absolute;
      top: -8px;
      right: -8px;
      width: 16px;
      height: 16px;
      line-height: 16px;
      border-radius: 50%;
      background: #b3b3b3;
      color: #fff;
      font-size: 14px;
      text-align: center;
      z-index: 4;
    }
  }

  .edit-wrap-active {
    background: #e0edff;
    border: 1px solid #155bd4;
    color: #155bd4;
    z-index: 5;

    &:hover {
      .edit-wrap-close {
        display: block;
      }
    }
  }
}
</style>

<template>
  <div class="root">
    <div class="container">
      <button @click="handleGroup">组合</button>
      &nbsp;
      <button @click="handleUnGroup">取消组合</button>
      <Moveable
        ref="moveableRef"
        :draggable="true"
        :rotatable="true"
        :scalable="true"
        :target="targets"
        @drag="onDrag"
        @dragGroup="onDragGroup"
        @dragGroupEnd="onDragGroupEnd"
        @renderGroup="onRenderGroup"
        @clickGroup="onClickGroup"
      ></Moveable>
      <Selecto
        ref="selectoRef"
        :dragContainer="window"
        :selectableTargets="['.selecto-area .widget']"
        :hitRate="0"
        :selectByClick="false"
        :selectFromInside="false"
        :toggleContinueSelect="['shift']"
        :ratio="0"
        @dragStart="onDragStart"
        @select="onSelect"
      ></Selecto>
      <div class="elements selecto-area relative ml-10 mt-10 h-300 bg-#fff">
        <div
          class="widget"
          ref="targetRefs"
          v-for="(widget, index) in widgets"
          :key="index"
          :id="widget.id"
          :style="{
            left: `${widget.left}px`,
            top: `${widget.top}px`,
            width: `${widget.width}px`,
            height: `${widget.height}px`,
          }"
        >
          {{ widget.id }}
        </div>
      </div>
      <div class="empty elements"></div>
    </div>
    <div>{{ widgets }}</div>
    <div>{{ targets }}</div>
    <div>{{ holdGroupWidget }}</div>
  </div>
</template>

<script setup lang="ts">
import { deepFlat } from "@daybrush/utils";
import Selecto from "vue3-selecto";
import Moveable from "vue3-moveable";
import { GroupManager } from "@moveable/helper";
import { ref, onMounted } from "vue";
import { createId, cloneDeep } from "@design/utils";

const holdGroupWidget = ref({});
const groupManager = new GroupManager([]);
const targets = ref([]);
const moveableRef = ref<InstanceType<typeof Moveable>>();
const selectoRef = ref<InstanceType<typeof Selecto>>();

const widgets = ref([
  { id: "001", left: 0, top: 0, width: 100, height: 100 },
  { id: "002", left: 100, top: 0, width: 100, height: 100 },
  { id: "003", left: 200, top: 0, width: 100, height: 100 },
  { id: "004", left: 300, top: 0, width: 100, height: 100 },
  { id: "005", left: 400, top: 0, width: 100, height: 100 },
  { id: "006", left: 500, top: 0, width: 100, height: 100 },
  { id: "007", left: 600, top: 0, width: 100, height: 100 },
]);

const setSelectedTargets = (nextTargets) => {
  selectoRef.value.setSelectedTargets(deepFlat(nextTargets));
  targets.value = nextTargets;
};

// 组合物料
const handleGroup = () => {
  const nextGroup = groupManager.group(targets.value, true);

  // 组合内每个物料标记group
  nextGroup.map((ele) => {
    const widget = widgets.value.find((widget) => widget.id === ele.id);
    widget.group = `group_${createId()}`;
  });

  if (nextGroup) {
    targets.value = nextGroup;
  }
};

// 取消组合物料
const handleUnGroup = () => {
  const nextGroup = groupManager.ungroup(targets.value);

  // 组合内每个物料删除标记group
  nextGroup.map((ele) => {
    const widget = widgets.value.find((widget) => widget.id === ele.id);
    delete widget.group;
  });

  if (nextGroup) {
    targets.value = nextGroup;
  }
};

// 拖拽目标物料
const onDrag = (e) => {
  const widget = widgets.value.find((widget) => widget.id === e.target.id);
  if (widget) {
    e.target!.style.left = `${e.left}px`;
    e.target!.style.top = `${e.top}px`;
    widget.top = e.top;
    widget.left = e.left;
  }
};

// 组合物料拖拽中
const onDragGroup = (e) => {
  e.inputEvent.stopPropagation();
  e.inputEvent.preventDefault();
  const events = e.events;

  events.map((ev) => {
    const widget = widgets.value.find((widget) => widget.id === ev.target.id);
    console.log("ev", ev);
    const left = Number(widget?.left) + ev.beforeTranslate[0];
    const top = Number(widget?.top) + ev.beforeTranslate[1];
    // const left = Number(widget?.left) + ev.left;
    // const top = Number(widget?.top) + ev.top;

    // ev.target.style.left = `${left}px`;
    // ev.target.style.top = `${top}px`;

    // widget.left = left;
    // widget.top = top;

    console.log("holdGroupWidget.value", holdGroupWidget.value);
    holdGroupWidget.value[ev.target.id] = {
      left: left,
      top: top,
    };
  });
  console.log("holdGroupWidget", holdGroupWidget);
};

// 组合物料拖拽完成
const onDragGroupEnd = (e) => {
  // e.stopPropagation();
  // e.preventDefault();

  console.log("组合物料拖拽完成", e.events);

  console.log("holdGroupWidget.value", holdGroupWidget.value);
  for (const key in holdGroupWidget.value) {
    const widget = widgets.value.find((widget) => widget.id === key);
    widget.left = holdGroupWidget.value[key].left;
    widget.top = holdGroupWidget.value[key].top;

    const ele = e.events.find((ev) => ev.target.id === key);
    console.log("ele", ele);
    // delete ele.target.style.transform
    ele.target.style.transform = "none";
  }
  holdGroupWidget.value = {};
};

const onRenderGroup = (e) => {
  e.events.forEach((ev) => {
    ev.target.style.cssText += ev.cssText;
  });
};

const onClickGroup = (e) => {
  if (!e.moveableTarget) {
    setSelectedTargets([]);
    return;
  }
  if (e.isDouble) {
    const childs = groupManager.selectSubChilds(
      targets.value,
      e.moveableTarget
    );
    setSelectedTargets(childs.targets());
    return;
  }
  if (e.isTrusted) {
    selectoRef.value.clickTarget(e.inputEvent, e.moveableTarget);
  }
};

const onDragStart = (e) => {
  console.log("开始拖拽");
  console.log("e", e);
  const moveable = moveableRef.value;
  const target = e.inputEvent.target;
  console.log('target', target);
  const flatted = deepFlat(targets.value);
  if (
    target.tagName === "BUTTON" ||
    moveable.isMoveableElement(target) ||
    flatted.some((t) => t === target || t.contains(target))
  ) {
    e.stop();
  }
  e.data.startTargets = targets.value;
};

const onSelect = (e) => {
  console.log("选择拖拽数据");
  console.log("e", e);
  const { startAdded, startRemoved, isDragStartEnd } = e;
  if (isDragStartEnd) {
    return;
  }
  const nextChilds = groupManager.selectSameDepthChilds(
    e.data.startTargets,
    startAdded,
    startRemoved
  );
  setSelectedTargets(nextChilds.targets());
};

const onSelectEnd = (e) => {
  console.log("完成拖拽");
  console.log("e", e);
  const { isDragStartEnd, isClick, added, removed, inputEvent } = e;
  const moveable = moveableRef.value;
  if (isDragStartEnd) {
    inputEvent.preventDefault();
    moveable.waitToChangeTarget().then(() => {
      moveable.dragStart(inputEvent);
    });
  }
  let nextChilds;
  if (isDragStartEnd || isClick) {
    nextChilds = groupManager.selectCompletedChilds(
      e.data.startTargets,
      added,
      removed
    );
  } else {
    nextChilds = groupManager.selectSameDepthChilds(
      e.data.startTargets,
      added,
      removed
    );
  }
  e.currentTarget.setSelectedTargets(nextChilds.flatten());
  setSelectedTargets(nextChilds.targets());
};

onMounted(() => {
  const elements = selectoRef.value.getSelectableElements();
  groupManager.set([], elements);
});
</script>

<style scoped>
.root {
  position: relative;
}

.container {
  position: relative;
  margin-top: 50px;
}

.will-change-container {
  padding-left: 100px;
  padding-top: 100px;
  will-change: transform;
}

.will-change-target {
  position: relative;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background: #ee8;
  color: #333;
  font-weight: bold;
  border: 1px solid #333;
  box-sizing: border-box;
}

.target {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 150px;
  left: 100px;
  line-height: 100px;
  text-align: center;
  background: #ee8;
  color: #333;
  font-weight: bold;
  border: 1px solid #333;
  box-sizing: border-box;
}

.target1 {
  left: 120px;
  top: 120px;
}

.target2 {
  left: 300px;
  top: 140px;
}

.target3 {
  left: 180px;
  top: 250px;
}

.nested {
  position: absolute;
  border: 4px solid #ccc;
  width: 100px;
  height: 100px;
  top: 50px;
  left: 70px;
  color: #333;
  /* box-sizing: border-box; */
}

.nested.first {
  top: 150px;
}

.nested.rotate {
  transform-origin: 0 0;
  transform: rotate(-30deg);
}

.nested.scale {
  transform: scale(1.5, 1.5);
}

.nested .target {
  top: 50px;
  left: 50px;
}

.cube {
  display: inline-block;
  border-radius: 5px;
  width: 40px;
  height: 40px;
  margin: 4px;
  background: #eee;
  --color: #4af;
  color: #333;
  line-height: 40px;
  text-align: center;
}

.cube .cube {
  background: #ddd;
  margin-left: 20px;
}

.widget {
  position: absolute;
  line-height: 100px;
  text-align: center;
  background: #ee8;
  color: #333;
  font-weight: bold;
  border: 1px solid #333;
  box-sizing: border-box;
}
</style>

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
        @renderGroup="onRenderGroup"
        @clickGroup="onClickGroup"
      ></Moveable>
      <Selecto
        ref="selectoRef"
        :dragContainer="window"
        :selectableTargets="['.selecto-area .cube']"
        :hitRate="0"
        :selectByClick="true"
        :selectFromInside="false"
        :toggleContinueSelect="['shift']"
        :ratio="0"
        @dragStart="onDragStart"
        @select="onSelect"
        @selectEnd="onSelectEnd"
      ></Selecto>
      <div class="elements selecto-area relative ml-10 mt-10 h-300 bg-#fff">
        <div
          class="cube"
          ref="targetRefs"
          v-for="(cube, index) in cubes"
          :key="index"
          :style="{
            left: `${cube.x}px`,
            top: `${cube.y}px`,
            width: `${cube.width}px`,
            height: `${cube.height}px`,
          }"
        >
          {{ cube.id }}
        </div>
      </div>
      <div class="empty elements"></div>
    </div>
    <div>{{ cubes }}</div>
    <div>{{ targets }}</div>
  </div>
</template>

<script setup lang="ts">
import { deepFlat } from "@daybrush/utils";
import Selecto from "vue3-selecto";
import Moveable from "vue3-moveable";
import { GroupManager } from "@moveable/helper";
import { ref, onMounted } from "vue";

const groupManager = new GroupManager([]);
const targets = ref([]);
const moveableRef = ref<InstanceType<typeof Moveable>>();
const selectoRef = ref<InstanceType<typeof Selecto>>();

const cubes = ref([
  { id: "001", x: 0, y: 0, width: 100, height: 100 },
  { id: "002", x: 100, y: 0, width: 100, height: 100 },
  { id: "003", x: 200, y: 0, width: 100, height: 100 },
  { id: "004", x: 300, y: 0, width: 100, height: 100 },
  { id: "005", x: 400, y: 0, width: 100, height: 100 },
  { id: "006", x: 500, y: 0, width: 100, height: 100 },
  { id: "007", x: 600, y: 0, width: 100, height: 100 },
]);

const setSelectedTargets = (nextTargetes) => {
  selectoRef.value.setSelectedTargets(deepFlat(nextTargetes));
  targets.value = nextTargetes;
};

const handleGroup = () => {
  const nextGroup = groupManager.group(targets.value, true);

  if (nextGroup) {
    targets.value = nextGroup;
  }
};

const handleUnGroup = () => {
  const nextGroup = groupManager.ungroup(targets.value);
  if (nextGroup) {
    targets.value = nextGroup;
  }
};

const onDrag = (e) => {
  e.target.style.transform = e.transform;
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
  const moveable = moveableRef.value;
  const target = e.inputEvent.target;
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
</style>

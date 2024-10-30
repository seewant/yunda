/*
 * @Description:
 * @Autor: WangYuan1
 * @Date: 2023-12-22 14:58:26
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-11 17:56:35
 */
import { ref, reactive } from "vue";
import { createId, cloneDeep } from "@design/utils";

let widgetList = ref([]);
let widgetMetaList = ref([]);
let currentWidget = ref(null);
let currentWidgetMeta = ref(null);

const drag = ref({
  x: 0,
  y: 0,
  status: false,
  widgetMeta: null,
});

const canvas = ref({
  width: 400,
  height: 400,
  background: "",
});

registerWidgetMeta();

// 注册物料meta
function registerWidgetMeta() {
  const modules: any = import.meta.globEager("./WigetMetas/*.ts");
  console.log("注册物料meta:", modules);
  for (const key in modules) {
    widgetMetaList.value.push(modules[key]?.default);
  }
}

// 开始拖拽
function handleDragstart(meta) {
  console.log("meta", meta);
  drag.value.status = true;
  drag.value.widgetMeta = meta;
}

// 拖拽完成,生成物料
function handleDragend(e: any) {
  drag.value.status = false;
  let { componentName, sign, title, w, h } = drag.value.widgetMeta;
  let cengetX = drag.value.x - w / 2;
  let cengetY = drag.value.y - h / 2;
  let minX = w / 2;
  let minY = h / 2;
  let maxX = canvas.value.width - w;
  let maxy = canvas.value.height - h;

  let widget = {
    id: createId(8),
    componentName,
    title,
    sign,
    w,
    h,
    // x:drag.value.x,
    // y:drag.value.y,
    x: cengetX > maxX ? maxX : cengetX < minX ? 0 : cengetX,
    y: cengetY > maxy ? maxy : cengetY < minY ? 0 : cengetY,
    props: {},
  };

  // 遍历props属性
  drag.value.widgetMeta.props.forEach((prop) => {
    let { name, defaultValue } = prop;
    widget.props[name] = cloneDeep(defaultValue);
  });

  console.log("拖拽完成", widget);
  widgetList.value?.push(widget);
}

// 设置当前物料
function handleCurrentWidget(widget: any) {
  currentWidget.value = widget;
  currentWidgetMeta.value = widgetMetaList.value.find(
    (meta) => meta.componentName === widget.componentName
  );
}

function handletDeleteWidget(widget) {
  let i = widgetList.value?.findIndex((item) => item.id == widget.id);
  widgetList.value?.splice(i, 1);
}

function handletCopyWidget(widget) {
  widgetList.value?.push({
    ...widget,
    ...{
      id: createId(8),
      x: Number(widget.x) + 5,
      y: Number(widget.y) + 5,
    },
  });
}
export const useDesignHook = () => ({
  drag,
  canvas,
  currentWidget,
  currentWidgetMeta,
  widgetList,
  widgetMetaList,
  handleDragstart,
  handleDragend,
  handleCurrentWidget,
  handletDeleteWidget,
  handletCopyWidget,
});

/*
 * @Description: 物料hook
 * @Autor: WangYuan1
 * @Date: 2024-01-17 15:39:13
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-10 16:02:04
 */
import { ref, watch } from "vue";
import { createId, cloneDeep } from "@design/utils";

// 当前操作物料
let currentWidget = ref({});

// 物料列表
let widgetList = ref([]);

let configure = ref({});

// 移动鼠标，触发hover的物料id
let hoverWidgetId = ref("");
let hoverWidgetIsTop = ref(false);

// 拖拽物料状态对象
let drag = ref({
  type: "",
  id: "",
  widgetMeta: null,
  status: false, // 是否在推拽中
});

// 预览数据
let previewData = ref({});

// 预览产品
let previewProduct = ref({});

// 预览产品单页
let previewProductPage = ref({});

// 预览表单
let previewForm = ref({});

// iframe通信
window.addEventListener("message", (e) => {
  console.log("接收信息...");

  let { event, params } = e.data;
  console.log("event", event);
  console.log("params", params);

  // 物料开始拖拽
  if (event == "dragstart") {
    drag.value.status = true;
    drag.value.type = "page";
    drag.value.widgetMeta = params;
    console.log("drag.value", drag.value);
  }

  // 物料拖拽中
  if (event == "dragover") {
    handleFindDragTarget(params.x, params.y);
  }

  // 物料拖拽结束
  if (event == "dragend") {
    handleDrop();
  }

  // 物料列表变化
  if (event == "watchWidgetList") {
    console.log("物料列表变化", params);
    widgetList.value = params;
  }

  // 预览产品
  if (event == "watchPreviewData") {
    previewData.value = params;
  }

  // 预览产品
  if (event == "watchPreviewProduct") {
    console.log("更新预览产品", params);
    previewProduct.value = params;
  }

  // 预览产品单页
  if (event == "watchPreviewProductPage") {
    previewProductPage.value = params;
  }

  // 预览表单
  if (event == "watchPreviewForm") {
    previewForm.value = params;
  }
});

// 查找物料模板拖拽到哪个物料
function handleFindDragTarget(x, y) {
  let targetElement = null;

  // elementsFromPoint 方法返回的是一个 DOM 元素数组，第一个元素即为鼠标位置最上层的元素
  const elements = document.elementsFromPoint(x, y);
  console.log("elements", elements);

  for (const element of elements) {
    if (element.getAttribute("widgetType")) {
      targetElement = element;
      break; // 找到第一个具有 widgetType 属性的元素即可，可以根据需求修改
    }
  }

  console.log("移动到目标物料");
  console.log("targetElement ", targetElement);

  if (targetElement) {
    const elementRect = targetElement.getBoundingClientRect();
    const elementMidHeight = elementRect.height / 2 + elementRect.top;

    // 判断y坐标是否小于元素的中点高度，如果是则在上半部分，否则在下半部分
    hoverWidgetIsTop.value = y < elementMidHeight;
    console.log("hoverWidgetIsTop.value", hoverWidgetIsTop.value);
  }

  let widgetType = targetElement?.getAttribute("widgetType");
  console.log("widgetType", widgetType);

  if (widgetType) {
    // 移动到目标物料，则记录目标物料信息
    drag.value.type = widgetType;
    drag.value.id = targetElement?.getAttribute("widgetId");
  } else {
    // 其余为移动页面场景，添加到物料最后
    drag.value.type = "page";
  }
}

// 拖拽完成
function handleDrop() {
  console.log("拖拽完成");
  // 是否为物料模板拖拽状态
  if (!drag.value.status) {
    return;
  }

  const addWidget = (list) => {
    console.log("addWidget.....");
    console.log("drag.value", drag.value);
    console.log("list", list);

    if (!list) return;

    let index = list.findIndex((item) => item.id == drag.value.id);

    if (index == -1) {
      list.map((item) => {
        item.children && addWidget(item.children);
      });
    } else {
      if (drag.value.type == "basicsWidget") {
        list.splice(
          hoverWidgetIsTop.value ? index : index + 1,
          0,
          createWidgetFromMeta(drag.value.widgetMeta)
        );
      }

      if (drag.value.type == "slotWidget") {
        console.log("添加插槽物料....");

        list[index]?.children.push(createWidgetFromMeta(drag.value.widgetMeta));
      }
    }
  };

  // 新增物料
  if (drag.value.type == "page") {
    widgetList.value.push(createWidgetFromMeta(drag.value.widgetMeta));
  } else {
    addWidget(widgetList.value);
  }

  handleSyncWidgetList();

  // 重置拖拽对象
  drag.value = {
    type: "",
    id: "",
    widgetMeta: null,
    status: false,
  };
}

// 通过物料meta生成物料
function createWidgetFromMeta(meta) {
  let { componentName, title, props, configure } = meta;
  console.log("meta", meta);
  let widget = { id: createId(8), componentName, title, props: {}, configure };

  // 遍历props属性
  props.forEach((prop) => {
    let { name, type, defaultValue } = prop;
    widget.props[name] = cloneDeep(defaultValue);
  });

  // 是否为容器物料
  if (configure?.component?.isContainer) {
    // 标记物料为容器物料
    widget.isContainer = true;

    widget.children = [
      {
        componentName: "ItemInContainerWidget",
        id: createId(8),
        isPrivate: true,
        children: [],
      },
    ];
  }

  // Tabs容器物料
  if (configure?.component?.isTab) {
    widget.isTab = true;
    widget.tabProp = configure?.component?.tabProp;

    // 查找对应的tab设置器，初始化Tab子容器
    const TabSetter = props.find((item) => {
      return item?.name == widget.tabProp;
    });

    if (TabSetter) {
      widget.children = [];

      TabSetter?.defaultValue?.list?.forEach((item, index) => {
        widget?.children.push({
          componentName: "ItemInTabsWidget",
          id: item.id,
          isPrivate: true,
          props: { tabId: item.id },
          children: [],
        });
      });
    }
  }

  return widget;
}

// 点击选中当前物料
function handleSetCurrentWidget(widget) {
  console.log("点击选中当前物料", widget);
  // 如果选中的是私有物料，则返回其父物料
  currentWidget.value = widget.isPrivate
    ? findFatherWidgetById(widget.id, widgetList.value)
    : widget;
  console.log("currentWidget.value", currentWidget.value);
  window.parent.postMessage(
    { event: "setCurrentWidget", params: currentWidget.value.id },
    "*"
  );
}

function findFatherWidgetById(id: string, list: any[] = [], father?: any) {
  for (const item of list) {
    if (item.id == id) {
      console.log("找到了物料...", father);
      return father;
    } else if (item.children) {
      const target = findFatherWidgetById(id, item.children, item);
      if (target) return target;
    }
  }
  return null;
}

// 同步物料列给设计器
function handleSyncWidgetList() {
  console.log("同步物料列给设计器....");

  window?.parent?.postMessage(
    {
      event: "syncWidgetList",
      params: JSON.parse(JSON.stringify(widgetList.value)),
    },
    "*"
  );
}

// 右键打开物料菜单操作栏
function handleWidgetContextmenu(params) {
  console.log("右键打开物料菜单操作栏");
  window?.parent?.postMessage(
    {
      event: "contextmenu",
      params,
    },
    "*"
  );
}

export const useDesignHook = () => ({
  previewData,
  previewForm,
  previewProduct,
  previewProductPage,
  drag,
  widgetList,
  currentWidget,
  hoverWidgetId,
  hoverWidgetIsTop,
  handleSetCurrentWidget,
  handleFindDragTarget,
  handleDrop,
  handleSyncWidgetList,
  handleWidgetContextmenu,
});

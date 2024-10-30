/*
 * @Description: 产品设计器 store
 * @Autor: WangYuan1
 * @Date: 2022-10-08 15:57:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-26 09:50:45
 */
import { defineStore } from "pinia";
import { createId, cloneDeep } from "@design/utils";
import { useWidgetMetaHook } from "@/hooks/useWidgetMeta";
import dayjs from "dayjs";

interface ProductState {
  inDragStatus: Boolean;
  designData: any;
  designDataKey: any;
  currentWidgetList: any;
  currentWidget: any;
  currentWidgetMeta: any;
  operationMenu: any;
}

const { widgetMetaList } = useWidgetMetaHook();

export const useDesignStore = defineStore({
  id: "app-design",

  state: (): ProductState => {
    return {
      inDragStatus: false,
      designData: null, // 当前设计对象
      designDataKey: "widgetList", // 当前设计对象物料列表属性名（默认为widgetList）
      currentWidgetList: [], // 当前页面物料列表
      currentWidget: null, // 当前选中物料
      currentWidgetMeta: null, // 当前选中物料元信息
      operationMenu: {
        show: false,
        x: 0,
        y: 0,
        widgetId: "",
        rectX: 0,
        rectY: 0,
      },
    };
  },

  actions: {
    // 设置拖拽状态
    setInDragStatus(status) {
      this.inDragStatus = status;
    },

    // 设置当前物料列表
    setcurrentWidgetList(list) {
      const cloneList = cloneDeep(list);
      this.currentWidgetList = cloneList;
      this.designData[this.designDataKey] = cloneList;
      console.log("设置当前物料列表", this.designData[this.designDataKey]);
    },

    // 设置当前物料
    setcurrentWidget(id) {
      this.currentWidget = null;
      setTimeout(() => {
        this.currentWidget = findTargetWidgetById(id, this.currentWidgetList);
        this.currentWidgetMeta = findTargetWidgetMetaByName(
          this.currentWidget?.componentName
        );
      }, 0);
    },

    // 删除当前物料
    deletecurrentWidget(id) {
      this.currentWidget = null;
      let widgetList = cloneDeep(this.currentWidgetList);
      deleteTargetWidgetById(id, widgetList);
      this.designData[this.designDataKey] = widgetList;
      this.currentWidgetList = widgetList;
    },

    // 初始化项目
    initDesign(data: any, designDataKey?: String) {
      this.designData = data;
      this.designDataKey = designDataKey || "widgetList";

      this.inDragStatus = false;
      this.currentWidgetList = this.designData[this.designDataKey];
      this.currentWidget = null;
      this.currentWidgetMeta = null;
    },
  },
  // 数据持久化
  persist: true, // true 表示开启持久化保存
});

// 删除目标物料
const deleteTargetWidgetById = (id, list = []) => {
  for (const item of list) {
    if (item.id == id) {
      console.log("list", list);
      console.log("找到了物料...1:");
      console.log("item", item);
      const index = list.findIndex((item) => item.id == id);
      list.splice(index, 1);
      console.log("list:", list);
      return;
    } else if (item.children) {
      deleteTargetWidgetById(id, item.children);
    }
  }
};

// 递归查询目标物料
const findTargetWidgetById = (id, list = []) => {
  for (const item of list) {
    if (item.id == id) {
      console.log("找到了物料..." + item);
      return item;
    } else if (item.children) {
      const target = findTargetWidgetById(id, item.children);
      if (target) return target;
    }
  }
  return null;
};

// 查询目标物料元信息
const findTargetWidgetMetaByName = (componentName) => {
  for (let meta of widgetMetaList.value || []) {
    console.log("meta.componentName", meta.componentName);
    if (meta.componentName == componentName) {
      console.log("meta", meta);
      return meta;
    }
  }
};

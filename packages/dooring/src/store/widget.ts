/*
 * @Description: 发布物料相关数据
 * @Autor: WangYuan1
 * @Date: 2022-10-08 15:57:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-03-04 20:52:42
 */
import { defineStore } from "pinia";
// import { initWidgetObjectFun } from "@/hooks/widget";

interface WidgetState {
  widget: any;
  widgetObject: any;
}

export const useWidgetStore = defineStore({
  id: "app-widget",

  state: (): WidgetState => {
    return {
      widget: null, // 物料信息
      widgetObject: null, // 物料模拟对象
    };
  },

  actions: {
    // 初始化物料配置
    initWidget(name: any) {
      this.widget = {
        description: "作者很懒，没给物料加描述",
        title: name,
        npm: "",
        props: [],
        configure: {
          props: [],
          component: {
            type: "",
          },
        },
      };
      console.log("初始化物料配置", this.widget);
    },

    // 解析为物料对象
    initWidgetObject() {
      // this.widgetObject = initWidgetObjectFun(this.widget);
    },

    // 设置物料
    setWidget(widget: any) {
      this.widget = { id: widget.id, ...widget };
    },
  },
  persist: true, // true 表示开启持久化保存
});

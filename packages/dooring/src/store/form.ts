/*
 * @Description: 表单设计器 store
 * @Autor: WangYuan1
 * @Date: 2022-10-08 15:57:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-25 10:59:13
 */
import dayjs from "dayjs";
import { defineStore } from "pinia";
import { createId, cloneDeep } from "@design/utils";

interface FormState {
  form: any;
}

export const useFormStore = defineStore({
  id: "app-form",

  state: (): FormState => {
    return {
      form: null, // 自定义表单
    };
  },

  actions: {
    initForm(form?: any) {
      if (form) {
        this.form = form;
      } else {
        this.form = {
          id: createId(),
          title: "表单实例",
          description: "描述下自己搭建的表单吧!",
          createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          // 表单设计
          formDesign: {
            configure: {},
            widgetList: [],
          },
          // 详情页设计
          detailDesign: {
            configure: {
              background: {
                mode: "pinned",
              },
            },
            widgetList: [],
          },
          // 列表设计
          listDesign: {
            listConfig: {
              props: {
                type: "single",
                width: "330",
                height: "120",
                gap: "10",
                radius: "square",
                showbackground: false,
                showShadow: true,
              },
            },
            widgetList: [],
          },
        };
      }
    },
  },
  // 数据持久化
  persist: true, // true 表示开启持久化保存
});

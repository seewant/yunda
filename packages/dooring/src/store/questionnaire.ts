/*
 * @Description: 产品设计器 store
 * @Autor: WangYuan1
 * @Date: 2022-10-08 15:57:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-24 17:37:46
 */
import { defineStore } from "pinia";
import { createId, cloneDeep } from "@design/utils";
import dayjs from "dayjs";

interface State {
  questionnaire: any;
}

export const useQuestionnaireStore = defineStore({
  id: "app-questionnaire",

  state: (): State => {
    return {
      questionnaire: null, // 问卷实例
    };
  },

  actions: {
    // 初始化问卷
    initQuestionnaire(questionnaire?: any) {
      this.questionnaire = questionnaire || {
        id: createId(),
        userId: "",
        title: "问卷调查",
        description: "描述下自己的问卷信息",
        createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        backgroundImage: "https://static.wenjuan.pub/蓝天1678848430097.jpeg",
        recommend: false,
        qr: "",
        use: "",
        widgetList: [],
      };
    },
  }, // 数据持久化
  persist: true, // true 表示开启持久化保存
});

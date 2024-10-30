/*
 * @Description: 文章设计器 store
 * @Autor: WangYuan1
 * @Date: 2022-10-08 15:57:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-24 17:37:46
 */
import { defineStore } from "pinia";
import { createId, cloneDeep } from "@design/utils";
import dayjs from "dayjs";

interface State {
  article: any;
}

export const useArticleStore = defineStore({
  id: "app-article",

  state: (): State => {
    return {
      article: null, // 图文实例
    };
  },

  actions: {
    // 初始化图文
    initArticle(article?: any) {
      this.article = article || {
        id: createId(),
        userId: "",
        title: "图文",
        description: "描述下自己的图文",
        createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        recommend: false,
        qr: "",
        use: "",
        configure: {
          background: {
            mode: "pinned",
          },
        },
        widgetList: [],
      };
    },
  }, // 数据持久化
  persist: true, // true 表示开启持久化保存
});

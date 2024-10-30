/*
 * @Description: 小程序实例 store
 * @Autor: WangYuan1
 * @Date: 2022-10-08 15:57:45
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-28 17:33:33
 */
import { defineStore } from "pinia";
import { createId, cloneDeep } from "@design/utils";
import dayjs from "dayjs";

interface WechatState {
  wechat: any;
  curWechatPage: any;
}

export const useWechatStore = defineStore({
  id: "app-wechat",

  state: (): WechatState => {
    return {
      wechat: null, // 小程序实例
      curWechatPage: null, // 小程序当前设计页
    };
  },

  actions: {
    // 初始化
    async initWechat(wechat?: any) {
      if (wechat) {
        this.wechat = wechat;
      } else {
        const homePageId = createId();
        const recommendPageId = createId();
        const findPageId = createId();
        const inspirationPageId = createId();

        this.wechat = {
          id: createId(),
          userId: "",
          title: "小程序实例",
          description: "描述下自己的小程序吧!",
          createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          recommend: false,
          qr: "",
          use: "",
          configure: {
            navigation: {
              mode: "bottom",
              list: [
                {
                  name: "首页",
                  icon: "icon-a-064_zhuye",
                  path: "pages/index/index",
                  status: true,
                  router: {
                    type: "page",
                    name: "首页",
                    id: homePageId,
                  },
                },
                {
                  name: "推荐",
                  icon: "icon-a-064_huore",
                  path: "pages/index/tab1",
                  status: true,
                  router: {
                    type: "page",
                    name: "推荐",
                    id: recommendPageId,
                  },
                },
                {
                  name: "发现",
                  icon: "icon-a-064_sousuo",
                  path: "pages/index/tab2",
                  status: false,
                  router: {
                    type: "page",
                    name: "发现",
                    id: findPageId,
                  },
                },
                {
                  name: "灵感",
                  icon: "icon-a-064_shuidi",
                  path: "pages/index/tab3",
                  status: wechat,
                  router: {
                    type: "page",
                    name: "灵感",
                    id: inspirationPageId,
                  },
                },
                {
                  name: "我的",
                  icon: "icon-a-064_wode",
                  path: "pages/index/tab4",
                  status: true,
                  router: {
                    type: "page",
                    name: "我的",
                    id: "my",
                  },
                },
              ],
            },
            advertising: {
              status: true,
              image:
                "https://www.sunmao-design.top/mall-cook/image/1718781787502.png",
              time: 3,
              router: {},
            },
            personalCenter: {
              backgroundImage:
                "http://www.sunmao-design.top/image/recommend/TScB8c5U50a7.jpg",
              menuList: [
                {
                  name: "足迹",
                  icon: "home-two-d7djo2eo",
                  router: {},
                },
                {
                  name: "足迹",
                  icon: "home-two-d7djo2eo",
                  router: {},
                },
                {
                  name: "足迹",
                  icon: "home-two-d7djo2eo",
                  router: {},
                },
                {
                  name: "足迹",
                  icon: "home-two-d7djo2eo",
                  router: {},
                },
              ],
              advertisingImage:
                "https://image.meiye.art/FpA6jGlyjLv7ET0t_LmFEuCNlEcU",
            },
          },
          pageList: [
            {
              id: homePageId,
              name: "首页",
              description: "",
              createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
              updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
              configure: {
                background: {
                  mode: "pinned",
                },
              },
              widgetList: [],
            },
            {
              id: recommendPageId,
              name: "推荐",
              description: "",
              createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
              updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
              configure: {
                background: {
                  mode: "pinned",
                },
              },
              widgetList: [],
            },
            {
              id: findPageId,
              name: "发现",
              description: "",
              createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
              updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
              configure: {
                background: {
                  mode: "pinned",
                },
              },
              widgetList: [],
            },
            {
              id: inspirationPageId,
              name: "灵感",
              description: "",
              createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
              updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
              configure: {
                background: {
                  mode: "pinned",
                },
              },
              widgetList: [],
            },
          ],
        };
      }
    },

    setCurWechatPage(id: any) {
      this.curWechatPage = this.wechat.pageList.find(
        (item: any) => item.id == id
      );
    },
  },
  // 数据持久化
  persist: true,
});

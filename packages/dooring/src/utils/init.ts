/*
 * @Description: 初始化
 * @Autor: WangYuan1
 * @Date: 2022-10-26 15:32:52
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-05-24 11:24:38
 */
import router from "@/router";

// pinia数据持久化存储
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// loading 插件
import loading from "@/plugins/loading";

// uno.css
import "uno.css";
import "@/style/index.scss";

// 注册物料meta
import { useWidgetMetaHook } from "@/hooks/useWidgetMeta";
const { handleRegisteredWidgetMeta } = useWidgetMetaHook();
handleRegisteredWidgetMeta();

// 注册设置器
import { registeredSetter } from "./setter";
// import { registeredSetter } from "@design/setter";


function initApp(app: any) {
  app.use(pinia);
  app.use(router);
  app.use(ElementPlus);
  app.use(registeredSetter);

  // loading插件
  app.directive("design-loading", loading);
}

export default initApp;

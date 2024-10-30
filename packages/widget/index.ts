/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2023-02-08 11:38:01
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-05-06 11:37:22
 */
import type { App } from "vue";

// 注册所有物料
function registeredWidget(app: App) {
  console.log("注册所有物料");
  const modules: any = import.meta.globEager("./src/widgets/**/index.vue");

  for (const path in modules) {
    const regex = /\/src\/widgets\/([^/]+)\/index\.vue$/;
    const match = path.match(regex);

    if (match) {
      const name = match[1];
      app.component(name, modules[path].default);
    }
  }
}

/**
 * 注册所有物料meta
 */
function registeredWidgetMeta() {
  const metaList: any[] = [];
  const modules: any = import.meta.globEager("./src/**/meta.ts");
  console.log("modules", modules);

  for (const path in modules) {
    let meta = modules[path].default;
    metaList.push(meta);
  }

  console.log("metaList", metaList);
  return metaList;
}

export { registeredWidget, registeredWidgetMeta };

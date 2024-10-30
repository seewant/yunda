/*
 * @Description: 物料hook
 * @Autor: WangYuan1
 * @Date: 2024-01-17 15:39:13
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-04-20 11:31:49
 */
import { ref, watch } from "vue";

// 物料对象
let compileWidget = ref({});

// 注册物料
function registeredWidget() {
  // const modules: any = import.meta.globEager("../widget/**/index.vue");
  const modules: any = import.meta.globEager("../../../widget/**/index.vue");

  console.log("modules", modules);

  for (const path in modules) {
    const regex = /.*\/(.*)\/index\.vue$/;
    const match = path.match(regex);

    if (match) {
      const name = match[1];
      console.log("name", name);
      compileWidget[name] = modules[path].default;
    }
  }
  console.log("注册物料完成");
  console.log("compileWidget", compileWidget);
}

// 根据物料名称返回物料
function getWidget(name) {
  return compileWidget[name];
}

export const useWidgetHook = () => ({
  registeredWidget,
  getWidget,
});

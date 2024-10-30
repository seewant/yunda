/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2023-02-07 10:38:49
 * @LastEditors: WangYuan
 * @LastEditTime: 2023-02-08 11:33:50
 */
import type { App } from "vue";
import Empty from "./src/index.vue";

Empty.install = (app: App) => {
  app.component("Empty", Empty);
};

// 可以通过 app.use 来使用，也可以通过 import 方式单独使用
export { Empty as Empty };
export default Empty;

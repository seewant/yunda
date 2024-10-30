/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-11-15 18:56:42
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-11-15 20:20:16
 */
import { createApp, Directive } from "vue";
import Loading from "../components/Loading.vue";

const loading: Directive = {
  mounted(el, binding) {
    console.log("初始化插件....");

    const app = createApp(Loading);
    const instance = app.mount(document.createElement("div"));
    el.instance = instance;
    el.style.position = "relative";
    console.log("binding.value", binding.value);

    if (binding.value) {
      appendEl(el);
    }
  },
  updated(el, binding) {
    binding.value ? appendEl(el) : removeEl(el);
  },
};

const appendEl = (el: {
  appendChild: (arg0: any) => void;
  instance: { $el: any };
}) => {
  el.appendChild(el.instance.$el);
};

const removeEl = (el: {
  removeChild: (arg0: any) => void;
  instance: { $el: any };
}) => {
  if (el.instance.$el) {
    try {
      el.removeChild(el.instance.$el);
    } catch {
      console.log("跳过处理，已经删除loading");
    }
  }
};

export default loading;

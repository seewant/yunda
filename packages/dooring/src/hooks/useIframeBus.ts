/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-01-31 09:47:49
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-05-07 11:15:46
 */
import { ref, onMounted, onUnmounted } from "vue";

let iframeRef = ref(null);
const iframeBus = {};
const callbackList = []; // 回调列表

const createIframeInstance = (target) => {
  iframeRef = target;
};

const destroyIframeInstance = () => {
  iframeRef.value = null;
};

iframeBus.emit = (event: String, params: any) => {
  if (iframeRef.value && iframeRef.value.contentWindow) {
    iframeRef.value.contentWindow.postMessage({ event, params }, "*");
  }
};

iframeBus.on = (event: String, callback: Event) => {
  callbackList.push({ event, callback });
};

window.addEventListener("message", (e) => {
  let { event, params } = e.data;
  let targetCallback = callbackList.find((item) => item.event == event);
  targetCallback.callback(params);
  console.log("父容器接收消息.....");
  console.log("targetCallback", targetCallback);
  console.log("e.data", e.data);
});

export const useIframeBusHook = () => ({
  createIframeInstance,
  destroyIframeInstance,
  iframeBus,
});

/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-10-26 14:59:38
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-03-04 19:14:20
 */
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import initApp from "@/utils/init";

const app = createApp(App);

initApp(app);

app.mount("#app");

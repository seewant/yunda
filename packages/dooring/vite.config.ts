/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2023-02-27 21:12:22
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-02-01 10:40:25
 */
/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-10-26 14:59:38
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-01-30 15:21:04
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import Unocss from "unocss/vite";
import { presetUno, presetAttributify } from "unocss";

export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [presetAttributify(), presetUno({})],
      shortcuts: {
        "flex-center": "flex justify-center items-center",
      },
    }),
  ],

  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "/public": resolve(__dirname, "..", "public"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"], // 使用路径别名时想要省略的后缀名
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/style/variable.scss";',
      },
    },
  },

  base: "./",

  server: {
    port: 5000, //端口号
    host: "0.0.0.0",
  },
});

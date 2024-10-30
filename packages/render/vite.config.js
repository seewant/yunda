import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '/public': resolve(__dirname, '..', 'public')
    },
  },
  plugins: [
    uni(),
  ],
  devServer: { headers: { 'Access-Control-Allow-Origin': '*', } },
  base: "./",
  server: {
    port: 5001, //端口号
    host: "0.0.0.0",
  },
})

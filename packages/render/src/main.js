/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-01-16 17:59:17
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-04-26 15:01:40
 */
import '@/hooks/useDesign'
import { createSSRApp } from 'vue'
import { registeredWidget } from '@design/widget/index'

import uviewPlus from 'uview-plus'

import App from './App.vue'
export function createApp () {
  const app = createSSRApp(App)

  app.use(uviewPlus)

  registeredWidget(app)

  return {
    app
  }
}

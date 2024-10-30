/*
 * @Description: 注册必须项
 * @Autor: WangYuan1
 * @Date: 2023-12-22 14:58:26
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-04-20 11:15:07
 */
import { ref } from "vue";
import { registeredWidgetMeta } from "@design/widget/index";

// 物料模板列表
let widgetMetaList: any = ref([]);

// 注册物料模板
const handleRegisteredWidgetMeta = () => {
  widgetMetaList.value = registeredWidgetMeta();
  console.log("widgetMetaList", widgetMetaList.value);
};

export const useWidgetMetaHook = () => ({
  widgetMetaList,
  handleRegisteredWidgetMeta,
});

/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-02-05 10:11:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-05-27 19:35:42
 */
// 物料下的meta.ts文件
export default {
  sign: 2,
  group: "基础",
  componentName: "image",
  title: "图片",
  w: 120,
  h: 80,
  props: [
    {
      name: "data",
      title: "动态数据",
      propType: "string",
      defaultValue: {
        type: "mock",
        value: "",
        mock: "",
      },
      setter: {
        componentName: "VariableImageSetter",
      },
    },
    {
      name: "radius",
      title: "图片圆角",
      propType: "number",
      defaultValue: "0",
      setter: {
        componentName: "NumberSetter",
      },
    },
  ],
};

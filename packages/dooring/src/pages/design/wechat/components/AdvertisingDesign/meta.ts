/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-02-05 10:11:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-15 09:54:45
 */
// 物料下的meta.ts文件
export default {
  props: [
    {
      title: "起始页",
      propType: "string",
      setter: {
        componentName: "TitleSetter",
      },
    },
    {
      name: "status",
      title: "是否启用",
      propType: "string",
      defaultValue: true,
      setter: {
        componentName: "SwitchSetter",
      },
    },
    {
      name: "image",
      title: "广告图片",
      propType: "string",
      defaultValue: "",
      setter: {
        componentName: "UploadSetter",
      },
    },
    {
      name: "time",
      title: "停留时间",
      propType: "number",
      defaultValue: "3",
      setter: {
        componentName: "NumberSetter",
      },
    },
    {
      name: "route",
      title: "广告跳转",
      propType: "string",
      defaultValue: {
        type: "",
        value: "",
      },
      setter: {
        componentName: "RouterSetter",
      },
    },
  ],
};

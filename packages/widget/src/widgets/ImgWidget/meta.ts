/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-02-05 10:11:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-21 16:04:28
 */
// 物料下的meta.ts文件
export default {
  group: "基础", //用于描述当前组件位于组件面板的哪个 tab
  componentName: "ImgWidget", // 组件名称
  title: "图片组件", // 组件中文名称
  cover: "https://www.sunmao-design.top/sunmao/assets-iamge/ImgWidget.png",
  sortWeight: 97, // 物料排序权值，权值越大排名越前
  props: [
    {
      name: "url",
      title: "图片",
      propType: "string",
      defaultValue: "",
      setter: {
        componentName: "UploadSetter",
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
    {
      name: "route",
      title: "跳转",
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
  configure: {
    design: {
      // 物料使用设计器 问卷：questionnaire h5：h5 小程序：wechat 自定义表单：form 自定义表单详情页：detail
      types: ["h5", "wechat", "article", "form-detail"],
    },
  },
};

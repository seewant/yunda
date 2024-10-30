/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-02-05 10:11:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-29 16:20:31
 */
// 物料下的meta.ts文件
export default {
  componentName: "TextWidget", // 组件名称
  title: "文本组件", // 组件中文名称
  description: "用于显示标题、文本", // 组件描述
  cover: "https://www.sunmao-design.top/sunmao/assets-iamge/TextWidget.png",
  group: "基础", // 用于描述当前组件位于组件面板的哪个 tab
  sortWeight: 99, // 物料排序权值，权值越大排名越前
  props: [
    {
      name: "text",
      title: "文本内容",
      propType: "string",
      defaultValue: "清澈的爱,只为中国",
      setter: {
        componentName: "StringSetter",
        props: {
          type: "textarea",
          rows: 6,
        },
      },
    },
    {
      name: "size",
      title: "字体大小",
      propType: "number",
      defaultValue: "12",
      setter: {
        componentName: "NumberSetter",
      },
    },
    {
      name: "lineHeight",
      title: "字体间距",
      propType: "number",
      defaultValue: "12",
      setter: {
        componentName: "NumberSetter",
      },
    },
    {
      name: "textColor",
      title: "文字颜色",
      propType: "string",
      defaultValue: "#000000",
      setter: {
        componentName: "ColorSetter",
      },
    },
    {
      name: "location",
      title: "位置",
      propType: "string",
      defaultValue: "center",
      setter: {
        componentName: "SelectSetter",
        props: {
          options: [
            {
              label: "居左",
              value: "left",
            },
            {
              label: "居中",
              value: "center",
            },
            {
              label: "居右",
              value: "right",
            },
          ],
        },
      },
    },
    {
      name: "colSpacing",
      title: "上下间距",
      propType: "number",
      defaultValue: "10",
      setter: {
        componentName: "NumberSetter",
      },
    },
  ],
  configure: {
    design: {
      // 物料使用设计器 问卷：questionnaire h5：h5 小程序：wechat 自定义表单：form 自定义表单详情页：detail
      types: ["h5", "wechat", "article"],
    },
  },
};

/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-02-05 10:11:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-21 16:06:01
 */
// 物料下的meta.ts文件
export default {
  componentName: "NoticeWidget", // 组件名称
  title: "公告", // 组件中文名称
  description: "用于显示公告", // 组件描述
  icon: "font-size", // 组件图标
  cover: "https://www.sunmao-design.top/sunmao/assets-iamge/NoticeWidget.png",
  group: "基础", // 用于描述当前组件位于组件面板的哪个 tab
  sortWeight: 94, // 物料排序权值，权值越大排名越前
  props: [
    {
      name: "text",
      title: "通知文本",
      propType: "string",
      defaultValue:
        "榫卯搭建支持零成本自由搭建小程序企业官微,营销页面、问卷调查",
      setter: {
        componentName: "StringSetter",
      },
    },
    {
      name: "mode",
      title: "公告模式",
      propType: "string",
      defaultValue: "base",
      setter: {
        componentName: "SelectSetter",
        props: {
          options: [
            {
              label: "基础",
              value: "base",
            },
            {
              label: "可跳转",
              value: "link",
            },
            {
              label: "可关闭",
              value: "closable",
            },
          ],
        },
      },
    },
    {
      name: "textColor",
      title: "文字颜色",
      propType: "string",
      defaultValue: "#2254f4",
      setter: {
        componentName: "ColorSetter",
      },
    },
    {
      name: "cardBg",
      title: "卡片背景",
      propType: "string",
      defaultValue: "#FFFFFF",
      setter: {
        componentName: "ColorSetter",
      },
    },
    {
      name: "cardRadius",
      title: "卡片倒角",
      propType: "string",
      defaultValue: "round",
      setter: {
        componentName: "SelectSetter",
        props: {
          options: [
            {
              label: "直角",
              value: "square",
            },
            {
              label: "圆角",
              value: "round",
            },
          ],
        },
      },
    },
    {
      name: "cardShadow",
      title: "卡片阴影",
      defaultValue: true,
      setter: {
        componentName: "SwitchSetter",
      },
    },
    {
      name: "upperLowerMargin",
      title: "上下边距",
      propType: "string",
      defaultValue: "10",
      setter: {
        componentName: "NumberSetter",
      },
    },
    {
      name: "pageMargin",
      title: "页面边距",
      propType: "string",
      defaultValue: "10",
      setter: {
        componentName: "NumberSetter",
      },
    },
  ],
  configure: {
    design: {
      // 物料使用设计器 问卷：questionnaire h5：h5 小程序：wechat 自定义表单：form 自定义表单详情页：detail
      types: ["h5", "wechat"],
    },
  },
};

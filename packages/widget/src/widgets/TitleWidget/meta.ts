/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-02-05 10:11:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-21 15:56:24
 */
// 物料下的meta.ts文件
export default {
  componentName: "TitleWidget", // 组件名称
  title: "标题", // 组件中文名称
  description: "用于显示标题", // 组件描述
  icon: "font-size", // 组件图标
  group: "基础", // 用于描述当前组件位于组件面板的哪个 tab
  props: [
    {
      title: "内容",
      propType: "string",
      setter: {
        componentName: "TitleSetter",
      },
    },
    {
      name: "mode",
      title: "标题风格",
      propType: "string",
      defaultValue: "descriptionMode",
      setter: {
        componentName: "SelectSetter",
        props: {
          options: [
            {
              label: "基础",
              value: "baseMode",
            },
            {
              label: "含描述",
              value: "descriptionMode",
            },
            {
              label: "含跳转",
              value: "jumpMode",
            },
          ],
        },
      },
    },
    {
      title: "内容",
      propType: "string",
      setter: {
        componentName: "TitleSetter",
      },
    },
    {
      name: "title",
      title: "标题内容",
      propType: "string",
      defaultValue: "推荐日常",
      setter: {
        componentName: "StringSetter",
      },
    },
    {
      name: "description",
      title: "描述内容",
      propType: "string",
      defaultValue: "Recommended Routine",
      // 控制设置器显隐
      condition: (target) => {
        return target.mode == "descriptionMode";
      },
      setter: {
        componentName: "StringSetter",
      },
    },
    {
      name: "jumpText",
      title: "跳转文本",
      propType: "string",
      defaultValue: "更多",
      // 控制设置器显隐
      condition: (target) => {
        return target.mode == "jumpMode";
      },
      setter: {
        componentName: "StringSetter",
      },
    },
    {
      title: "样式",
      propType: "string",
      setter: {
        componentName: "TitleSetter",
      },
    },
    {
      name: "titleSize",
      title: "标题大小",
      propType: "number",
      defaultValue: "20",
      setter: {
        componentName: "NumberSetter",
      },
    },
    {
      name: "titleColor",
      title: "文字颜色",
      propType: "string",
      defaultValue: "#373535",
      setter: {
        componentName: "ColorSetter",
      },
    },
    {
      name: "descriptionSize",
      title: "描述大小",
      propType: "number",
      defaultValue: "14",
      // 控制设置器显隐
      condition: (target) => {
        return target.mode == "descriptionMode";
      },
      setter: {
        componentName: "NumberSetter",
      },
    },
    {
      name: "descriptionColor",
      title: "描述颜色",
      propType: "string",
      defaultValue: "#999999",
      // 控制设置器显隐
      condition: (target) => {
        return target.mode == "descriptionMode";
      },
      setter: {
        componentName: "ColorSetter",
      },
    },
    {
      name: "upperLowerPadding",
      title: "上下边距",
      propType: "number",
      defaultValue: "10",
      setter: {
        componentName: "NumberSetter",
      },
    },
  ],
  configure: {
    design: {
      design: {
        // 物料使用设计器 问卷：questionnaire h5：h5 小程序：wechat 自定义表单：form 自定义表单详情页：detail
        types: ["h5", "wechat", "form-detail"],
      },
    },
  },
};

/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-02-05 10:11:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-23 16:43:39
 */
// 物料下的meta.ts文件
export default {
  sign: 1,
  group: "基础",
  componentName: "text",
  title: "文本",
  w: 100,
  h: 16,
  props: [
    {
      title: "内容",
      propType: "string",
      setter: {
        componentName: "TitleSetter",
      },
    },
    {
      name: "text",
      title: "文本",
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
      title: "样式",
      propType: "string",
      setter: {
        componentName: "TitleSetter",
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
      name: "lineHieght",
      title: "字体行高",
      propType: "number",
      defaultValue: "18",
      setter: {
        componentName: "NumberSetter",
      },
    },
    {
      name: "color",
      title: "字体颜色",
      propType: "string",
      defaultValue: "#000",
      setter: {
        componentName: "ColorSetter",
      },
    },
    {
      name: "bold",
      title: "字体加粗",
      propType: "string",
      defaultValue: false,
      setter: {
        componentName: "SwitchSetter",
      },
    },
  ],
};

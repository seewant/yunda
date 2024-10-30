/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-02-05 10:11:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-10 20:30:05
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
      defaultValue: "这是一段文字",
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
      defaultValue: "16",
      setter: {
        componentName: "NumberSetter",
      },
    },
    {
      name: "lineHieght",
      title: "字体行高",
      propType: "number",
      defaultValue: "22",
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
      defaultValue: true,
      setter: {
        componentName: "SwitchSetter",
      },
    },
  ],
};

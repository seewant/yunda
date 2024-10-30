/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-04-12 10:44:32
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-25 09:51:23
 */
/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-02-05 10:11:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-04-12 11:17:09
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
      name: "data",
      title: "动态数据",
      propType: "string",
      defaultValue: {
        type: "static",
        variableValue: "",
        staticValue: "清澈的爱,只为中国",
      },
      setter: {
        componentName: "VariableStringSetter",
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
      name: "bold",
      title: "字体加粗",
      propType: "string",
      defaultValue: false,
      setter: {
        componentName: "SwitchSetter",
      },
    },
    {
      name: "clamp",
      title: "显示行数",
      defaultValue: "1",
      setter: {
        componentName: "SelectSetter",
        props: {
          options: [
            {
              label: "一行",
              value: "1",
            },
            {
              label: "两行",
              value: "2",
            },
            {
              label: "三行",
              value: "3",
            },
          ],
        },
      },
    },
  ],
};

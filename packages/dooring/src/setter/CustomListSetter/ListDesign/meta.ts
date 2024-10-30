/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-04-12 10:44:32
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-04-12 15:20:51
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
  group: "基础", //用于描述当前组件位于组件面板的哪个 tab
  componentName: "ImgWidget", // 组件名称
  title: "图片", // 组件中文名称
  icon: "new-picture-c4bga5f0", // 组件图标
  category: "通用", //用于描述组件位于组件面板同一 tab 的哪个区域
  props: [
    {
      name: "type",
      title: "列表类型",
      propType: "string",
      defaultValue: "single",
      extraProps: {
        setValue: (target, value) => {
          console.log("设置target", target);
          if (value == "double") {
            target.width = "160";
            target.height = "200";
          }
          if (value == "single") {
            target.width = "350";
            target.height = "100";
          }
        },
      },
      setter: {
        componentName: "SelectSetter",
        props: {
          options: [
            {
              label: "单列",
              value: "single",
            },
            {
              label: "双列",
              value: "double",
            },
          ],
        },
      },
    },
    {
      name: "width",
      title: "列表项宽度",
      propType: "number",
      defaultValue: "330",
      setter: {
        componentName: "NumberSetter",
      },
    },
    {
      name: "height",
      title: "列表项高度",
      propType: "number",
      defaultValue: "120",
      setter: {
        componentName: "NumberSetter",
      },
    },
    {
      name: "gap",
      title: "列表项间隔",
      propType: "number",
      defaultValue: "10",
      setter: {
        componentName: "NumberSetter",
      },
    },
    {
      name: "radius",
      title: "边角",
      propType: "string",
      defaultValue: "square",
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
      name: "showbackground",
      title: "背景透明",
      defaultValue: false,
      setter: {
        componentName: "SwitchSetter",
      },
    },
    {
      name: "showShadow",
      title: "阴影",
      defaultValue: false,
      setter: {
        componentName: "SwitchSetter",
      },
    },
  ],
  configure: {
    design: {
      useH5: true, // 物料在H5设计器使用
      useWechat: true, // 物料在小程序设计器使用
    },
  },
};

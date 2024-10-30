/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-02-05 10:11:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-09-24 10:07:01
 */
// 物料下的meta.ts文件
export default {
  props: [
    // {
    //   title: "导航设置",
    //   propType: "string",
    //   setter: {
    //     componentName: "TitleSetter",
    //   },
    // },
    // {
    //   name: "themeColor",
    //   title: "主题色",
    //   propType: "string",
    //   defaultValue: "#373535",
    //   setter: {
    //     componentName: "ColorSetter",
    //   },
    // },
    {
      name: "mode",
      title: "导航样式",
      propType: "string",
      defaultValue: "bottom",
      setter: {
        componentName: "SelectSetter",
        props: {
          options: [
            {
              label: "底部",
              value: "bottom",
            },
            {
              label: "悬浮",
              value: "floating",
            },
          ],
        },
      },
    },
    {
      name: "list",
      title: "导航列表",
      propType: "array",
      setter: {
        componentName: "ArraySetter",
        props: {
          allowCreate: false,
          allowDelete: false,
          items: [
            {
              name: "status",
              title: "启用",
              propType: "string",
              defaultValue: true,
              setter: {
                componentName: "SwitchSetter",
              },
            },
            {
              name: "icon",
              title: "图标",
              propType: "string",
              defaultValue: "",
              setter: {
                componentName: "IconSetter",
              },
            },
            {
              name: "name",
              title: "标题",
              propType: "string",
              defaultValue: "导览",
              setter: {
                componentName: "StringSetter",
              },
            },
            {
              name: "router",
              title: "跳转",
              propType: "string",
              defaultValue: {
                type: "",
                value: "",
              },
              setter: {
                componentName: "NavigationSetter",
              },
            },
          ],
        },
      },
    },
  ],
};

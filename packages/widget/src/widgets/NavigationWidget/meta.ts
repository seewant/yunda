/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-02-05 10:11:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-21 15:53:25
 */
// 物料下的meta.ts文件
export default {
  group: "基础", //用于描述当前组件位于组件面板的哪个 tab
  componentName: "NavigationWidget", // 组件名称
  title: "导航组件", // 组件中文名称
  icon: "new-picture-c4bga5f0", // 组件图标
  cover:
    "https://www.sunmao-design.top/sunmao/assets-iamge/NavigationWidget.png",
  sortWeight: 98, // 物料排序权值，权值越大排名越前
  props: [
    {
      name: "list",
      title: "内容",
      propType: "array",
      setter: {
        componentName: "ArraySetter",
        props: {
          items: [
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
              name: "image",
              title: "图片",
              propType: "string",
              defaultValue: "",
              setter: {
                componentName: "UploadSetter",
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
        },
      },
      defaultValue: [
        {
          id: "1111",
          name: "今日推荐",
          image: "",
          route: {},
        },
        {
          id: "2222",
          name: "热门榜单",
          image: "",
          route: {},
        },
        {
          id: "3333",
          name: "首发新品",
          image: "",
          route: {},
        },
        {
          id: "4444",
          name: "促销单品",
          image: "",
          route: {},
        },
      ],
    },
    {
      title: "样式",
      propType: "string",
      setter: {
        componentName: "TitleSetter",
      },
    },
    {
      name: "mode",
      title: "展示样式",
      propType: "string",
      defaultValue: "multi",
      extraProps: {
        // 控制设置器设值
        setValue: (target, value) => {
          if (value == "multi") {
            target.colNumber = "4";
          }
        },
      },
      setter: {
        componentName: "SelectSetter",
        props: {
          options: [
            {
              label: "单行",
              value: "single",
            },
            {
              label: "多行",
              value: "multi",
            },
          ],
        },
      },
    },
    {
      name: "shape",
      title: "图标样式",
      propType: "string",
      defaultValue: "square",
      setter: {
        componentName: "SelectSetter",
        props: {
          options: [
            {
              label: "方形",
              value: "square",
            },
            {
              label: "圆形",
              value: "round",
            },
          ],
        },
      },
    },
    {
      name: "colNumber",
      title: "显示个数",
      propType: "string",
      defaultValue: "4",
      // 控制设置器显隐
      condition: (target) => {
        return target.mode == "multi";
      },
      setter: {
        componentName: "SelectSetter",
        props: {
          options: [
            {
              label: "3个",
              value: "3",
            },
            {
              label: "4个",
              value: "4",
            },
            {
              label: "5个",
              value: "5",
            },
          ],
        },
      },
    },
    {
      name: "textColor",
      title: "文字颜色",
      propType: "string",
      defaultValue: "#373535",
      setter: {
        componentName: "ColorSetter",
      },
    },
    {
      name: "backgroundColor",
      title: "背景颜色",
      propType: "string",
      defaultValue: "#ffffff",
      setter: {
        componentName: "ColorSetter",
      },
    },
    {
      name: "backgroundShape",
      title: "背景样式",
      propType: "string",
      defaultValue: "square",
      setter: {
        componentName: "SelectSetter",
        props: {
          options: [
            {
              label: "方形",
              value: "square",
            },
            {
              label: "圆形",
              value: "round",
            },
          ],
        },
      },
    },
    {
      name: "backgroundMargin",
      title: "背景边距",
      propType: "string",
      defaultValue: "0",
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

/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-02-05 10:11:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-18 15:17:56
 */
// 物料下的meta.ts文件
export default {
  group: "基础", //用于描述当前组件位于组件面板的哪个 tab
  componentName: "ImgCubeWidget", // 组件名称
  title: "图片魔方组件", // 组件中文名称
  icon: "new-picture-c4bga5f0", // 组件图标
  cover: "https://www.sunmao-design.top/sunmao/assets-iamge/ImgCubeWidget.png",
  sortWeight: 96, // 物料排序权值，权值越大排名越前
  props: [
    {
      title: "内容",
      propType: "string",
      setter: {
        componentName: "TitleSetter",
      },
    },
    {
      name: "config",
      title: "图片魔方",
      propType: "string",
      defaultValue: {
        mode: "cubeThree",
        row: 2,
        col: 2,
        cubeList: [
          { top: 1, left: 1, bottom: 2, right: 2, height: 1, width: 1 },
          { top: 1, left: 2, bottom: 2, right: 3, height: 1, width: 1 },
          { top: 2, left: 1, bottom: 3, right: 2, height: 1, width: 1 },
          { top: 2, left: 2, bottom: 3, right: 3, height: 1, width: 1 },
        ],
      },
      setter: {
        componentName: "ImgCubeSetter",
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
      name: "pageMargin",
      title: "页面边距",
      propType: "string",
      defaultValue: "0",
      setter: {
        componentName: "NumberSetter",
      },
    },
    {
      name: "cubeRadius",
      title: "魔方倒角",
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
      name: "itemMargin",
      title: "单块边距",
      propType: "number",
      defaultValue: "10",
      setter: {
        componentName: "NumberSetter",
      },
    },
    {
      name: "itemRadius",
      title: "单块倒角",
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
  ],
  configure: {
    design: {
      // 物料使用设计器 问卷：questionnaire h5：h5 小程序：wechat 自定义表单：form 自定义表单详情页：detail
      types: ["h5", "wechat"],
    },
  },
};

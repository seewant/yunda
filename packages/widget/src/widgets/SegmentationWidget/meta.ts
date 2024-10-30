/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-02-05 10:11:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-21 16:51:56
 */
// 物料下的meta.ts文件
export default {
  group: "基础", //用于描述当前组件位于组件面板的哪个 tab
  componentName: "SegmentationWidget", // 组件名称
  title: "空白组件", // 组件中文名称
  icon: "new-picture-c4bga5f0", // 组件图标
  cover:
    "https://www.sunmao-design.top/sunmao/assets-iamge/SegmentationWidget.png",
  sortWeight: 93, // 物料排序权值，权值越大排名越前
  props: [
    {
      name: "height",
      title: "高度",
      propType: "string",
      defaultValue: "40",
      setter: {
        componentName: "NumberSetter",
      },
    },
  ],
  configure: {
    design: {
      // 物料使用设计器 问卷：questionnaire h5：h5 小程序：wechat 自定义表单：form 自定义表单详情页：detail
      types: ["h5", "wechat", "article", "form-detail"],
    },
  },
};

/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-02-05 10:11:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-19 10:32:47
 */
// 物料下的meta.ts文件
export default {
  componentName: "FormInputWidget", // 组件名称
  title: "填空", // 组件中文名称
  icon: "font-size", // 组件图标
  cover: "https://www.sunmao-design.top/sunmao/assets-iamge/FormInputWidget.png",
  group: "表单", // 用于描述组件位于组件面板同一 tab 的哪个区域
  props: [
    {
      name: "label",
      title: "标题",
      propType: "string",
      defaultValue: "填空",
      setter: {
        componentName: "StringSetter",
      },
    },
    {
      title: "校验",
      propType: "string",
      setter: {
        componentName: "TitleSetter",
      },
    },
    {
      name: "required",
      title: "此题必答",
      defaultValue: true,
      setter: {
        componentName: "SwitchSetter",
      },
    },
  ],
  configure: {
    component: {
      isFrom: true, // 是否为表单物料
      defaultValue: "", // 在表单中的默认值
    },
    design: {
      // 物料使用设计器 问卷：questionnaire h5：h5 小程序：wechat 自定义表单：form 自定义表单详情页：detail
      types: ["questionnaire", "form"],
    },
  },
};

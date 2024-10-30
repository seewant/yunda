/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-02-05 10:11:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-04-02 20:40:47
 */
// 物料下的meta.ts文件
export default {
  props: [
    {
      title: "问卷内容",
      propType: "string",
      setter: {
        componentName: "TitleSetter",
      },
    },
    {
      name: "title",
      title: "问卷标题",
      propType: "string",
      defaultValue: "",
      setter: {
        componentName: "StringSetter",
      },
    },
    {
      name: "description",
      title: "问卷描述",
      propType: "string",
      defaultValue: "",
      setter: {
        componentName: "StringSetter",
        props: {
          type: "textarea",
        },
      },
    },
    {
      name: "backgroundImage",
      title: "问卷背景",
      propType: "string",
      defaultValue: "",
      setter: {
        componentName: "UploadSetter",
      },
    },
  ],
};

/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-02-05 10:11:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-10 17:04:20
 */
// 物料下的meta.ts文件
export default {
  sign: 1,
  group: "基础",
  componentName: "block",
  title: "空白",
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
  ],
};

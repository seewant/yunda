/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-02-05 10:11:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-27 16:08:27
 */
// 物料下的meta.ts文件
export default {
  props: [
    {
      name: "background",
      title: "页面背景",
      propType: "string",
      defaultValue: {},
      setter: {
        componentName: "BackgroundSetter",
      },
    },
  ],
};

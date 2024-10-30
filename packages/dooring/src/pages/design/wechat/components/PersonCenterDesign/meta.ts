/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-02-05 10:11:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-09-24 11:25:32
 */
// 物料下的meta.ts文件
export default {
  props: [
    {
      title: "个人中心",
      propType: "string",
      setter: {
        componentName: "TitleSetter",
      },
    },
    {
      name: "backgroundImage",
      title: "头部背景",
      propType: "string",
      defaultValue: "",
      setter: {
        componentName: "UploadSetter",
      },
    },
    {
      name: "showMenu",
      title: "显示菜单",
      propType: "string",
      defaultValue: false,
      setter: {
        componentName: "SwitchSetter",
      },
    },
    {
      name: "menuList",
      title: "菜单列表",
      propType: "array",
      setter: {
        componentName: "ArraySetter",
        props: {
          items: [
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
    },
    {
      title: "广告",
      propType: "string",
      setter: {
        componentName: "TitleSetter",
      },
    },
    {
      name: "advertisingImage",
      title: "广告图片",
      propType: "string",
      defaultValue: "",
      setter: {
        componentName: "UploadSetter",
      },
    },
  ],
};

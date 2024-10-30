/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-02-05 10:11:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-10-18 15:56:25
 */
// 物料下的meta.ts文件
export default {
  componentName: "SwiperWidget", // 组件名称
  title: "轮播组件", // 组件中文名称
  description: "用于轮播展示", // 组件描述
  icon: "font-size", // 组件图标
  cover: "https://www.sunmao-design.top/sunmao/assets-iamge/SwiperWidget.png",
  group: "基础", // 用于描述当前组件位于组件面板的哪个 tab
  sortWeight: 94, // 物料排序权值，权值越大排名越前
  props: [
    {
      name: "list",
      title: "内容",
      setter: {
        componentName: "ArraySetter",
        props: {
          items: [
            {
              name: "title",
              title: "标题",
              defaultValue: "轮播图",
              setter: {
                componentName: "StringSetter",
              },
            },
            {
              name: "image",
              title: "图片",
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
          title: "今日推荐",
          image:
            "https://img01.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png!large.webp",
          route: {},
        },
        {
          id: "2222",
          title: "热门榜单",
          image:
            "https://img01.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png!large.webp",
          route: {},
        },
        {
          id: "3333",
          title: "首发新品",
          image:
            "https://img01.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png!large.webp",
          route: {},
        },
      ],
    },
    {
      name: "showTitle",
      title: "显示标题",
      defaultValue: true,
      setter: {
        componentName: "SwitchSetter",
      },
    },
    {
      name: "height",
      title: "组件高度",
      propType: "number",
      defaultValue: "200",
      setter: {
        componentName: "NumberSetter",
      },
    },
    {
      name: "indicatorMode",
      title: "指示器模式",
      defaultValue: "dot",
      // 控制设置器显隐
      condition: (target) => {
        return target.showTitle === false;
      },
      setter: {
        componentName: "SelectSetter",
        props: {
          options: [
            {
              label: "点状",
              value: "dot",
            },
            {
              label: "线状",
              value: "line",
            },
            {
              label: "无",
              value: "none",
            },
          ],
        },
      },
    },
    {
      name: "indicatorActiveColor",
      title: "指示器颜色",
      defaultValue: "#FFFFFF",
      // 控制设置器显隐
      condition: (target) => {
        return target.showTitle === false;
      },
      setter: {
        componentName: "ColorSetter",
      },
    },
    {
      name: "autoplay",
      title: "自动切换",
      defaultValue: true,
      setter: {
        componentName: "SwitchSetter",
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

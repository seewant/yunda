/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-03-26 10:04:58
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-03-26 14:45:19
 */
export default [
  // {
  //   label: "一行两个",
  //   value: "cubeOne",
  //   icon: "deco-icon-cuberow",
  //   row: 1,
  //   col: 2,
  //   cubeList: [
  //     { top: 1, left: 1, bottom: 2, right: 2, height: 1, width: 1 },
  //     { top: 1, left: 2, bottom: 2, right: 3, height: 1, width: 1 },
  //   ],
  // },
  // {
  //   label: "一行三个",
  //   value: "cubeTwo",
  //   icon: "deco-icon-cuberow2",
  //   row: 1,
  //   col: 3,
  //   cubeList: [
  //     { top: 1, left: 1, bottom: 2, right: 2, height: 1, width: 1 },
  //     { top: 1, left: 2, bottom: 2, right: 3, height: 1, width: 1 },
  //     { top: 1, left: 3, bottom: 2, right: 4, height: 1, width: 1 },
  //   ],
  // },
  {
    label: "两左两右",
    value: "cubeThree",
    icon: "deco-icon-cube",
    row: 2,
    col: 2,
    cubeList: [
      { top: 1, left: 1, bottom: 2, right: 2, height: 1, width: 1 },
      { top: 1, left: 2, bottom: 2, right: 3, height: 1, width: 1 },
      { top: 2, left: 1, bottom: 3, right: 2, height: 1, width: 1 },
      { top: 2, left: 2, bottom: 3, right: 3, height: 1, width: 1 },
    ],
  },
  {
    label: "一左两右",
    value: "cubeFour",
    icon: "deco-icon-cubeto",
    row: 2,
    col: 2,
    cubeList: [
      { top: 1, left: 1, bottom: 3, right: 2, height: 2, width: 1 },
      { top: 1, left: 2, bottom: 2, right: 3, height: 1, width: 1 },
      { top: 2, left: 2, bottom: 3, right: 3, height: 1, width: 1 },
    ],
  },
  {
    label: "一上两下",
    value: "cubeFive",
    icon: "deco-icon-cube-upto",
    row: 2,
    col: 2,
    cubeList: [
      { top: 1, left: 1, bottom: 3, right: 2, height: 1, width: 2 },
      { top: 2, left: 1, bottom: 3, right: 2, height: 1, width: 1 },
      { top: 2, left: 2, bottom: 3, right: 3, height: 1, width: 1 },
    ],
  },
  {
    label: "一左右三",
    value: "cubeSix",
    icon: "deco-icon-cubeto1",
    row: 4,
    col: 4,
    cubeList: [
      { top: 1, left: 1, bottom: 5, right: 3, height: 4, width: 2 },
      { top: 1, left: 3, bottom: 3, right: 3, height: 2, width: 2 },
      { top: 3, left: 3, bottom: 5, right: 4, height: 2, width: 1 },
      { top: 3, left: 4, bottom: 5, right: 5, height: 2, width: 1 },
    ],
  },
  {
    label: "自定义",
    value: "custom",
    icon: "deco-icon-cube-custom",
    row: 4,
    col: 4,
    cubeList: [],
  },
];

/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-10-14 10:53:47
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-07-02 17:10:56
 */

/**
 * 生成id
 * @param length 随机数长度
 * @returns 时间戳 + 随机数
 */
const createId = (length = 8) => {
  let base = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let random = "";
  let timestamp: String = parseInt(new Date().getTime() / 1000) + "";

  for (let i = 0; i < length; i++) {
    let index = parseInt(Math.random() * 61);
    random += base[index];
  }

  return timestamp + random;
};

/**
 * 深拷贝
 */
const cloneDeep = (obj: any) => {
  return cloneDeepFun(obj);
};

// 递归深拷贝对象、
function cloneDeepFun(obj: any, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = cloneDeepFun(obj[key], hash);
    }
  }
  return cloneObj;
}

/**
 * 添加后缀
 * @param str
 * @returns
 */
function addSuffix(str) {
  if (!str) return "";

  return `${str}?v=${createId()}`;
}

/**
 * 注册组件
 * @param app  vue实例
 * @param modules 模块对象
 */
function registeredComponents(app: any, modules: any) {
  for (const path in modules) {
    let pathList = path.split("/");
    let name: string = pathList.pop() as string;
    name = name.replace(/(\.vue)/g, "");

    modules[path]().then((module: any) => {
      app.component(name, module.default);
    });
  }
}
/**
 * 获取页面背景样式
 * @param config 配置对象
 */
function getPagePackgroundStyle(config: any) {
  let result = {};

  if (config) {
    result.backgroundImage = `url(${config.image})`;
    result.backgroundColor = config.color || "#ffffff";

    if (config.mode === "fill") {
      result.backgroundSize = `auto 100%`;
    } else if (config.mode === "tiled") {
      result.backgroundSize = ` 100% auto`;
      result.backgroundRepeat = `repeat`;
    } else if (config.mode === "stretch") {
      result.backgroundSize = `100% 100%`;
      result.backgroundRepeat = `no-repeat`;
    } else {
      result.backgroundSize = ` 100% auto`;
      result.backgroundRepeat = `no-repeat`;
    }
  }

  return result;
}

export {
  createId,
  cloneDeep,
  addSuffix,
  registeredComponents,
  getPagePackgroundStyle,
};

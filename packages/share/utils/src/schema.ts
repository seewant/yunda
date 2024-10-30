/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2022-10-17 15:55:29
 * @LastEditors: WangYuan
 * @LastEditTime: 2023-12-22 14:42:05
 */
import WidgetProps from "@/types/widget.ts";
import { createId, cloneDeep } from "@design/utils";

/**
 * 解析物料Schema，初始化对应物料默认配置值
 * @param schema
 */
function InitializeSchemaModel(schema: any) {
  console.log('schema', schema);
  let { componentName, title, npm, props, configure } = schema;
  let model = { id: createId(8), componentName, title, npm, props: {} };

  setPropsDefaulValue(props, model.props);

  // 如果是Tab物料，继续个性化赋值
  if (configure?.component?.type == "tab") {
    initTabWidget(model, configure);
  }

  console.log("如果是容器物料，进行个性化赋值");
  // 如果是容器物料，进行个性化赋值
  if (configure?.component?.type == "container") {
    model.children = [];
  }

  console.log("model", model);
  return model;
}

// Tab物料个性化赋值
function initTabWidget(model: any, configure: any) {
  console.log("configure", configure);
  console.log("configure?.component?.type", configure?.component?.type);

  // 在扩展配置(configure)中，查找Tab设置器(TabSetter)
  let setter = configure.props.find(
    (item: any) => item.setter.setterName == "TabSetter"
  );

  console.log("setter", setter);
  // 未查找Tab设置器(TabSetter)，停止赋值
  if (!setter) return;

  // 标记物料为Tab物料
  model.type = "tab";
  // 绑定扩展配置(configure)中props对应Tab属性
  setPropsDefaulValue(configure.props, model.props);
  // 根据Tab设置器(TabSetter)初始数据，初始化Tab物料children
  model.children = setter.defaultValue.map((item: any) =>
    initTabPanelWidgetModel(item)
  );
}

// 初始化 TabPanel 物料对象 （因为TabPanel单项属于特殊物料，在构建Ta物料时自动生成TabPanel）
function initTabPanelWidgetModel(item: any) {
  return {
    id: createId(8),
    componentName: "TabPanelWidget",
    props: {
      id: item.id,
    },
    children: [],
  };
}

/**
 * 递归 schems props
 * @param props
 * @param model
 */
function setPropsDefaulValue(props: WidgetProps[], model: any) {
  props.forEach((prop: WidgetProps) => {
    let { name, type, defaultValue, children } = prop;
    model[name] = cloneDeep(defaultValue);
  });
}

export { InitializeSchemaModel, initTabPanelWidgetModel };

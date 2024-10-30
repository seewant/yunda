/*
 * @Description: 设置器联动hook
 * @Autor: WangYuan1
 * @Date: 2024-03-13 10:16:37
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-06-07 14:33:52
 */
import { ref, toRefs, computed, watch } from "vue";

export function useSetterHook(props: any) {
  console.log("props", props);
  let oldEqualValue = "";

  // 控制设置器显隐
  let condition = computed(() => {
    console.log("控制设置器显隐");
    console.log("props?.widget?.props", props.widget);
    if (props?.schema?.condition && props?.widget?.props) {
      return props.schema.condition(props.widget.props);
    }
    return true;
  });

  // 控制设置器设值
  if (props.schema?.extraProps?.setValue) {
    watch(
      () => props.modelValue,
      (newVal) => {
        let newEqualValue = JSON.stringify(newVal);
        console.log("触发了setValue的监听");
        if (newEqualValue != oldEqualValue && props.widget) {
          console.log("props.widget", props.widget);
          props.schema.extraProps.setValue(props.widget, newVal);
        }

        oldEqualValue = newEqualValue;
      },
      { deep: true }
    );
  }

  console.log("condition变化：", condition);
  return {
    condition,
  };
}

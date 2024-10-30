<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-03-15 15:22:25
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-05-08 11:07:52
-->
<template>
  <div class="questionnaire">
    <img class="questionnaire-banner" :src="form?.backgroundImage" />
    <div class="form">
      <div>{{ model }}</div>
      <div v-for="widget in widgetList" :key="widget.id">
        <div class="form-item" :widgetId="widget.id" ref="itemRefs">
          <component
            :is="widget.componentName"
            :widget="widget"
            v-model="model[widget.id]"
          />
          <div class="form-item-error">
            <span v-show="errorWidgetId == widget.id">请输入内容</span>
          </div>
        </div>
      </div>
      <div class="form-submit" @click="submit">提交</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from "vue";

const props = defineProps({
  form: {
    type: String,
    default: () => "",
  },
});

let errorWidgetId = ref("");
const itemRefs = ref([]);
const model = ref({});
// 物料列表
const widgetList = computed(() => props.form?.widgetList || []);

// 表单物料列表
const formWidgetList = computed(
  () =>
    widgetList.value.filter((item) => item?.configure?.component?.isFrom) || []
);

// 初始化form对象
setTimeout(() => {
  initModel();
}, 10);

const initModel = () => {
  formWidgetList.value.forEach((widget) => {
    console.log("widget", widget);
    model.value[widget.id] = widget?.configure?.component?.defaultValue;
  });
  console.log("model.value", model.value);
};

const submit = () => {
  checkForm();
};

// 校验表单必输
const checkForm = () => {
  console.log("widgetList.value", widgetList.value);
  let formRequiredWidgetList = formWidgetList.value.filter(
    (item) => item?.props?.required
  );

  for (let widget of formRequiredWidgetList) {
    const { id, componentName } = widget;
    const value = model.value[id];

    if (["FormCheckboxWidget"].includes(componentName)) {
      // 校验数组类型值
      if (!value.length) {
        // console.log("校验未通过");
        // console.log("widget", widget);
        handleError(widget.id);
        return;
      }
    } else {
      // 校验字符串类型值
      if (!value) {
        // console.log("校验未通过");
        // console.log("widget", widget);
        handleError(widget.id);
        return;
      }
    }
  }
};

// 表单校验报错
const handleError = (id) => {
  // 标记表单单项报错
  errorWidgetId.value = id;
  // 查询对应表单单项dom,并滚动至目标
  const node = itemRefs.value.find((item) => {
    return item?.getAttribute("widgetId") == id;
  });
  node?.scrollIntoView({ behavior: "smooth" });
};
</script>

<style lang="scss" scoped>
::v-deep .item {
  padding: 10px 0 0 0;
}

.questionnaire {
  position: relative;

  .questionnaire-banner {
    position: relative;
    width: 100%;
    z-index: -1;
  }

  .form {
    margin-top: -20px;
    background: #ffffff;
    border-radius: 20px 20px 0 0;
    padding: 36px 24px 30px;

    .form-title {
      font-size: 20px;
      margin-bottom: 8px;
    }

    .form-description {
      margin-bottom: 30px;
      font-size: 14px;
      line-height: 23px;
      color: #666666;
      white-space: pre-wrap;
    }
    .form-item {
      .form-item-error {
        height: 30px;
        color: #ff6d56;
        font-size: 14px;
        font-weight: 400;
        margin-top: 8px;
      }
    }

    .form-submit {
      height: 48px;
      line-height: 48px;
      border-radius: 4px;
      margin: 38px auto 0;
      text-align: center;
      font-size: 18px;
      color: #fff;
      background: #6782ff;
    }

    .form-sign {
      height: 95px;
      line-height: 95px;
      text-align: center;
      font-size: 13px;
      color: #666;
    }
  }
}
</style>

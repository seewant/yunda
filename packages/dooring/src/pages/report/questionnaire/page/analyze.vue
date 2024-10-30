<template>
  <div class="w-1200 mr-auto ml-auto pb-150" v-design-loading="!complete">
    <div class="pt-28 pb-20">
      <div class="mb-10 text-18">题目分析</div>
      <div class="text-12 c-#999999">支持单选、多选、评价题型的题目分析</div>
    </div>
    <div v-if="widgetList.length">
      <div v-for="(widget, index) in widgetList" :key="index">
        <div
          v-if="
            [
              'FormRadioWidget',
              'FormCheckboxWidget',
              'FormRateWidget',
            ].includes(widget.componentName)
          "
          class="p-24 rd-8 mb-20 border-1 border-solid border-#eff1f4"
        >
          <div class="h-30 lh-30 text-14 c-#333">
            Q{{ widget.index }}.{{ widget?.props?.label }}
          </div>

          <div class="mt-8 mb-20 c-#999">
            {{ getTypeName(widget.componentName) }}题 / 回答人数 1
          </div>

          <div class="flex justify-between">
            <div ref="chartRefs" class="w-570 h-310"></div>
            <el-table
              :data="widget.analyzeList"
              border
              class="w-560"
              :header-cell-style="{
                color: '#000',
                backgroundColor: '#f7f8fa',
                fontSize: '14px',
                fontWeight: 400,
              }"
            >
              <el-table-column prop="name" label="选项" width="320" />
              <el-table-column prop="value" label="选择次数" width="120" />
              <el-table-column
                prop="percentText"
                label="选择次数"
                width="120"
              />
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <el-empty
      v-else
      class="mt-150"
      image="https://s0.wenjuan.com/wj-reportfed/367da81a/img/no-data.eae7866b.png"
      :image-size="200"
      description="未有题型满足分析"
    />
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { http } from "@/utils/http";
import { useRoute, useRouter } from "vue-router";
import { ref, reactive, toRefs, defineProps, computed } from "vue";
import Constants from "@/constants/index";

const route = useRoute();
const { id, type } = route.query;
const chartRefs = ref([]);
let complete = ref(false);
let widgetList = ref([]);

init();

async function init() {
  await http.post("/questionnaire/getDetailById", { id }).then((res) => {
    let list = res.data?.widgetList
      .map((widget, index) => ({ ...widget, index: ++index }))
      // 筛选单选、多选、评价题型
      ?.filter((widget) =>
        ["FormRadioWidget", "FormCheckboxWidget", "FormRateWidget"].includes(
          widget.componentName
        )
      )
      // 根据options选项列表，创建analyze统计对象，用于后续数据累加统计
      .map((widget) => {
        if (
          ["FormRadioWidget", "FormCheckboxWidget"].includes(
            widget.componentName
          )
        ) {
          widget.analyze = widget?.props?.options.reduce((pre, cur) => {
            pre[cur.id] = 0;
            return pre;
          }, {});
        }

        // 评分固定添加1-5
        if (widget.componentName == "FormRateWidget") {
          widget.analyze = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
          };
        }

        return widget;
      });
    widgetList.value = list;
  });

  await http
    .post("/questionnaireData/getForPage", { questionnaireId: id })
    .then((res) => {
      let list = res.data.list;
      // 遍历填报数据，整合每项填报数量
      list.map((item, index) => {
        widgetList.value.map((widget) => {
          // 单选 / 评分
          if (
            ["FormRadioWidget", "FormRateWidget"].includes(widget.componentName)
          ) {
            let key = item?.data[widget?.id];
            widget.analyze[key] += 1;
          }

          // 多选
          if (widget.componentName == "FormCheckboxWidget") {
            let keys = item?.data[widget?.id];
            keys.map((key) => {
              widget.analyze[key] += 1;
            });
          }
        });
      });

      // 修改统计格式，改为统计列表
      widgetList.value.map((widget) => {
        widget.analyzeList = Object.entries(widget.analyze).map(
          ([key, value]) => {
            let temp = {
              name: "",
              percentText: 0,
              value,
            };
            if (
              ["FormRadioWidget", "FormCheckboxWidget"].includes(
                widget.componentName
              )
            ) {
              temp.name = widget?.props?.options?.find(
                (op) => op.id == key
              )?.label;
            }

            if (widget.componentName == "FormRateWidget") {
              temp.name = Constants.RateObject[key];
            }

            let total = Object.values(widget.analyze).reduce(
              (total, value) => total + value,
              0
            );

            let percent = total == 0 ? 0 : ((value / total) * 100).toFixed(1);
            temp.percentText = `${percent}%`;

            return temp;
          }
        );
      });
    });

  widgetList.value.map((widget, index) => {
    initChart(index);
  });

  complete.value = true;
}

function initChart(index) {
  const widget = widgetList.value[index];
  console.log("widget", widget);
  const chartInstance = echarts.init(chartRefs.value[index]);

  // 定义颜色数组
  const colors = [
    "#97b7ff",
    "#588cf4",
    "#85d1f4",
    "#cceaf7",
    "#8bcde8",
    "#b6cdff",
    "#8aaff7",
    "#aadff7",
    "#dbf0f9",
    "#aedcef",
  ];

  const option = {
    backgroundColor: "#fbfbfc", // 设置背景颜色
    tooltip: {
      trigger: "item",
      formatter: (params) => {
        // 使用回调函数的方式来自定义tooltip的内容
        return `${params.name}<br/>${params.data.percentText} (${params.data.value})`;
      },
      extraCssText: "font-size: 12px; border-color: transparent;padding:5px;", // 设置字体大小和边框颜色为透明
    },
    legend: {
      orient: "horizontal", // 图例的方向
      x: "center", // 图例的水平位置
      y: 275, // 图例的垂直位置，使用具体像素值
      data: widget?.analyzeList?.map((item) => item.name) || [], // 图例数据
      icon: "circle", // 图例项的图标类型
      itemWidth: 7, // 图例项的宽度
      itemHeight: 7, // 图例项的高度
    },
    color: colors, // 在根级别设置颜色
    series: [
      {
        type: "pie",
        radius: ["35%", "57%"], // 设置内半径和外半径
        center: ["50%", "48%"],
        data: widget?.analyzeList || [],
        label: {
          show: true, // 显示标签
          formatter: (params) => {
            // 使用回调函数的方式来自定义标签内容
            return `${params.name}  {percent|${params.data.percentText}}`;
          },
          rich: {
            // 富文本配置
            percent: {
              color: "#b6b6b7", // 设置百分比颜色
              align: "right", // 右对齐百分比文字
            },
          },
        },
        labelLine: {
          show: true, // 隐藏标签线
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 2,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.8)",
          },
        },
      },
    ],
  };

  chartInstance.setOption(option);

  // 监听窗口大小变化
  window.addEventListener("resize", () => chartInstance.resize());
}

// 获取类型文本
function getTypeName(type) {
  switch (type) {
    case "FormRadioWidget":
      return "单选";
    case "FormCheckboxWidget":
      return "多选";
    case "FormRateWidget":
      return "评分";
    default:
      return "未知类型";
  }
}
</script>

<style lang="scss" scoped></style>

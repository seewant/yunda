<template>
  <div class="w-1200 mr-auto ml-auto pb-100" v-design-loading="!complete">
    <div class="flex justify-between items-center h-72">
      <span class="text-18">数据概况</span>
    </div>

    <!-- 总览 -->
    <div class="p-24 rd-8 mb-20 border-1 border-solid border-#eff1f4">
      <div class="h-30 lh-30 text-14 c-#333">数据概况</div>
      <div class="mt-16 mb-16 flex justify-around items-center">
        <div class="flex flex-col justify-center items-center">
          <div class="c-#999">今日新增</div>
          <div class="mt-8 h-36 lh-36 c-#2672ff text-30 font-700">
            {{ overview.todayNum }}
          </div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="c-#999">数据总量</div>
          <div class="mt-8 h-36 lh-36 c-#2672ff text-30 font-700">
            {{ overview.totalNum }}
          </div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="c-#999">题目数</div>
          <div class="mt-8 h-36 lh-36 c-#00000 text-30 font-700">
            {{ overview.topicNum }}
          </div>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="c-#999">今日占比</div>
          <div class="mt-8 h-36 lh-36 c-#00000 text-30 font-700">
            {{ overview.todayPercent }}%
          </div>
        </div>
      </div>
    </div>

    <!-- 走势图 -->
    <div class="p-24 rd-8 mb-20 border-1 border-solid border-#eff1f4">
      <div class="h-30 lh-30 text-14 c-#333">近30日数据走势图</div>
      <div ref="lineRef" style="width: 100%; height: 400px"></div>
    </div>

    <!-- 题型分析 -->
    <div class="p-24 rd-8 mb-20 border-1 border-solid border-#eff1f4">
      <div class="h-30 lh-30 text-14 c-#333">题型分析</div>
      <div class="flex justify-between">
        <div ref="pieRef" class="w-570 h-310"></div>
        <el-table
          :data="questionTypes"
          border
          class="w-560"
          :header-cell-style="{
            color: '#000',
            backgroundColor: '#f7f8fa',
            fontSize: '14px',
            fontWeight: 400,
          }"
        >
          <el-table-column prop="name" label="题型" width="320" />
          <el-table-column prop="value" label="数量" width="120" />
          <el-table-column prop="percentText" label="比例" width="120" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { http } from "@/utils/http";
import { useRoute, useRouter } from "vue-router";
import { ref, reactive, toRefs, defineProps, computed } from "vue";
import * as echarts from "echarts";
import dayjs from "dayjs";

const route = useRoute();
const { id, type } = route.query;
const lineRef = ref(null);
const pieRef = ref(null);
let complete = ref(false);
let form = ref({});
let formData = ref([]);
const daysList = ref(generateThirtyDaysArray());
const overview = ref({
  todayNum: 0,
  totalNum: 0,
  topicNum: 0,
  todayPercent: 0,
});
const questionTypes = ref([
  {
    name: "单选",
    componentName: "FormRadioWidget",
    value: 0,
  },
  {
    name: "多选",
    componentName: "FormCheckboxWidget",
    value: 0,
  },
  {
    name: "填空",
    componentName: "FormInputWidget",
    value: 0,
  },
  {
    name: "评分",
    componentName: "FormRateWidget",
    value: 0,
  },
  {
    name: "日期",
    componentName: "FormDateWidget",
    value: 0,
  },
  {
    name: "意见反馈",
    componentName: "FormTextareaWidget",
    value: 0,
  },
]);

init();

async function init() {
  await getDetailById();

  await getList();

  initLineChart();

  initPieChart();

  complete.value = true;
}

// 获取问卷详情
async function getDetailById() {
  await http.post("/questionnaire/getDetailById", { id }).then((res) => {
    console.log(res);
    form.value = res.data;

    overview.value.topicNum = form.value.widgetList.length;

    form.value.widgetList.map((item) => {
      let index = questionTypes.value.findIndex(
        (type) => type.componentName === item.componentName
      );
      if (index !== -1) {
        questionTypes.value[index].value++;
      }
    });

    questionTypes.value.map((item) => {
      item.percentText = `${(
        (item.value / overview.value.topicNum) *
        100
      ).toFixed(1)}%`;
    });

    questionTypes.value = questionTypes.value.filter((item) => item.value > 0);
  });
}

// 获取问卷用户数据
async function getList() {
  await http
    .post("/questionnaireData/getList", { questionnaireId: id })
    .then((res) => {
      formData.value = res.data.list;
      // 数据总量
      overview.value.totalNum = formData.value.length;

      formData.value.forEach((item) => {
        const index = daysList.value.findIndex(
          (day) => day.date === item.createTime
        );
        if (index !== -1) {
          daysList.value[index].value++;
        }
      });

      overview.value.todayNum = formData.value.filter(
        (item) => item.createTime == dayjs().format("YYYY-MM-DD")
      ).length;

      overview.value.todayPercent =
        overview.value.totalNum == 0
          ? 0
          : ((overview.value.todayNum / overview.value.totalNum) * 100).toFixed(
              1
            );
    });
}

// 走势图图表
function initLineChart() {
  const myChart = echarts.init(lineRef.value);

  const option = {
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: daysList.value.map((item) => item.date),
    },
    yAxis: {
      type: "value",
      min: 0, // 设置 y 轴最小值为 0
      max: 10,
      minInterval: 1, // 确保 y 轴的最小间隔为 1
    },
    series: [
      {
        name: "数据",
        type: "line",
        smooth: true,
        symbol: "none",
        sampling: "average",
        data: daysList.value.map((item) => item.value),
      },
    ],
  };

  myChart.setOption(option);
}

// 饼图图表
function initPieChart() {
  const myChart = echarts.init(pieRef.value);

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
      data: questionTypes.value.map((item) => item.name) || [], // 图例数据
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
        data: questionTypes.value || [],
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

  myChart.setOption(option);
}

function generateThirtyDaysArray() {
  return Array.from({ length: 30 }, (item, i) => ({
    date: dayjs()
      .subtract(29 - i, "day")
      .format("YYYY-MM-DD"),
    value: 0,
  }));
}
</script>

<style lang="scss" scoped></style>

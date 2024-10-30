<!--
 * @Description: 平台简介
 * @Autor: WangYuan1
 * @Date: 2023-01-30 14:37:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-09-05 10:10:35
-->
<template>
  <div class="introduction">
    <div class="introduction-left">
      <div class="area">
        <ul class="area-meau">
          <li
            v-for="(item, index) in introductionList"
            :key="index"
            class="area-meau-item"
            :class="index == cuur ? 'important-opacity-100' : ''"
            @click="changeMeau(index)"
          >
            <img :src="item.icon" />
            <span>{{ item.meau }}</span>
          </li>
        </ul>
        <video
          class="w-full h-540px rd-16px"
          :src="cuurVideo"
          muted
          autoplay
          loop
        ></video>
      </div>
    </div>
    <div class="introduction-right">
      <div
        v-for="(item, index) in introductionList"
        :key="index"
        class="introduction-right-item"
      >
        <div>
          <h2 class="text-20 font-800 mb-50px leading-48px">
            {{ item.title }}
          </h2>
          <p>
            {{ item.description }}
          </p>
        </div>
        <div class="evaluation">
          {{ item.evaluation }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as lodash from "lodash";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

let cuur = ref("0");
const location: any = {
  0: 1230,
  1: 2040,
  2: 2870,
  3: 3690,
  4: 4520,
};
const introductionList = [
  {
    meau: "界面设计",
    title: "专业、智能的界面设计，让想法轻松呈现",
    description:
      "专业的界面设计，满足所有创意需求。自动布局、素材填充等智能功能，让设计师有更多时间捕捉灵感。",
    evaluation:
      "MasterGo 的界面设计一贯保持较好的易用性、美观性，其功能覆盖涉及多个角色环节，是在线设计工具本土化的经典工具之一。",
    icon: "https://mastergo.com/images/home/interface.svg",
    video:
      "https://static.mastergo.com/mainsite/334580e0/public/images/home/interface.mp4",
  },
  {
    meau: "交互原型",
    title: "交互原型，快速还原产品真实体验",
    description:
      "连接界面、设置交互事件，快速模拟产品使用流程。还有智能动画功能，创建原型从未如此简单。",
    evaluation:
      "通过简单的交互操作设置，无缝完成从设计到动态原型演示的切换，高效预览沉浸式使用效果。",
    icon: "https://mastergo.com/images/home/proto.svg",
    video:
      "https://static.mastergo.com/mainsite/334580e0/public/images/home/proto.mp4",
  },
  {
    meau: "设计系统",
    title: "设计系统，高效管理资源，规范全局设计",
    description:
      "设计资源高效管理，设计组件一键复用，实现一处修改全局同步。还有颜色和文本样式，轻松规范全局设计。",
    evaluation:
      "MasterGo 通过结合使用场景和核心需求来打造的设计系统，从更高的格局和定位去重新确立设计的方向和价值。",
    icon: "https://mastergo.com/images/home/sys.svg",
    video:
      "https://static.mastergo.com/mainsite/334580e0/public/images/home/sys.mp4",
  },
  {
    meau: "团队协作",
    title: "随时随地团队协作，团队能效超乎想象",
    description:
      "只需一个链接，即可让设计师一起创作，产品经理在线评审，工程师查看代码。团队成员汇聚一处，团队协作更轻松。",
    evaluation:
      "MasterGo 不仅提升了设计师个人效率，同时也大大提升了团队协作和多场景办公的效率，是值得体验的、实用的好产品。",
    icon: "https://mastergo.com/images/home/cooperation.svg",
    video:
      "https://static.mastergo.com/mainsite/334580e0/public/images/home/cooperation.mp4?v=v1.0.54",
  },
  {
    meau: "设计交付",
    title: "设计交付，实时更新让想法更快变成现实",
    description:
      "设计文件云端存储，实时更新。工程师可以随时查看标注、获取代码、下载切图。设计自动交付，研发轻松高效。",
    evaluation:
      "使用 MasterGo，只需要一个链接即可同步所有创作。工作流程的改变给整个设计团队及上下游团队的效率带来变革性提升。",
    icon: "https://mastergo.com/images/home/deliver.svg",
    video:
      "https://static.mastergo.com/mainsite/334580e0/public/images/home/deliver.mp4?v=v1.0.54",
  },
];

// 当前菜单视频
const cuurVideo = computed(() => {
  return introductionList[cuur.value]?.video;
});

// 注册滚动监听
onMounted(() => {
  window.addEventListener("scroll", throttleHandleScroll);
});

// 注销滚动监听
onBeforeUnmount(() => {
  window.removeEventListener("scroll", throttleHandleScroll);
});

// 切换菜单
function changeMeau(index: number) {
  cuur.value = index;

  // 跳转响应简介位置
  window.scrollTo({
    top: location[index],
    behavior: "smooth",
  });
}

// 节流滚动事件
function throttleHandleScroll() {
  lodash.throttle(handleScroll, 10)();
}

// 滚动事件，寻找对应菜单
function handleScroll() {
  let scroll = document.documentElement.scrollTop || document.body.scrollTop;
  for (let i = 4; i >= 0; i--) {
    if (scroll >= location[i] - 200) {
      cuur.value = i;
      break;
    }
  }
}
</script>

<style lang="scss" scoped>
.introduction {
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin: 0 auto;
  background: #ffffff;

  .introduction-left {
    width: 720px;
    .area {
      position: sticky;
      top: 0px;
      right: 0px;
      width: 720px;

      min-height: calc(100vh - 40px);
      padding-top: 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;

      .area-meau {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 0 70px;
        margin-bottom: 40px;
        box-sizing: border-box;

        .area-meau-item {
          font-size: 16px;
          font-weight: 700;
          opacity: 0.4;
          transition: all 0.5s;
          cursor: pointer;
        }
      }
    }
  }

  .introduction-right {
    .introduction-right-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 400px;
      height: 520px;
      margin-top: 300px;
      margin-left: 76px;
      background: #ffffff;

      &:last-child {
        margin-bottom: 315px;
      }

      p {
        margin: 24px 0;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        color: #00000080;
      }

      .evaluation {
        padding: 24px 32px 24px 24px;
        background: #ffffff;
        box-shadow: 0 10px 30px #0000001a;
        border-radius: 16px;
      }
    }
  }
}
</style>

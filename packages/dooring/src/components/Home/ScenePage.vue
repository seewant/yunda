<template>
  <div class="custom-page">
    <div class="left">
      <div class="sub-title">多种场景自由选择</div>
      <div class="small-des">小程序、H5、问卷、图文任意搭建</div>
      <!-- <div class="progress"></div> -->
      <div class="symbol-box">
        <div class="symbol-item">
          <span class="symbol"></span
          ><span class="symbol-des">开发效率max</span>
        </div>
        <div class="symbol-item">
          <span class="symbol"></span
          ><span class="symbol-des">上手零学习成本</span>
        </div>
        <div class="symbol-item">
          <span class="symbol"></span
          ><span class="symbol-des">海量设计模板</span>
        </div>
        <div class="symbol-item">
          <span class="symbol"></span
          ><span class="symbol-des">多场景满足需求</span>
        </div>
      </div>
      <div class="button" @click="router.push({ name: 'my-create' })">
        <span class="buttom-name">立即体验</span
        ><span class="buttom-icon"></span>
      </div>
    </div>
    <div class="right">
      <img
        width="615"
        height="441"
        :src="list.find((item) => item.type === active)?.image"
        lazy="loaded"
      />
      <div class="nav-button">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="button-item"
          :class="{ active: item.type === active }"
          @click="active = item.type"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
let active = ref("wechat");
const list = ref([
  {
    name: "小程序",
    type: "wechat",
    image: "https://www.chuangkit.com/distweb/img/custom-1.58a01367.png",
  },
  {
    name: "H5",
    type: "h5",
    image: "https://www.chuangkit.com/distweb/img/custom-3.077a3e92.png",
  },
  {
    name: "问卷",
    type: "questionnaire",
    image: "https://www.chuangkit.com/distweb/img/custom-4.a281cd75.png",
  },
  {
    name: "图文",
    type: "article",
    image: "https://www.chuangkit.com/distweb/img/custom-5.a33165d7.png",
  },
]);
</script>

<style lang="scss" scoped>
.custom-page {
  width: 100%;
  height: 840px;
  padding: 0 136px;
  background: #fafafa;
  background-image: url(https://www.chuangkit.com/distweb/img/dot-img.eb626201.svg);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .left {
    .sub-title {
      font-size: 48px !important;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
    }
    .small-des {
      margin-bottom: 100px;
      font-size: 16px !important;
      font-weight: 400;
      color: #505a71;
      margin-top: 32px;
    }

    .progress {
      width: 505px;
      height: 72px;
      margin-bottom: 72px;
      background-image: url(https://www.chuangkit.com/distweb/img/progress.ae17fb45.svg);
      background-size: cover;
      background-repeat: no-repeat;
    }

    .symbol-box {
      width: 415px;
      height: 80px;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      justify-content: flex-start;
      margin-bottom: 102px;

      .symbol-item {
        width: 50%;
        display: flex;
        align-items: baseline;

        .symbol {
          width: 10px;
          height: 10px;
          margin-right: 16px;
          display: inline-block;
          background-image: url(https://www.chuangkit.com/distweb/img/symbol.4748e2d0.svg);
          background-size: contain;
          background-repeat: no-repeat;
        }

        .symbol-des {
          color: #1b2337;
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 72px;
        }
      }
    }

    .button {
      width: 195px;
      height: 80px;
      border-radius: 50px;
      border: 2px solid #000;
      box-shadow: 0 16px 32px 0 rgba(0, 0, 0, 0.05);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:hover {
        color: #fff;
        background: var(--1, #1b2337);
        box-shadow: 0 16px 32px 0 rgba(0, 0, 0, 0.05);

        .buttom-icon {
          background-image: url(https://www.chuangkit.com/distweb/img/enter-white.5b605156.svg) !important;
        }
      }

      .buttom-name {
        font-size: 15px;
        font-weight: 500;
      }
      .buttom-icon {
        width: 27px;
        height: 24px;
        margin-left: 24px;
        display: inline-block;
        background-image: url(https://www.chuangkit.com/distweb/img/enter-black.14c06d3f.svg);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50%;
      }
    }
  }

  .right {
    width: 551px;
    height: 611px;
    background-image: url(https://www.chuangkit.com/distweb/img/custom-bg.d984b5af.svg);
    background-size: cover;
    background-repeat: no-repeat;
    margin-left: 32px;

    img {
      margin-top: 66px;
      margin-left: 30px;
    }

    .nav-button {
      width: 400px;
      height: 48px;
      display: flex;
      justify-content: space-between;
      margin-left: 120px;

      .button-item {
        width: 86px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        color: #1b2337;
        font-size: 14px;
        font-weight: 500;
        border-radius: 8px 8px 0 0;
        border: 2px solid #fff;
        background: hsla(0, 0%, 100%, 0.35);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05);
        cursor: pointer;
      }

      .active {
        color: #3461ff;
      }
    }
  }
}
</style>

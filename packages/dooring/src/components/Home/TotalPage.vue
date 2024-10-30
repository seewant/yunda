<template>
  <div class="data-box">
    <div class="rotate-container-res">
      <div class="block-1"></div>
      <div class="block-3"></div>
    </div>
    <div class="content-box">
      <div class="left">
        <div class="sub-title">云搭，让产品触手可得</div>
        <div class="small-des">小程序、H5、问卷、图文，有手就行!</div>
        <div class="button" @click="router.push({ name: 'my-create' })">
          <span class="buttom-name">开始设计</span
          ><span class="buttom-icon"></span>
        </div>
      </div>
      <div class="right">
        <div class="num-container">
          <div><span class="number">1000</span><span class="unit">+</span></div>
          <div class="number-title">累计注册用户</div>
        </div>
        <div class="num-container">
          <div><span class="number">1000</span><span class="unit">+</span></div>
          <div class="number-title">累计创建作品</div>
        </div>
        <div class="num-container">
          <div><span class="number">100</span><span class="unit">+</span></div>
          <div class="number-title">高品质原创模板</div>
        </div>
        <div class="num-container">
          <div><span class="number">1</span><span class="unit">亿+</span></div>
          <div class="number-title">版权素材</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style lang="scss" scoped>
.data-box {
  width: 100%;
  height: 561px;
  background-color: #f5f7fd;
  position: relative;

  .rotate-container-res {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;

    .block-1 {
      position: absolute;
      top: 30%;
      left: 70%;
      width: 810px;
      height: 593.875px;
      background-image: url(https://www.chuangkit.com/distweb/img/block-1.d81e1a8f.svg);
      background-size: contain;
      background-repeat: no-repeat;
      animation: rotate1 20s ease-in-out infinite;
    }

    .block-3 {
      position: absolute;
      top: -130%;
      left: -10%;
      width: 1412px;
      height: 978px;
      background-image: url(https://www.chuangkit.com/distweb/img/block-3.f869b342.svg);
      background-size: contain;
      background-repeat: no-repeat;
      -webkit-filter: blur(60px);
      filter: blur(60px);
      animation: rotate2 20s ease-in-out infinite;
    }

    /* 动画 */
    @keyframes rotate1 {
      0% {
        transform: translate(0) rotate(0deg);
      }
      50% {
        transform: translate(321px, -626px) rotate(180deg);
      }
      100% {
        transform: translate(0) rotate(0deg);
      }
    }

    @keyframes rotate2 {
      0% {
        transform: translate(0) rotate(0deg);
      }
      50% {
        transform: translate(449px, 1132px) rotate(180deg);
      }
      100% {
        transform: translate(0) rotate(0deg);
      }
    }
  }

  .content-box {
    width: 100%;
    height: 100%;
    padding: 130px 136px;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-around;

    .left {
      display: flex;
      flex-direction: column;

      .sub-title {
        font-size: 48px;
        font-weight: 400;
      }

      .small-des {
        font-size: 16px;
        font-weight: 400;
        color: #505a71;
        margin-top: 32px;
        margin-bottom: 80px;
      }

      .button {
        width: 270px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        border: 2px solid #000;
        cursor: pointer;
        box-shadow: 0 16px 32px 0 rgba(0, 0, 0, 0.05);

        &:hover {
          color: #fff;
          background: var(--1, #1b2337);
          box-shadow: 0 16px 32px 0 rgba(0, 0, 0, 0.05);

          .buttom-icon {
            background-image: url(https://www.chuangkit.com/distweb/img/enter-white.5b605156.svg) !important;
          }
        }

        .buttom-name {
          font-size: 26px;
          font-weight: 500;
        }
        .buttom-icon {
          width: 37px;
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
      width: 53%;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      .num-container {
        padding: 0;
        margin: 0;
        font-size: 14px;

        .number {
          font-size: 64px;
          font-weight: 400;
        }

        .unit {
          color: #1b2337;
          font-size: 16px;
          font-weight: 400;
        }

        .number-title {
          color: #505a71;
          font-size: 14px;
          font-weight: 400;
          margin-top: 24px;
        }
      }
    }
  }
}
</style>

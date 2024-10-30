<template>
  <div class="frist-page">
    <div class="w-full h-953 bg-#f5f7fd relative">
      <div class="w-full h-full overflow-hidden absolute">
        <div class="block-1"></div>
        <div class="block-2"></div>
        <div class="block-3"></div>
      </div>
      <div class="first-page-container">
        <div class="first-page-left">
          <span class="title">云搭万物</span>
          <span class="des">零代码搭建小程序、H5、问卷、图文，有手就行！</span>
          <div class="button" @click="router.push({ name: 'my-create' })">
            <span class="buttom-name">开始设计</span>
            <span class="buttom-icon"></span>
          </div>
        </div>
        <div class="first-page-right">
          <img
            src="../../assets/show.jpg"
            class="w-full h-full rd-24"
            autoplay="autoplay"
            loop="loop"
            muted="muted"
          />
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
.frist-page {
  .first-page-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-family: PingFang SC;
    color: #1b2337;

    .first-page-left {
      width: 31%;
      display: flex;
      margin-top: 32px;
      flex-direction: column;
      .title {
        font-size: 64px;
        font-weight: 400;
      }
      .des {
        font-size: 24px;
        font-weight: 400;
        margin-top: 38px;
        margin-bottom: 120px;
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
    .first-page-right {
      width: 46%;
      height: auto;
      padding: 10px;
      background-color: #fff;
      box-shadow: 0 8px 40px 0 rgba(0, 0, 0, 0.05);
      border-radius: 24px;
      overflow: hidden;
    }
  }
  .block-1 {
    width: 42%;
    height: 64%;
    position: relative;
    top: 40%;
    left: -10%;
    background-image: url(https://www.chuangkit.com/distweb/img/block-1.d81e1a8f.svg);
    background-size: contain;
    background-repeat: no-repeat;
    animation: rotate1 20s ease-in-out infinite;
  }

  .block-2 {
    position: relative;
    top: -150%;
    background-size: contain;
    background-repeat: no-repeat;
    -webkit-filter: blur(60px);
    filter: blur(60px);
    width: 44%;
    height: 76%;
    left: -7%;
    background-image: url(https://www.chuangkit.com/distweb/img/block-2.2ab6b353.svg);
    animation: rotate2 20s ease-in-out infinite;
  }

  .block-3 {
    position: relative;
    top: -150%;
    background-size: contain;
    background-repeat: no-repeat;
    filter: blur(60px);
    width: 73%;
    height: 100%;
    left: 60%;
    background-image: url(https://www.chuangkit.com/distweb/img/block-3.f869b342.svg);
    animation: rotate3 20s ease-in-out infinite;
  }

  /* 动画 */
  @keyframes rotate1 {
    0% {
      transform: translate(0) rotate(0deg);
    }
    50% {
      transform: translate(437px, 210px) rotate(180deg);
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
      transform: translate(679px, 252px) rotate(180deg);
    }
    100% {
      transform: translate(0) rotate(0deg);
    }
  }

  @keyframes rotate3 {
    0% {
      transform: translate(0) rotate(0deg);
    }
    50% {
      transform: translate(29px, 793px) rotate(180deg);
    }
    100% {
      transform: translate(0) rotate(0deg);
    }
  }
}
</style>

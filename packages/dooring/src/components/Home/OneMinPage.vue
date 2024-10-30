<template>
  <div class="one-min-page">
    <div class="sub-title">一分钟搭建生成</div>
    <div class="small-des">简单、快速、有手就行！</div>
    <div class="one-min-page-center">
      <div class="row">
        <div class="img-box">
          <img :src="CodeImage" lazy="loaded" />
        </div>
        <div class="img-box">
          <img :src="WidgetImage" lazy="loaded" />
        </div>
      </div>
      <div class="row">
        <div class="img-box important-w-446">
          <img :src="LayoutImage" lazy="loaded" />
        </div>
        <div class="img-box important-w-296">
          <img :src="FormImage" lazy="loaded" />
        </div>
        <div class="img-box important-w-296">
          <img :src="AssetsImage" lazy="loaded" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LayoutImage from "@/assets/home/layout.png";
import WidgetImage from "@/assets/home/widget1.png";
import CodeImage from "@/assets/home/code.png";
import AssetsImage from "@/assets/home/assets.png";
import FormImage from "@/assets/home/form.png";
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}

.one-min-page {
  width: 100%;
  height: 976px;
  background: #fafafa;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: 80px;

  .sub-title {
    font-size: 48px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
  }

  .small-des {
    font-size: 16px;
    font-weight: 400;
    color: #505a71;
    margin-top: 32px;
    margin-bottom: 96px;
  }

  .one-min-page-center {
    width: 1084px;
    height: 576px;

    .row {
      width: 100%;
      height: 276px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;

      .img-box {
        width: 530px;
        position: relative;
        cursor: pointer;
        border-radius: 32px;
        overflow: hidden;
        background: linear-gradient(100deg, #e4e8f5, #f5f7fd);

        .pic-des {
          font-family: PingFang SC;
          font-style: normal;
          position: absolute;
          left: 32px;
          color: #1b2337;
          text-align: center;
          font-size: 16px;
          font-weight: 600;
          top: 192px;
        }

        .sub-pic-des {
          font-family: PingFang SC;
          font-style: normal;
          position: absolute;
          left: 32px;
          color: #8693ab;
          font-size: 14px;
          font-weight: 400;
          top: 224px;
        }

        .try-now-button {
          width: 164px;
          height: 70px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50px;
          background: hsla(0, 0%, 100%, 0.85);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.16);
          color: #1b2337;
          font-size: 16px;
          font-weight: 500;
          text-align: center;
          line-height: 70px;
          cursor: pointer;
          display: none;
        }
      }
    }
  }
}
</style>

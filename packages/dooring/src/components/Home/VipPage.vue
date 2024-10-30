<template>
  <div class="vip-info-page">
    <div class="sub-title">为用户量身打造专属版本</div>
    <div class="small-des">满足不同用户需求，会员畅享专属授权保障</div>
    <div class="vip-item-box">
      <div class="vip-item">
        <div class="vip-item-title">
          <span>免费版</span
          ><img
            class="w-21 h-21 ml-10"
            src="https://www.chuangkit.com/distweb/img/free.f5700345.svg"
            lazy="loaded"
          />
        </div>
        <div class="vip-item-des">适合于个人体验学习使用，在线编辑设计</div>
        <div
          class="vip-item-button"
          style="color: rgb(7, 115, 252); border: 1px solid rgb(7, 115, 252)"
        >
          免费使用
        </div>
      </div>
      <div class="vip-item">
        <div class="vip-item-title">
          <span>通用版</span
          ><img
            class="w-21 h-21 ml-10"
            src="https://www.chuangkit.com/distweb/img/standard.7d8ef1a2.svg"
            lazy="loaded"
          />
        </div>
        <div class="vip-item-des">
          适合个人或企业1人使用，畅享无水印高清下载
        </div>
        <div
          class="vip-item-button"
          style="
            background: linear-gradient(90deg, #ff6464, #fa2424);
            color: #ffffff;
            border: 0;
          "
        >
          限时优惠
        </div>
      </div>
      <div class="vip-item">
        <div class="vip-item-title">
          <span>协作版</span
          ><img
            class="w-21 h-21 ml-10"
            src="https://www.chuangkit.com/distweb/img/premium.22202d05.svg"
            lazy="loaded"
          />
        </div>
        <div class="vip-item-des">
          适合10人以内团队使用，资源共享/在线协作/品牌管制
        </div>
        <div
          class="vip-item-button"
          style="
            background: linear-gradient(90deg, #fcebdc, #ffcba3);
            color: #6b3d1e;
            border: 0;
          "
        >
          开启协作
        </div>
      </div>
      <div class="vip-item">
        <div class="vip-item-title">
          <span>旗舰版</span
          ><img
            class="w-21 h-21 ml-10"
            src="https://www.chuangkit.com/distweb/img/flagship.1ed1b792.svg"
            lazy="loaded"
          />
        </div>
        <div class="vip-item-des">适合于大型企业/跨地域/多子公司使用</div>
        <div
          class="vip-item-button"
          style="
            background: linear-gradient(270deg, #4c4d51, #2d2e33);
            color: #ffc571;
            border: 0;
          "
        >
          预约演示
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.vip-info-page {
  width: 100%;
  height: 702px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .sub-title {
    font-size: 48px;
    font-weight: 400;
  }

  .small-des {
    font-size: 16px;
    font-weight: 400;
    color: #505a71;
    margin-top: 32px;
    margin-bottom: 96px;
  }

  .vip-item-box {
    width: 1088px;
    display: flex;
    gap: 24px;

    .vip-item {
      width: 254px;
      height: 282px;
      padding: 32px 28px;
      color: #1b2337;
      border-radius: 32px;
      background-color: #f1f3f9;

      .vip-item-title {
        height: 28px;
        display: flex;
        align-items: center;
        font-size: 22px;
        font-weight: 600;
      }

      .vip-item-des {
        font-size: 16px;
        font-weight: 400;
        margin-top: 24px;
      }

      .vip-item-button {
        width: 198px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        border-radius: 12px;
        margin-top: 62px;
        cursor: pointer;
        color: rgb(7, 115, 252);
        border: 1px solid rgb(7, 115, 252);
      }
    }
  }
}
</style>

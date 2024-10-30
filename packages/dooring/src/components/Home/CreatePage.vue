<template>
  <div class="frist-page">
    <div class="w-full h-780 bg-#f5f7fd relative">
      <!-- <div class="w-full h-full overflow-hidden absolute">
        <div class="block-1"></div>
        <div class="block-2"></div>
        <div class="block-3"></div>
      </div> -->
      <div class="flex flex-col items-center">
        <div class="pt-110 text-48">加入我们，立即体验</div>
        <div class="text-15 c-#1b2337 pt-32 pb-156">
          各种资源品类应用尽有，满足不同场景的设计需求
        </div>
        <CreateList />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateList from "@/components/CreateList.vue";
</script>

<style lang="scss" scoped>
.frist-page {
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

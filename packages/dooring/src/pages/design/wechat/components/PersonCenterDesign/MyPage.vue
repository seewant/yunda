<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-03-15 15:22:25
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-09-24 11:25:55
-->
<template>
  <div class="my">
    <div class="my-head">
      <img
        class="my-head-bg"
        :src="configure?.personalCenter?.backgroundImage"
      />
      <div class="my-head-bottom">
        <image
          class="my-head-avatar"
          src="https://img.js.design/assets/compImg/u-9lB0e643014aa8d1bca2b87a6e8d2ffb8cec.png"
        ></image>
        <div class="my-head-info">
          <div class="my-head-info-name">雨尽阑珊</div>
          <div class="my-head-info-welcome">ID：1001485</div>
        </div>
      </div>
    </div>

    <div class="navigation" v-if="configure?.personalCenter?.showMenu">
      <div
        class="navigation-item"
        v-for="(item, index) in configure?.personalCenter?.menuList"
        :key="index"
      >
        <svg class="w-40 h-40" aria-hidden="true">
          <use :xlink:href="`#${item.icon}`"></use>
        </svg>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="operation">
      <!-- <div class="operation-item">
        <div class="operation-item-name">
          <u-icon name="info-circle" size="16"></u-icon>
          <span>关于我们</span>
        </div>
        <u-icon name="arrow-right" size="14" color="#c0c4cb"></u-icon>
      </div> -->
      <div class="operation-item">
        <div class="operation-item-name">
          <u-icon name="setting" size="16"></u-icon>
          <span>设置</span>
        </div>
        <u-icon name="arrow-right" size="14" color="#c0c4cb"></u-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, ref, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  configure: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="scss" scoped>
.my {
  height: 667px;
  background: #f8f8f8;

  .my-head {
    position: relative;
    height: 160px;
    margin: 15px;
    border-radius: 10px;
    overflow: hidden;

    .my-head-bg {
      width: 100%;
    }

    .my-head-bottom {
      position: absolute;
      left: 25px;
      top: 50px;
      display: flex;

      .my-head-avatar {
        width: 60px;
        height: 60px;
        margin-right: 15px;
        border-radius: 50%;
      }
      .my-head-info {
        flex: 1;
        padding-top: 5px;

        .my-head-info-name {
          margin-bottom: 11px;
          font-size: 20px;
          line-height: 24px;
          font-weight: 700;
          letter-spacing: 0px;
          color: rgba(0, 0, 0, 1);
          text-align: justify;
          vertical-align: top;
        }

        .my-head-info-welcome {
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0px;
          color: rgba(0, 0, 0, 0.7);
          text-align: justify;
          vertical-align: top;
        }
      }
    }
  }

  .navigation {
    display: flex;
    flex-wrap: wrap;
    padding: 18px 0;
    margin: 15px;
    border-radius: 10px;
    background: #fff;

    .navigation-item {
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;

      span {
        margin-top: 5px;
        font-size: 12px;
      }
    }
  }
}

.operation {
  padding: 18px 0;
  margin: 15px;
  border-radius: 10px;
  background: #fff;

  .operation-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    font-size: 14px;
    font-weight: 600;

    .operation-item-name {
      display: flex;
      align-items: center;
      font-size: 14px;

      span {
        margin-left: 7px;
      }
    }
  }
}
</style>

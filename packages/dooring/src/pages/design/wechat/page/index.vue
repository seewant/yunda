<template>
  <div class="wrap flex flex-col ml-auto mr-auto bg-#2254f470">
    <!-- <div class="flex-center h-48 border-b-solid border-b-1 border-#dcdee080">
      微信小程序
    </div>
    <div class="p-20">
      <el-alert title="可自由搭建自己的小程序 无需代码 无需部署 有手就行!">
      </el-alert>
    </div> -->
    <div class="flex-1">
      <!-- <div class="mt-100 text-50 c-#fff font-600 text-center">小程序可视化搭建平台</div> -->
    </div>
    <div class="pb-80 flex gap-50 justify-center overflow-auto">
      <div v-for="(item, index) in pageList" :key="index">
        <div
          class="item pososition relative w-200 h-420 mb-20 rd-27 shadow-2xl overflow-hidden"
        >
          <img
            class="absolute w-full z-10"
            src="../../../../assets/header.png"
          />
          <PreviewProductPage :path="item.path" />
          <div
            class="item-mask absolute top-0 left-0 w-full h-full bg-#000000b3"
          >
            <div
              class="w-full h-full flex flex-col justify-center items-center"
            >
              <div>
                <el-button color="#2254f4" @click="item.fun(item)">
                  搭建
                </el-button>
                <el-button v-if="item.type == 'custom'" @click="changeTab">
                  更换
                </el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-10 pl-10 pr-10 flex items-center justify-center">
          <div class="flex items-center c-#fff">
            <span>{{ item.name }}</span>
            <!-- <el-tooltip
              class="box-item"
              effect="dark"
              :content="item.tip"
              placement="bottom"
            >
              <iconpark-icon
                class="ml-5 c-#cccccc text-15 cursor-pointer"
                name="attention"
              ></iconpark-icon>
            </el-tooltip> -->
          </div>
          <!-- <iconpark-icon
            class="text-15 cursor-pointer"
            name="config"
          ></iconpark-icon> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, defineProps, computed } from "vue";
import { useRouter } from "vue-router";
import { useWechatStore } from "@/store/wechat";
import { useDesignStore } from "@/store/design";
import PreviewProductPage from "../components/PreviewProductPage";

const { wechat, curWechatPage } = toRefs(useWechatStore());
const router = useRouter();

const { setCurWechatPage } = useWechatStore();
const { initDesign } = useDesignStore();

const pageList = computed(() => {
  const navigationList = wechat.value.configure.navigation.list;
  console.log("navigationList", navigationList);
  const navigationPageList = navigationList
    .filter((item) => {
      console.log("item", item);
      return item.status && item.router.id != "my";
    })
    .map((item) => {
      return {
        id: item.router.id,
        name: `导航栏 - ${item.name}`,
        type: item.router.type,
        tip: item.isHome ? "微信小程序首页" : "自定义菜单页",
        path: `pages/render/previewProduct?pageId=${item.router.id}`,
        fun: buildCustomPage,
      };
    });

  return [
    {
      name: "起始页",
      type: "screen",
      tip: "微信小程序启动加载时展示",
      path: `pages/render/advertising`,
      fun: buildAdvertising,
    },
    ...navigationPageList,
    {
      name: "导航栏 - 我的",
      type: "screen",
      tip: "微信小程序个人中心",
      path: `pages/render/previewMy`,
      fun: () => {
        router.push({
          name: "design-wechat-personCenter",
        });
      },
    },
  ];
});

function buildCustomPage(item) {
  setCurWechatPage(item.id);
  initDesign(curWechatPage?.value);
  router.push({
    name: "design-wechat-decorate",
  });
}

function buildAdvertising() {
  router.push({
    name: "design-wechat-advertising",
  });
}

function handleEdit(item) {
  console.log("item", item);
  // 装修自定义搭建页
  // if (item.type == "wechat") {
  setCurWechatPage(item.id);
  initDesign(curWechatPage?.value);

  router.push({
    name: "design-wechat-decorate",
  });
  // }
}

function changeTab() {
  router.push({
    name: "design-wechat-navigation",
  });
}
</script>


<style lang="scss" scoped>
.wrap {
  background-image: url("../../../../assets/bg2.png");
  background-size: cover;
  height: calc(100vh - 54px);
}

.item {
  box-sizing: content-box;
  border: solid 6px #fff;
  &:hover {
    .item-mask {
      display: block;
    }
  }

  .item-mask {
    display: none;
  }
}
</style>

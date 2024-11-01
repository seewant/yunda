/*
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2023-02-28 10:12:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-11-01 11:35:01
 */
import { createRouter, createWebHashHistory } from "vue-router";
import { ref, toRefs, reactive, computed } from "vue";
import { getToken } from "@design/utils";
import { useLogin } from "@/components/Login/useLogin";

const { openLogin } = useLogin();

const router = createRouter({
  history: createWebHashHistory(), // 使用 hash 模式
  routes: [
    {
      path: "/",
      redirect: "dooring",
    },
    {
      path: "/dooring",
      component: () => import("@/layout/main.vue"),
      redirect: "/dooring/home",
      children: [
        {
          path: "home",
          name: "home",
          component: () => import("@/pages/dooring/home.vue"),
          meta: { title: "首页" },
        },
        {
          path: "resource",
          name: "resource",
          component: () => import("@/pages/dooring/resource/index.vue"),
          redirect: "/dooring/resource/recommend",
          meta: { title: "资源社区" },
          children: [
            {
              path: "recommend",
              name: "resource-recommend",
              component: () => import("@/pages/dooring/resource/recommend.vue"),
              meta: { title: "为你推荐" },
            },
            {
              path: "template",
              name: "resource-template",
              component: () => import("@/pages/dooring/resource/template.vue"),
              meta: { title: "模板中心" },
            },
            {
              path: "create",
              name: "resource-create",
              component: () => import("@/pages/dooring/resource/create.vue"),
              meta: { title: "创建设计" },
            },
          ],
        },
        {
          path: "my",
          name: "my",
          component: () => import("@/layout/my.vue"),
          redirect: "/dooring/my/wechat",
          children: [
            {
              path: "create",
              name: "my-create",
              component: () => import("@/pages/my/create.vue"),
              meta: { title: "新增设计" },
            },
            {
              path: "wechat",
              name: "my-wechat",
              component: () => import("@/pages/my/wechat.vue"),
              meta: { title: "我的小程序" },
            },
          ],
        },
      ],
    },
    {
      path: "/template",
      name: "template",
      component: () => import("@/pages/template/index.vue"),
      meta: { title: "设计模板" },
    },
    {
      path: "/design",
      name: "design",
      children: [
        {
          path: "wechat",
          name: "design-wechat",
          redirect: "/design/wechat/index",
          component: () => import("@/pages/design/wechat/index.vue"),
          children: [
            {
              path: "index",
              name: "design-wechat-index",
              component: () => import("@/pages/design/wechat/page/index.vue"),
              meta: { title: "小程序主页" },
            },
            {
              path: "page",
              name: "design-wechat-page",
              component: () => import("@/pages/design/wechat/page/page.vue"),
              meta: { title: "页面管理" },
            },
            {
              path: "navigation",
              name: "design-wechat-navigation",
              component: () =>
                import("@/pages/design/wechat/page/navigation.vue"),
              meta: { title: "导航设置" },
            },
            {
              path: "advertising",
              name: "design-wechat-advertising",
              component: () =>
                import("@/pages/design/wechat/page/advertising.vue"),
              meta: { title: "起始页" },
            },
            {
              path: "personCenter",
              name: "design-wechat-personCenter",
              component: () =>
                import("@/pages/design/wechat/page/personCenter.vue"),
              meta: { title: "个人中心" },
            },
          ],
        },
        {
          path: "wechat-decorate",
          name: "design-wechat-decorate",
          redirect: "/design/wechat-decorate/build",
          component: () => import("@/pages/design/wechat-decorate/index.vue"),
          children: [
            {
              path: "build",
              name: "design-wechat-decorate-build",
              component: () =>
                import("@/pages/design/wechat-decorate/page/build.vue"),
              meta: { title: "小程序页面设计" },
            },
          ],
        },
      ],
    },
    {
      path: "/report-questionnaire",
      name: "report-questionnaire",
      redirect: "/report-questionnaire/overview",
      component: () => import("@/pages/report/questionnaire/index.vue"),
      children: [
        {
          path: "overview",
          name: "report-questionnaire-overview",
          component: () =>
            import("@/pages/report/questionnaire/page/overview.vue"),
          meta: { title: "数据统计" },
        },
        {
          path: "list",
          name: "report-questionnaire-list",
          component: () => import("@/pages/report/questionnaire/page/list.vue"),
          meta: { title: "数据列表" },
        },
        {
          path: "analyze",
          name: "report-questionnaire-analyze",
          component: () =>
            import("@/pages/report/questionnaire/page/analyze.vue"),
          meta: { title: "题目分析" },
        },
      ],
    },
    {
      path: "/report-form",
      name: "report-form",
      redirect: "/report-form/overview",
      component: () => import("@/pages/report/form/index.vue"),
      children: [
        {
          path: "overview",
          name: "report-form-overview",
          component: () => import("@/pages/report/form/page/overview.vue"),
          meta: { title: "数据统计" },
        },
        {
          path: "list",
          name: "report-form-list",
          component: () => import("@/pages/report/form/page/list.vue"),
          meta: { title: "数据列表" },
        },
        {
          path: "analyze",
          name: "report-form-analyze",
          component: () => import("@/pages/report/form/page/analyze.vue"),
          meta: { title: "题目分析" },
        },
      ],
    },
  ],
});

// 免登录白名单
const whiteList = [
  "/",
  "/dooring",
  "/dooring/home",
  "/dooring/create",
  "/screenshot/product",
];

// 路由守卫
router.beforeEach((to, from, next) => {
  if (getToken()) next();
  else if (whiteList.indexOf(to.path) > -1) next();
  else {
    openLogin();
    return;
  }

  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = `${to.meta.title}-云搭万物`;
  }
});

export default router;

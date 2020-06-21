import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('../views/Login.vue')
  },
  {
    path: "/index",
    redirect: "/more",
    name: "Layout",
    component: () => import('../views/layout/Layout.vue'),
    children: [
      {
        path: '/more',
        name: '更多推荐',
        component: () => import('../views/more/More.vue')
      },
      {
        path: '/personalinfo',
        redirect: "/personalinfo/basicinfo",
        name: '个人信息',
        component: () => import('../views/personalInfo/Layout.vue'),
        children: [
          {
            path: "/personalinfo/basicinfo",
            name: "基本信息",
            component: () => import('../views/personalInfo/BasicInfo.vue'),
          }
        ]
      }
    ]
  },
];

const router = new VueRouter({
  routes
});

export default router;

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
    redirect: "/recommend",
    name: "Layout",
    component: () => import('../views/layout/Layout.vue'),
    children: [
      {
        path: '/recommend',
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
      },
      {
        path: '/patientdiag',
        name: '患者诊断',
        component: () => import('../views/patientdiag/PatientDiag.vue'),
      },
      {
        path: '/intelligentdiag',
        name: '智能诊断',
        component: () => import('../views/intelligentdiag/IntelligentDiag.vue'),
      },
      {
        path: '/groupconsultation',
        redirect: "/groupconsultation/todayconsultation",
        name: '普通会诊',
        component: () => import('../views/groupconsultation/Layout.vue'),
        children: [
          {
            path: "/groupconsultation/todayconsultation",
            name: "今日患者",
            component: () => import('../views/groupconsultation/TodayConsultation.vue'),
          }
        ]
      },
      
    ]
  },
];

const router = new VueRouter({
  routes
});

export default router;

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
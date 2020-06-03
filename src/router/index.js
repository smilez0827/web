import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect:"/index"
  },
  {
    path: "/login",
    name: "Login",
    component: ()=>import('../views/Login.vue')
  },
  {
    path: "/index",
    name: "Layout",
    component: ()=>import('../views/layout/Layout.vue')
  },
];

const router = new VueRouter({
  routes
});

export default router;

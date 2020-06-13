import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo:{
      UserID:'',
      name:'',
      function:''
    },
    accessMenu: [
      {
        id:0,
        path: "/index",
        name: "index",
        title: "首页",
        icon: "el-icon-s-home"
      },
      {
        id:1,
        path: "/1",
        name: "level1",
        title: "一级目录",
        icon: "el-icon-s-operation",
        children: [
          {
            path: "/1-1",
            name: "level2",
            title: "二级目录"
          },
          {
            path: "/1-2",
            name: "level2",
            title: "二级目录"
          },
          {
            path: "/1-3",
            name: "level2",
            title: "二级目录"
          },
          {
            path: "/1-4",
            name: "level2",
            title: "二级目录"
          },
          {
            path: "/1-5",
            name: "level2",
            title: "二级目录"
          }
        ]
      },
      {
        id:2,
        path: "/2",
        name: "level1",
        title: "一级目录",
        icon: "el-icon-s-operation",
        children: [
          {
            path: "/2-1",
            name: "level2",
            title: "二级目录"
          },
          {
            path: "/2-2",
            name: "level2",
            title: "二级目录"
          },
          {
            path: "/2-3",
            name: "level2",
            title: "二级目录"
          },
          {
            path: "/2-4",
            name: "level2",
            title: "二级目录"
          },
          {
            path: "/2-5",
            name: "level2",
            title: "二级目录"
          }
        ]
      }
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
});

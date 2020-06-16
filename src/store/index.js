import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      UserID: '',
      name: '',
      function: ''
    },
    // accessMenu: [
    //   {
    //     id: 0,
    //     path: "/index",
    //     name: "index",
    //     title: "首页",
    //     icon: "el-icon-s-home"
    //   },
    //   {
    //     id: 1,
    //     path: "/1",
    //     name: "level1",
    //     title: "一级目录",
    //     icon: "el-icon-s-operation",
    //     children: [
    //       {
    //         path: "/1-1",
    //         name: "level2",
    //         title: "二级目录"
    //       },
    //       {
    //         path: "/1-2",
    //         name: "level2",
    //         title: "二级目录"
    //       },
    //       {
    //         path: "/1-3",
    //         name: "level2",
    //         title: "二级目录"
    //       },
    //       {
    //         path: "/1-4",
    //         name: "level2",
    //         title: "二级目录"
    //       },
    //       {
    //         path: "/1-5",
    //         name: "level2",
    //         title: "二级目录"
    //       }
    //     ]
    //   },
    //   {
    //     id: 2,
    //     path: "/2",
    //     name: "level1",
    //     title: "一级目录",
    //     icon: "el-icon-s-operation",
    //     children: [
    //       {
    //         path: "/2-1",
    //         name: "level2",
    //         title: "二级目录"
    //       },
    //       {
    //         path: "/2-2",
    //         name: "level2",
    //         title: "二级目录"
    //       },
    //       {
    //         path: "/2-3",
    //         name: "level2",
    //         title: "二级目录"
    //       },
    //       {
    //         path: "/2-4",
    //         name: "level2",
    //         title: "二级目录"
    //       },
    //       {
    //         path: "/2-5",
    //         name: "level2",
    //         title: "二级目录"
    //       }
    //     ]
    //   }
    // ],
    // function: [
    //   {
    //     functionID: "1",
    //     functionName: "个人信息",
    //     functionAddress: "/personalinfo",
    //     icon:"iconfont icon-gerenxinxi",
    //     children: [
    //       {
    //         functionID: "1-1",
    //         functionName: "基本信息",
    //         functionAddress: "/personalinfo/basicinfo"
    //       },
    //       {
    //         functionID: "1-2",
    //         functionName: "个人财务",
    //         functionAddress: "/personalinfo/personalfinance"
    //       },
    //       {
    //         functionID: "1-3",
    //         functionName: "银行卡管理",
    //         functionAddress: "/personalinfo/bankaccount"
    //       },
    //       {
    //         functionID: "1-4",
    //         functionName: "个人设置",
    //         functionAddress: "/personalinfo/settings"
    //       },
    //       {
    //         functionID: "1-5",
    //         functionName: "密码修改",
    //         functionAddress: "/personalinfo/passwordmodify"
    //       }
    //     ]
    //   },
    //   {
    //     functionID: "4",
    //     functionName: "普通会诊",
    //     functionAddress: "/groupconsultation",
    //     icon:"iconfont icon-putonghuizhen",
    //     children: [
    //       {
    //         functionID: "4-1",
    //         functionName: "今日患者",
    //         functionAddress: "/groupconsultation/todayconsultation"
    //       },
    //       {
    //         functionID: "4-2",
    //         functionName: "历史患者",
    //         functionAddress: "/groupconsultation/historyconsultation"
    //       }
    //     ]
    //   },
    //   {
    //     functionID: "5",
    //     functionName: "视频会诊",
    //     functionAddress: "/groupvedioconsultation",
    //     icon:"iconfont icon-Icon-shipinhuizhen",
    //     children: [
    //       {
    //         functionID: "5-1",
    //         functionName: "今日患者",
    //         functionAddress: "/groupvedioconsultation/todayconsultation"
    //       },
    //       {
    //         functionID: "5-2",
    //         functionName: "历史患者",
    //         functionAddress: "/groupvedioconsultation/historyconsultation"
    //       }
    //     ]
    //   },
    //   {
    //     functionID: "11",
    //     functionName: "出诊管理",
    //     functionAddress: "/housecall",
    //     icon:"iconfont icon-chuzhenguanli"
    //   },
    //   {
    //     functionID: "7",
    //     functionName: "即时信息",
    //     functionAddress: "/instantinfo",
    //     icon:"iconfont icon-message",
    //     children: [
    //       {
    //         functionID: "7-1",
    //         functionName: "会诊信息",
    //         functionAddress: "/instantinfo/groupconsultation"
    //       },
    //       {
    //         functionID: "7-2",
    //         functionName: "消息会话",
    //         functionAddress: "/instantinfo/message"
    //       }
    //     ]
    //   },
    //   {
    //     functionID: "8",
    //     functionName: "患者信息",
    //     functionAddress: "/patientinfo",
    //     icon:"iconfont icon-huanzhexinxi",
    //   },
    //   {
    //     functionID: "9",
    //     functionName: "医疗信息",
    //     functionAddress: "/medicalinfo",
    //     icon:"iconfont icon-yiliaoxinxi",
    //     children: [
    //       {
    //         functionID: "9-1",
    //         functionName: "医疗机构",
    //         functionAddress: "/medicalinfo/organization"
    //       },
    //       {
    //         functionID: "9-2",
    //         functionName: "医疗专家",
    //         functionAddress: "/medicalinfo/expert"
    //       },
    //       {
    //         functionID: "9-3",
    //         functionName: "医疗用品",
    //         functionAddress: "/medicalinfo/article"
    //       }
    //     ]
    //   },
    //   {
    //     functionID: "10",
    //     functionName: "更多推荐",
    //     functionAddress: "/more",
    //     icon:"iconfont icon-more",
    //   }
    // ]
  },
  mutations: {},
  actions: {},
  modules: {}
});

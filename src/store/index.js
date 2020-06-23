import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      UserID: '',
      name: '张三',
      function: ''
    },

    function: [
      {
        FunctionID: "1",
        FunctionName: "个人信息",
        FunctionAddress: "/personalinfo",
        icon:"icon-gerenxinxi",
        children: [
          {
            FunctionID: "1-1",
            FunctionName: "基本信息",
            FunctionAddress: "/personalinfo/basicinfo",
          },
          {
            FunctionID: "1-2",
            FunctionName: "个人财务",
            FunctionAddress: "/personalinfo/personalfinance"
          },
          {
            FunctionID: "1-3",
            FunctionName: "银行卡管理",
            FunctionAddress: "/personalinfo/bankaccount"
          },
          {
            FunctionID: "1-4",
            FunctionName: "个人设置",
            FunctionAddress: "/personalinfo/settings"
          },
          {
            FunctionID: "1-5",
            FunctionName: "密码修改",
            FunctionAddress: "/personalinfo/passwordmodify"
          }
        ]
      },
      {
        FunctionID: "4",
        FunctionName: "普通会诊",
        FunctionAddress: "/groupconsultation",
        icon:"icon-putonghuizhen",
        children: [
          {
            FunctionID: "4-1",
            FunctionName: "今日患者",
            FunctionAddress: "/groupconsultation/todayconsultation"
          },
          {
            FunctionID: "4-2",
            FunctionName: "历史患者",
            FunctionAddress: "/groupconsultation/historyconsultation",
            children: [
              {
                FunctionID: "1-1-1",
                FunctionName: "子项",
                FunctionAddress: "/",
                children:[
                  {
                    FunctionID: "1-1-1-1",
                    FunctionName: "次子项1",
                    FunctionAddress: "/1",
                  },
                  {
                    FunctionID: "1-1-1-2",
                    FunctionName: "次子项2",
                    FunctionAddress: "/2",
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        FunctionID: "5",
        FunctionName: "视频会诊",
        FunctionAddress: "/groupvedioconsultation",
        icon:"icon-Icon-shipinhuizhen",
        children: [
          {
            FunctionID: "5-1",
            FunctionName: "今日患者",
            FunctionAddress: "/groupvedioconsultation/todayconsultation"
          },
          {
            FunctionID: "5-2",
            FunctionName: "历史患者",
            FunctionAddress: "/groupvedioconsultation/historyconsultation"
          }
        ]
      },
      {
        FunctionID: "11",
        FunctionName: "出诊管理",
        FunctionAddress: "/housecall",
        icon:"icon-chuzhenguanli"
      },
      {
        FunctionID: "7",
        FunctionName: "即时信息",
        FunctionAddress: "/instantinfo",
        icon:"icon-message",
        children: [
          {
            FunctionID: "7-1",
            FunctionName: "会诊信息",
            FunctionAddress: "/instantinfo/groupconsultation"
          },
          {
            FunctionID: "7-2",
            FunctionName: "消息会话",
            FunctionAddress: "/instantinfo/message"
          }
        ]
      },
      {
        FunctionID: "8",
        FunctionName: "患者信息",
        FunctionAddress: "/patientinfo",
        icon:"icon-huanzhexinxi",
      },
      {
        FunctionID: "9",
        FunctionName: "医疗信息",
        FunctionAddress: "/medicalinfo",
        icon:"icon-yiliaoxinxi",
        children: [
          {
            FunctionID: "9-1",
            FunctionName: "医疗机构",
            FunctionAddress: "/medicalinfo/organization"
          },
          {
            FunctionID: "9-2",
            FunctionName: "医疗专家",
            FunctionAddress: "/medicalinfo/expert"
          },
          {
            FunctionID: "9-3",
            FunctionName: "医疗用品",
            FunctionAddress: "/medicalinfo/article"
          }
        ]
      },
      {
        FunctionID: "10",
        FunctionName: "更多推荐",
        FunctionAddress: "/more",
        icon:"icon-more",
      }
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
});

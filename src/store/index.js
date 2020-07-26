import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      userInfo: {
        userId: '',
        name: '',
        func: [],
      },
      personalInfo:
      {
        basicinfo:
        {
          Name: '',
          Gender: '',
          Birthday: '',
          Post: '',
          Tel: '',
          Address: '',
          Portrait:''
        },
        exp: [],
        personalfinance: [],
        financeAccount: {
          flag: false,
          defaultType: '',
          bank: {
            bankName: '',
            account: '',
            name: '',
          },
          alipay: {
            account: '',
            name: '',
          },
          wechat: {
            account: '',
            name: '',
          },
        },
        settings: ''
      },
    },
    recommend: {
      collapseDate: [],
      imgList: []
    },
    messageList: [
      {
        type: "huizhen",
        time: "15:30:43",
        msg: "您有新会诊信息",
        router: "/recommend"
      },
      {
        type: "zhuanzhen",
        time: "15:34:43",
        msg: "您有新转诊信息",
        router: "/personalinfo/basicinfo"
      },
      {
        type: "huanzhe",
        time: "15:30:43",
        msg: "您有新会诊信息",
        router: "/recommend"
      },
      {
        type: "huanzhe",
        time: "15:30:43",
        msg: "您有新会诊信息",
        router: "/recommend"
      },
      {
        type: "huanzhe",
        time: "15:30:43",
        msg: "您有新会诊信息",
        router: "/recommend"
      },
      {
        type: "huanzhe",
        time: "15:30:43",
        msg: "您有新会诊信息",
        router: "/recommend"
      },
      {
        type: "huanzhe",
        time: "15:30:43",
        msg: "您有新会诊信息",
        router: "/recommend"
      },
      {
        type: "huanzhe",
        time: "15:30:43",
        msg: "您有新会诊信息",
        router: "/recommend"
      }
    ],
    medicalInfo: {
      organization: [],
      expertGroup: [],
      ariticle: [],
    },
    expertManage:[],
    orgManage:[],
  },

  getters: {
    recommend: (state) => {
      return state.recommend
    },
    userFunction: (state) => {
      return state.user.userInfo.func
    },
    basicInfo: (state) => {
      let obj = {};
      obj.basicInfo = state.user.personalInfo.basicinfo;
      obj.exp = state.user.personalInfo.exp;
      return obj;
    },
    userInfo: (state) => {
      return state.user.userInfo
    },
    financeAccount: (state) => {
      return state.user.personalInfo.financeAccount
    }
  },
  mutations: {
    userInfo(state, data) {
      state.user.userInfo.userId = data[0];
      state.user.userInfo.name = data[1];
      state.user.userInfo.role = data[2];
      state.user.userInfo.func = data[3];
    },
    recommend(state, data) {
      state.recommend.imgList = data[0];
      state.recommend.collapseDate = data[1];
    },
    basicInfo(state, data) {
      localStorage.setItem('name', data[0].Name)
      state.user.userInfo.name = data[0].Name;
      state.user.personalInfo.basicinfo = data[0];
      state.user.personalInfo.exp = data[1];
    },
    addMessage(state, msg) {
      state.messageList.push[msg]
    },
    delDessage(state, index) {
      state.messageList.splice(index, 1)
    },
    financeAccount(state, data) {
      state.user.personalInfo.financeAccount = data
      state.user.personalInfo.financeAccount.flag = true
    },
    orgList(state, data) {
      state.medicalInfo.organization = data
    },
    expertGroupList(state, data) {
      state.medicalInfo.expertGroup = data
    },
    ariticleList(state, data) {
      state.medicalInfo.ariticle = data
    },
    expertManage(state,data){
      state.expertManage = data

    },
    orgManage(state,data){
      state.orgaManage = data

    },
  },
  actions: {
  },
  modules: {}
});

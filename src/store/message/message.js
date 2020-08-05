export default {
  namespace: true,
  state: {
    messageList: [],
  },
  getters: {},
  mutations: {
    addMessage(state, msg) {
      state.messageList.push(msg)
    },
    delDessage(state, index) {
      state.messageList.splice(index, 1)
    },
  },
  actions: {
  },
  modules: {}
};
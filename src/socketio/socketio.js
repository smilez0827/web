import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import Vue from "vue";
import store from "../store/index.js"
import { getTodayPatients } from '../api/patientdiag/patientdiag.js';
const socket = io('http://132.232.18.227:3000');
socket.addEventListener("seekMedicalAdvice", (data) => {
    getTodayPatients()
    let obj = {}
    obj.type = "huanzhe"
    obj.time = new Date().toLocaleTimeString('zh-CN', { hour12: false })
    obj.msg = "您有新的就诊请求"
    obj.router = "/patientdiag/todaydiagnosis"
    store.commit("addMessage", obj)
    data.API_pid = data.pid
    // data.API_date = new Date(data.API_date).toLocaleTimeString('zh-CN', { hour12: false })
    console.log('1')
    store.commit("addTodayPatient", data)
})
socket.addEventListener("login", (data) => {
    console.log(data)
})
Vue.use(VueSocketIOExt, socket);

export default socket;
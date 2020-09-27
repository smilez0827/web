import { Get, Post, Delete, FileLoad, download, Put } from '../../http/request.js'
import store from '../../store/index.js';
import { Message } from 'element-ui';
import router from '../../router/index.js'
// 获取今日患者列表
export function getPatientsList() {
    // if (store.state.patientTreatment.patientsList.length == 0) {
    //     Get("http://132.232.18.227:3000/patienttreatment/patientlist").then((res) => {
    //         store.commit("patientTreatment/patientsList", res.data.API_patientsList)
    //     })
    // }
}


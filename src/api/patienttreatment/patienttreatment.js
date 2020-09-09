import { Get, Post, Delete, FileLoad, download, Put } from '../../http/request.js'
import store from '../../store/index.js';
import { Message } from 'element-ui';
import router from '../../router/index.js'
// 获取今日患者列表
export function getPatientsList() {
    if (store.state.patientTreatment.patientsList.length == 0) {
        Get("http://132.232.18.227:3000/patienttreatment/patientlist").then((res) => {
            store.commit("patientTreatment/patientsList", res.data.API_patientsList)
        })
    }
}

// 获取患者详情
export function getPatientsDetails(pid) {
    return Get("http://132.232.18.227:3000/patienttreatment/treatmentlog/" + pid).then((res) => {
        console.log("state", res)
        return res.data
    })
}

// 提交新的治疗记录
export function newTreatmentLog(pid, data) {
    return Post("http://132.232.18.227:3000/patienttreatment/treatmentlog/" + pid, data).then((res) => {
        return true
    })
}

//获取治疗方案描述选项
export function getTreatmentOptions() {
    if (localStorage.getItem("treatmentopts")) {
        return new Promise(resolve => {
            let obj = JSON.parse(localStorage.getItem("treatmentopts"))
            resolve(obj)
        })
    } else {
        return Get("http://132.232.18.227:3000/patientdiag/treatmentoptions").then(res => {
            console.log(res.data.treatmentOptions)
            localStorage.setItem("treatmentopts", JSON.stringify(res.data.treatmentOptions))
            return res.data.treatmentOptions
        })
        // }
    }
}


//获取患者状态描述选项
export function getStateOptions() {
    if (localStorage.getItem("stateopt")) {
        return new Promise(resolve => {
            let obj = JSON.parse(localStorage.getItem("stateopt"))
            resolve(obj)
        })
    } else {
        return Get("http://132.232.18.227:3000/patientdiag/stateoptions").then(res => {
            localStorage.setItem("stateopt", JSON.stringify(res.data.stateOptions))
            return res.data.stateOptions
        })
    }

}

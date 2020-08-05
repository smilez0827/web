import { Get, Post, Delete, FileLoad, download, Put } from '../../http/request.js'
import store from '../../store/index.js';
import { Message } from 'element-ui';
// 获取今日患者列表
export function getTodayPatients(pid) {
    Get("http://132.232.18.227:3000/patientdiag/todaypatients").then((res)=>{
        if(res.data.seekmedicaladvicedata.length>0){
            res.data.seekmedicaladvicedata.forEach(item=>{
                item.API_pid = item.pid
            })
        }
        store.commit("todayPatientsList", res.data.seekmedicaladvicedata)
    })
}

// 获取患者详情信息
export function getPatientDetails(pid) {

    return Get("http://132.232.18.227:3000/patientdiag/2").then((res) => {
        console.log(res)
        let obj = {};
        obj.API_basicInfo = res.data.API_basicInfo;
        obj.API_illState = res.data.API_illState;
        obj.API_history = res.data.API_history;
        obj.API_examResult = res.data.API_examResult;
        let obj2 = {};
        obj2.API_diagResult =
            res.data.API_diagInfo.API_diagResult[0].API_diagDescription;
        obj2.API_treatment = {};
        obj2.API_treatment.API_description =
            res.data.API_diagInfo.API_treatment[0].API_treatmentdescription;
        obj2.API_treatment.API_prescription = res.data.API_diagInfo.API_drugs;
        obj2.API_after = res.data.API_diagInfo.API_after;
        return {
            patientInfo: obj,
            API_diagInfo: obj2
        }
    })
}

// 保存患者诊断信息
export function savePatientDiagInfo(data1, data2) {
    let obj = JSON.parse(JSON.stringify(data2))
    obj.API_illState = {}
    obj.API_illState.API_description = data1.API_illState.API_description
    obj.API_drugs = obj.API_treatment.API_prescription
    let str = obj.API_diagResult
    obj.API_diagResult = [{ API_diagDescription: str }];
    str = obj.API_treatment.API_description
    obj.API_treatment = [{ API_treatmentdescription: str }];
    console.log(obj)
    Post("http://132.232.18.227:3000/patientdiag/2",obj).then(res=>{
        if(res.status==200){
            Message.success(res.data.msg)
        }else{
            Message.error("保存失败")
        }
    })

}
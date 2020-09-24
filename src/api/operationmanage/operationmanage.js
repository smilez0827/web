import { Get, Post, Delete, FileLoad, download, Put } from '../../http/request.js'
import store from '../../store/index.js';
import { Message } from 'element-ui';
import router from '../../router/index.js'



// 提交新的护理记录
export function newQuestionnaire(pid, name, data) {
    let obj = {
        time: new Date(),
        name: name,
        data: data
    }
    return Post("/api/operationmanage/newquestionnaire/" + pid, obj).then((res) => {
        Message.success("成功")
        return true
    })
}


// 住院申请列表
export function getApplyList() {
    return new Promise(resolve => {
        let obj = [
            {
                API_date: "2020-09-18 10:06:28",
                API_expert: "专家2",
                API_name: "zhangxiao",
                API_pid: 426,
                API_state: "已处理",
                API_toHospitalID: "202009188426",
            },
            {
                API_date: "2020-09-18 10:06:28",
                API_expert: "专家2",
                API_name: "jbh",
                API_pid: 426,
                API_state: "已处理",
                API_toHospitalID: "202009188425",
            },
            {
                API_date: "2020-09-18 10:06:28",
                API_expert: "专家1",
                API_name: "zhangxiao",
                API_pid: 426,
                API_state: "已处理",
                API_toHospitalID: "202009188426",
            }
        ]
        resolve(obj)
    })
    // return Get("/api/operationmanage/applylist").then((res) => {
    //     return res.data.applyList;
    // })
}

// 住院申请详情
export function getApplyDetails() {
    return new Promise(resolve => {
        let obj = {
            API_basicInfo: {
                API_UserID: "13568479726",
                API_name: "zhangxiao",
                API_address: "西南交通大学",
                API_birthday: "2020-03-11 00:00:00",
                API_date: "2020-09-18 10:06:28",
                API_gender: "男",
                API_pic: "http://132.232.18.227:5000/user/userinfo/readfile?url=5446492386645447be3b515d6534e588.jpg",
                API_tel: "199887676677",
            },

            API_questionnaire: [
                {
                    data: {},
                    name: "吞咽功能评定",
                    state: "已完成"
                },
                {
                    data: {},
                    name: "跌倒风险评定",
                    state: "未完成"
                },
            ],
        }
        obj.API_questionnaire.forEach(item => {
            switch (item.name) {
                case "吞咽功能评定":
                    item.type = "TUNYAN"
                    break
                case "跌倒风险评定":
                    item.type = "DIEDAO"
                    break
            }
        })
        resolve(obj)
    })
    // return Get("/api/operationmanage/applylist").then((res) => {
    //     return res.data.applyList;
    // })
}


// 提交入院评估
export function postApplyDetails(pid, data) {
    console.log(pid, data)
    // return post("/api/operationmanage/applylist").then((res) => {
    //     return res.data.applyList;
    // })
}


// 住院患者列表
export function getPatientsList() {
    return new Promise(resolve => {
        let obj = [
            {
                API_date: "2020-09-18 10:06:28",
                API_expert: "专家2",
                API_name: "zhangxiao",
                API_pid: 426,
                API_state: "已处理",
                API_pingguState: "是",
                API_toHospitalID: "202009188426",
            },
            {
                API_date: "2020-09-18 10:06:28",
                API_expert: "专家2",
                API_name: "jbh",
                API_pid: 426,
                API_state: "已处理",
                API_pingguState: "否",
                API_toHospitalID: "202009188425",
            },
            {
                API_date: "2020-09-18 10:06:28",
                API_expert: "专家1",
                API_name: "zhangxiao",
                API_pid: 426,
                API_state: "未处理",
                API_pingguState: "否",
                API_toHospitalID: "202009188426",
            },
            {
                API_date: "2020-09-18 10:06:28",
                API_expert: "专家1",
                API_name: "zhangxiao",
                API_pid: 426,
                API_state: "已处理",
                API_pingguState: "是",
                API_toHospitalID: "202009188426",
            }
        ]
        resolve(obj)
    })
    // return Get("/api/operationmanage/applylist").then((res) => {
    //     return res.data.applyList;
    // })
}

// 住院患者详情
export function getPatientsDetails() {
    return new Promise(resolve => {
        let obj = {
            API_basicInfo: {
                API_UserID: "13568479726",
                API_name: "zhangxiao",
                API_address: "西南交通大学",
                API_birthday: "2020-03-11 00:00:00",
                API_date: "2020-09-18 10:06:28",
                API_gender: "男",
                API_pic: "http://132.232.18.227:5000/user/userinfo/readfile?url=5446492386645447be3b515d6534e588.jpg",
                API_tel: "199887676677",
            },

            API_questionnaire: [
                {
                    data: {},
                    name: "吞咽功能评定",
                    state: "已完成"
                },
                {
                    data: {},
                    name: "跌倒风险评定",
                    state: "已完成"
                },
            ],
        }
        resolve(obj)
    })
    // return Get("/api/operationmanage/applylist").then((res) => {
    //     return res.data.applyList;
    // })
}

// 获取每日护理记录

export function getNursingLogs() {
    return new Promise(resolve => {
        let obj = [
            {
                date: "2020-09-24T16:00:00.000Z",
                yishi: "清醒",
                tizheng: {
                    T: "1",
                    P: "2",
                    HR: "3",
                    R: "4",
                    BP: "5"
                },
                SPO2: "6",
                ruliang: {
                    mingcheng: "7",
                    fenglei: "8",
                    tujing: "9",
                    liang: "10"
                },
                chuliang: {
                    mingcheng: "11",
                    liang: "12"
                },
                jili: "13",
                fanshenwowei: "14",
                shifouyueshu: "15",
                yijian: "好好学习天天像撒士大夫阿斯顿发射点发射点阀手动阀阀手动阀啊"
            }, {
                date: "2020-09-23T16:00:00.000Z",
                yishi: "清醒",
                tizheng: {
                    T: "1",
                    P: "2",
                    HR: "3",
                    R: "4",
                    BP: "5"
                },
                SPO2: "6",
                ruliang: {
                    mingcheng: "7",
                    fenglei: "8",
                    tujing: "9",
                    liang: "10"
                },
                chuliang: {
                    mingcheng: "11",
                    liang: "12"
                },
                jili: "13",
                fanshenwowei: "14",
                shifouyueshu: "15",
                yijian: "好好学习天天像撒士大夫阿斯顿发射点发射点阀手动阀阀手动阀啊"
            }, {
                date: "2020-09-23T16:00:00.000Z",
                yishi: "清醒",
                tizheng: {
                    T: "1",
                    P: "2",
                    HR: "3",
                    R: "4",
                    BP: "5"
                },
                SPO2: "6",
                ruliang: {
                    mingcheng: "7",
                    fenglei: "8",
                    tujing: "9",
                    liang: "10"
                },
                chuliang: {
                    mingcheng: "11",
                    liang: "12"
                },
                jili: "13",
                fanshenwowei: "14",
                shifouyueshu: "15",
                yijian: "好好学习天天像撒士大夫阿斯顿发射点发射点阀手动阀阀手动阀啊"
            }, {
                date: "2020-09-23T16:00:00.000Z",
                yishi: "清醒",
                tizheng: {
                    T: "1",
                    P: "2",
                    HR: "3",
                    R: "4",
                    BP: "5"
                },
                SPO2: "6",
                ruliang: {
                    mingcheng: "7",
                    fenglei: "8",
                    tujing: "9",
                    liang: "10"
                },
                chuliang: {
                    mingcheng: "11",
                    liang: "12"
                },
                jili: "13",
                fanshenwowei: "14",
                shifouyueshu: "15",
                yijian: "好好学习天天像撒士大夫阿斯顿发射点发射点阀手动阀阀手动阀啊"
            }, {
                date: "2020-09-22T16:00:00.000Z",
                yishi: "清醒",
                tizheng: {
                    T: "1",
                    P: "2",
                    HR: "3",
                    R: "4",
                    BP: "5"
                },
                SPO2: "6",
                ruliang: {
                    mingcheng: "7",
                    fenglei: "8",
                    tujing: "9",
                    liang: "10"
                },
                chuliang: {
                    mingcheng: "11",
                    liang: "12"
                },
                jili: "13",
                fanshenwowei: "14",
                shifouyueshu: "15",
                yijian: "好好学习天天像撒士大夫阿斯顿发射点发射点阀手动阀阀手动阀啊"
            }, {
                date: "2020-09-23T16:00:00.000Z",
                yishi: "清醒",
                tizheng: {
                    T: "1",
                    P: "2",
                    HR: "3",
                    R: "4",
                    BP: "5"
                },
                SPO2: "6",
                ruliang: {
                    mingcheng: "7",
                    fenglei: "8",
                    tujing: "9",
                    liang: "10"
                },
                chuliang: {
                    mingcheng: "11",
                    liang: "12"
                },
                jili: "13",
                fanshenwowei: "14",
                shifouyueshu: "15",
                yijian: "好好学习天天像撒士大夫阿斯顿发射点发射点阀手动阀阀手动阀啊"
            }, {
                date: "2020-09-23T16:00:00.000Z",
                yishi: "清醒",
                tizheng: {
                    T: "1",
                    P: "2",
                    HR: "3",
                    R: "4",
                    BP: "5"
                },
                SPO2: "6",
                ruliang: {
                    mingcheng: "7",
                    fenglei: "8",
                    tujing: "9",
                    liang: "10"
                },
                chuliang: {
                    mingcheng: "11",
                    liang: "12"
                },
                jili: "13",
                fanshenwowei: "14",
                shifouyueshu: "15",
                yijian: "好好学习天天像撒士大夫阿斯顿发射点发射点阀手动阀阀手动阀啊"
            },


        ]
        resolve(obj)
    })

}

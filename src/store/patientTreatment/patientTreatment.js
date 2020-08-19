// export default {
//     namespace: true,
//     state: {
//         patientsList: [
//             {
//                 API_date: "14:50",
//                 API_name: "王小虎",
//                 API_pid: "1",
//                 API_expert: "张三",
//                 API_state: "已完成"
//             },
//             {
//                 API_date: "14:50",
//                 API_pid: "1",
//                 API_name: "王小虎",
//                 API_expert: "张三",
//                 API_state: "已完成"
//             },
//             {
//                 API_date: "14:50",
//                 API_name: "王小虎",
//                 API_expert: "张三",
//                 API_pid: "1",
//                 API_state: "已完成"
//             },
//         ],
//     },
//     getters: {
//     },
//     mutations: {
//         //整体更新病人列表
//         todayPatientsList(state, patients) {
//             state.todayPatientsList = patients
//         },
//         //来新病人后添加到列表中
//         addTodayPatient(state, newPatient) {
//             state.todayPatientsList.push(newPatient)
//         },
//         // 完成病人诊断后改变其就诊状态
//         changeTodayPatient(state, pid) {
//             state.todayPatientsList.forEach(e => {
//                 if (e.API_pid == pid) {
//                     e.API_state = "已完成"
//                 }
//             });
//         }
//     },
//     actions: {

//     },
//     modules: {}
// };
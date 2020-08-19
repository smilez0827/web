export default {
    namespace: true,
    state: {
        todayPatientsList: [],
    },
    getters: {
    },
    mutations: {
        //整体更新病人列表
        todayPatientsList(state, patients) {
            state.todayPatientsList = patients
        },
        //来新病人后添加到列表中
        addTodayPatient(state, newPatient) {
            console.log("11")
            state.todayPatientsList.push(newPatient)
        },
        // 完成病人诊断后改变其就诊状态
        changeTodayPatient(state, data) {
            console.log(data)
            state.todayPatientsList.forEach(e => {
                if (e.API_pid == data.pid) {
                    e.API_state = "已完成"
                    e.API_symptom = data.API_symptom.join(',')
                }
            });
        }
    },
    actions: {

    },
    modules: {}
};
let obj = {
    API_patientsList: [
        {
            API_date: "14:50",
            API_name: "王小虎",
            API_pid: "1",
            API_expert: "张三",
            API_state: "已完成"
        }, {
            API_date: "14:50",
            API_name: "王小虎",
            API_pid: "1",
            API_expert: "张三",
            API_state: "已完成"
        },
    ]
}


let obj2 = {
    patientInfo: {
        // 患者基本信息
        API_basicInfo: {
            API_pic: require("../../assets/img/default/person.png"),
            API_name: "王小虎",
            API_gender: "男",
            API_birthday: "1996-07-23",
            API_address: "四川省成都市",
            API_tel: "19999999999",
            API_date: "2020-06-24"
        }
    },
}

let obj3 = {
    API_treatmentLog: [
        {
            API_treatment: "西药治疗",
            API_prescription: [
                {
                    API_drugsName: "含曲林片",
                    API_drugsNumberUnits: "盒",
                    API_drugsNumber: "2",
                    API_drugsUsage: "一次两粒",
                    API_useFrequency: "一天一次",
                    API_useTime: "饭后",
                    API_isEditable: false,
                    API_days: "7"
                }
            ]
        },
        {
            API_treatment: "2",
            API_prescription: []
        },
        {
            API_treatment: "2",
            API_prescription: []
        }
    ]
}
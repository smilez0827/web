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
        API_toHospitalID: "123123123"
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
console.log(JSON.stringify(obj))
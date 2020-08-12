//患者请求接口
let obj = {
    patientInfo: {
        API_state: true,//状态信息，判断该患者是否已经完成诊断
        // 患者基本信息
        API_basicInfo: {
            API_pic: "",
            API_name: "",
            API_gender: "",
            API_birthday: "",
            API_address: "",
            API_tel: "",
            API_date: ""
        },
        // 患者病情描述
        API_illState: {
            API_description: ["头疼", "四肢无力"],//数组
            API_audio: [
                { API_audio: "音频地址", API_time: "音频时长" }
            ],
            API_video: [
                { API_video: require("../../assets/video/movie.mp4"), API_time: "视频时长" }
            ] //视频的地址，以数组的形式发过来
        },
        API_history: {
            API_familyHistory: "",//家族史
            API_allergyHistory: "",//过敏史
            API_patientistory: "",//既往史

        },
        API_examResult: [
            {
                API_type: "img",
                API_title: "CT",
                API_img: [require("../../assets/img/patienDia/ct.png"), require("../../assets/img/patienDia/ct.png")], //图片文件数组
                API_aiResult: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" //智能诊断结论
            },
            {
                API_type: "table",
                API_title: "血常规",
                API_img: [require("../../assets/img/patienDia/ct.png"), require("../../assets/img/patienDia/ct.png")], //图片文件数组
                API_table: [
                    {
                        API_item: "红细胞",
                        API_rangeBottom: "18",
                        API_rangeTop: "25",
                        API_result: "12",
                        API_unit: "mg/L",
                    }
                ],
                API_aiResult: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" //智能诊断结论
            }
        ],
        API_diagInfo: {
            //诊断结论
            API_diagResult: ["阿尔兹海默症中期", "神经损伤"],
            //治疗方案
            API_treatment: {
                API_description: ["保守治疗", "中药治疗"],
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
                ] //处方
            },
            // 推荐医疗机构/医师/护士
            API_after: {
                API_org: {
                    API_orgId: "",
                    API_orgName: ""
                },
                API_doc: {
                    API_docId: "",
                    API_docName: ""
                },
                API_nur: {
                    API_nurId: "",
                    API_nurName: ""
                }
            }
        }
    },
}

//患者病情描述选项接口
let obj2 = {
    stateOptions: [
        { pinyin: "dx", value: "担心" },
        { pinyin: "dy", value: "担忧" },
        { pinyin: "gdba", value: "感到不安" },
        { pinyin: "hpha", value: "害怕黑暗" },
        { pinyin: "hpmsr", value: "害怕陌生人" },
        { pinyin: "hprddch", value: "害怕人多的场合" },
        { pinyin: "yx", value: "易醒" },
        { pinyin: "sdbs", value: "睡得不深" },
        { pinyin: "jylbjz", value: "注意力不能集中" },
        { pinyin: "jylc", value: "记忆力差" },
        { pinyin: "ssxq", value: "丧失兴趣" },
        { pinyin: "zzyq", value: "昼重夜轻" },
        { pinyin: "syfd", value: "声音发抖" },
        { pinyin: "frfl", value: "发冷发热" },
        { pinyin: "rrwlg", value: "软弱无力感" },
        { pinyin: "xj", value: "心悸" }
    ]
}

//患者诊断结论选项接口
let obj3 = {
    diagResultCheckReconmendList: [
        {
            pinyin: "zlzdxtxshzhyaezhmz",
            value: "智能诊断系统显示患者患有阿尔兹海默症"
        },
        { pinyin: "sjss", value: "神经损伤" },
        { pinyin: "dnxwss", value: "大脑纤维束受损" },
        { pinyin: "aezhmzzq", value: "阿尔兹海默症中期" }
    ]
}

//患者治疗方案描述接口
let obj3 = {
    treatmentCheckReconmendList: [
        { pinyin: "jyjxbszl", value: "建议进行保守治疗" },
        { pinyin: "jyjxzyzl", value: "建议采用中药治疗" },
        { pinyin: "yjdyyjxjc", value: "推荐到医院进行检查" },
        { pinyin: "yjjxsszl", value: "建议到医院进行手术治疗" }
    ]
}


//历史诊断结论接口
let obj4 = {
    diagHistory: [
        ["智能诊断系统显示患有阿尔兹海默症", "神经损伤"],
        ["神经损伤"]
    ], //可选的历史诊断结论，二维数组
}

// 历史治疗方案接口
let obj5 = {
    treatHistory: [
        {
            API_description: ["建议采用中药治疗", "建议采用西药治疗"],
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
            API_description: ["建议采用中药治疗"],
            API_prescription: []
        },
        {
            API_description: ["建议采用中药治疗"],
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
        }
    ], //可选的历史治疗方案
}

// 医疗信息接口
let obj6 = {
    medicalInfo: [
        {
            orgId: "1",
            orgName: "成都市第三人民医院",
            doctors: [
                { docId: "101002", docName: "李四" },
                { docId: "101003", docName: "王五" },
                { docId: "101004", docName: "赵六" }
            ],
            nurses: [
                { nurId: "1", nurName: "王三" },
                { nurId: "2", nurName: "王二" },
                { nurId: "3", nurName: "王大" }
            ]
        },
        {
            orgId: "2",
            orgName: "成都市第一人民医院",
            doctors: [
                { docId: "1", docName: "李大" },
                { docId: "2", docName: "李二" },
                { docId: "3", docName: "李三" }
            ],
            nurses: [
                { nurId: "4", nurName: "孙一" },
                { nurId: "5", nurName: "孙二" },
                { nurId: "6", nurName: "孙三" }
            ]
        }
    ], //可选的医疗机构、医师、护士信息
}
const patientTreatment = {
    path: '/treatment',
    redirect: '/treatment/patientlist',
    name: '患者治疗',
    component: () => import('../views/patienttreatment/Layout.vue'),
    children: [
        {
            path: "/treatment/patientlist",
            name: "患者列表",
            component: () => import('../views/patienttreatment/PatientList.vue'),
        },
        {
            path: "/treatment/treatmentdetails",
            name: "治疗记录",
            component: () => import('../views/patienttreatment/TreatmentDetails.vue'),
        },
        {
            path: "/treatment/diagresult",
            name: "诊断记录",
            component: () => import('../views/patienttreatment/PatientDiagResult.vue'),
        },
    ]
}

export default patientTreatment     //导出

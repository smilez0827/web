const patientTreatment = {
    path: '/treatment',
    redirect: '/treatment/patientlist',
    name: '/',
    component: () => import('../views/patienttreatment/Layout.vue'),
    children: [
        {
            path: "/treatment/patientlist",
            name: "患者治疗",
            component: () => import('../views/patienttreatment/PatientList.vue'),
        },
        {
            path: "/treatment/treatmentdetails",
            name: "治疗记录",
            component: () => import('../views/patienttreatment/TreatmentDetails.vue'),
        },
    ]
}

export default patientTreatment     //导出

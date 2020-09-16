const operationManage = {
    path: '/operationmanage',
    redirect: '/operationmanage/patientlist',
    name: '查房管理',
    component: () => import('../views/operationmanage/Layout.vue'),
    children: [
        {
            path: "/operationmanage/patientlist",
            name: "患者列表",
            component: () => import('../views/operationmanage/PatientList.vue'),
        },
        {
            path: "/operationmanage/operationdetails",
            name: "查房记录",
            component: () => import('../views/operationmanage/manageDetails.vue'),
        },
        {
            path: "/operationmanage/diagresult",
            name: "诊断记录",
            component: () => import('../views/patienttreatment/PatientDiagResult.vue'),
        },
    ]
}

export default operationManage     //导出

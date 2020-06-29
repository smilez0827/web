import { Get, Post, Delete, FileLoad, download, Put } from '../../http/request.js'
//登录函数
export function getTodayPatients() {
    return Get('/api/patientdiag/todaypatients')
}
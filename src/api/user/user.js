import { Get, Post, Delete, FileLoad, download, Put } from '../../http/request.js'
//登录函数
export function login(data) {
    return Post('/api/login', data)
}

export function getBasicInfo() {
    return Get('/api/personalInfo')
}

export function changeBasicInfo(data) {
    return Put('/api/personalInfo', {Info:data})
}

export function getFinanceInfo() {
    return Get('/api/personalfinance')
}

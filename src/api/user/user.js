import { Get, Post, Delete, FileLoad, download } from '../../http/request.js'
//登录函数
export function login(data) {
    return Post('/api/login', data)
}

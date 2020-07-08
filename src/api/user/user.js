import { Get, Post, Delete, FileLoad, download, Put } from '../../http/request.js'
import { Message } from 'element-ui';
import router from '../../router/index.js'
import store from '../../store/index.js';

//登录
export function login(data) {
    Post('/api/login', data).then(res => {
        if ((res.data.status == 200)) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("function", JSON.stringify(res.data.function));
            localStorage.setItem("name", JSON.stringify(res.data.name));
            store.commit('userInfo', [data.UserID, res.data.name, res.data.role, res.data.function])
            router.push('/index')
        } else {
            Message({
                showClose: true,
                message: '用户名或密码错误！',
                type: 'error'
            });
        }

    })
}

//获取个人信息
export function getBasicInfo() {
    if (store.getters.basicInfo.exp == false) {
        return Get('/api/personalInfo').then(res => {
            store.commit('basicInfo', [res.data.Info.basicInfo, res.data.Info.exp])
            let obj = store.getters.basicInfo
            return obj
        })
    } else {
        return new Promise(resolve => {
            let obj = store.getters.basicInfo
            resolve(obj)
        })
    }
}

//修改个人信息
export function changeBasicInfo(data) {
    return Put('/api/personalInfo', { Info: data }).then(res => {
        console.log(res)
        if (res.status == 200) {
            if (res.data.status == 200) {
                // console.log(data)
                store.commit('basicInfo', [data.basicInfo, data.exp])
                Message({
                    message: "个人信息修改成功",
                    type: "success"
                });
            } else {
                Message.error("信息修改失败");
            }
        } else {
            Message.error("信息修改失败");
        }
    })
        .catch(() => {
            Message.error("网络中断");
        })
}

//获取财务信息
export function getAccountInfo() {
    if (store.getters.financeAccount.flag) {
        return new Promise(resolve=> {
            resolve(store.getters.financeAccount)
        })
    } else {
        return Get('/api/personalinfo/account').then(res => {
            let financeAccount = res.data.formdata;
            financeAccount.defaultType = res.data.defaulttype;
            store.commit("financeAccount", financeAccount)
            return financeAccount
        });
    }

}

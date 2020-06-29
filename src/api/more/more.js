import { Get} from '../../http/request.js'
//登录函数
export function getAdvertisement(data) {
    return Get('/api/recommend', data)
}

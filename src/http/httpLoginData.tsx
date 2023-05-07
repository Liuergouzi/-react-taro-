//登录后的缓存数据统一处理

import Taro from "@tarojs/taro"

const httpLoginData = {
    userId:Taro.getStorageSync("userId"),
    user:Taro.getStorageSync("user")
}

export default httpLoginData
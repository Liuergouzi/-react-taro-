//轮子哥 网络请求封装

import Taro from "@tarojs/taro"
import showError from '../http/errorShow'
import reUrl from "../requestUrl"

const netRequest = (datas, urlId, method, head) => {
    return new Promise<any>((resolve, reject) => {
        Taro.request({
            url: method == 'GET' ? urlId : reUrl(urlId),
            method: method,
            data: datas,
            header: { 'content-type': head == 0 ? 'application/x-www-form-urlencoded' : 'application/json', 'Authorization': 'Bearer ' + Taro.getStorageSync("token") },
            success: function (res) {
                if (res.hasOwnProperty("data")) {
                    if (res.data.hasOwnProperty("data")) {
                        if (res.data.code == 200) {
                            resolve(res)
                        } else {
                            reject(res)
                        }
                    } else {
                        reject(res)
                    }
                } else {
                    reject(res)
                }
                showError(res)
            },
            fail: function (res) {
                showError(res)
                reject(res)
            }
        })

    })
}

export default netRequest
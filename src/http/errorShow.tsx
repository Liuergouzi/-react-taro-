/**
 * 轮子哥
 * 错误弹窗
 */

import Taro from "@tarojs/taro"

const showError = (res) => {
    if (res.hasOwnProperty("data")) {
        if (res.data.hasOwnProperty("data")) {
            if (res.data.code == 400) {
                Taro.showModal({
                    title: '400',
                    content: JSON.stringify(res.data.message),
                })
            }
            if (res.data.code == 500) {
                Taro.showModal({
                    title: '500',
                    content: JSON.stringify(res.data.message),
                })
            }
            if (res.data.code == 412) {
                Taro.showModal({
                    title: '412',
                    content: JSON.stringify(res.data.message),
                })
            }
            if (res.data.code == 401) {
                Taro.showModal({
                    title: '401',
                    content: JSON.stringify(res.data.message),
                })
                Taro.removeStorageSync('userId')
                Taro.removeStorageSync('user')
                Taro.removeStorageSync('token')
            }
            if (res.data.code == 403) {
                Taro.showModal({
                    title: '403',
                    content: JSON.stringify(res.data.message),
                })
            }
            if (res.data.code == 425) {
                Taro.showModal({
                    title: '425',
                    content: JSON.stringify(res.data.message),
                })
            }
            if (res.data.code == 405) {
                Taro.showModal({
                    title: '405',
                    content: JSON.stringify(res.data.message),
                })
            }
            if (res.data.code == 410) {
                Taro.showModal({
                    title: '410',
                    content: JSON.stringify(res.data.message),
                })
            }
        }
        else {
            if (res.hasOwnProperty("data")) {
                if (res.data.hasOwnProperty("status")) {
                    if (res.data.status == 500) {
                        Taro.showModal({
                            title: '连接超时',
                            content: "连接超时，请稍后重试" + JSON.stringify(res.data.error),
                        })
                    } else if (res.data.status == 502) {
                        Taro.showModal({
                            title: '服务繁忙',
                            content: "服务繁忙，请稍后重试！ " + JSON.stringify(res.data.error),
                        })
                    }
                    else if (res.data.status == 404) {
                        Taro.showModal({
                            title: '服务请求失败',
                            content: "请联系轮子哥" + JSON.stringify(res.data.error),
                        })
                    }
                    else {
                        Taro.showModal({
                            title: '请求失败',
                            content: "错误：" + JSON.stringify(res.data),
                        })
                    }
                } else {
                    Taro.showModal({
                        title: '未知异常',
                        content: "未知异常：" + JSON.stringify(res.data),
                    })
                }
            } else {
                Taro.showModal({
                    title: '未知异常',
                    content: "未知异常：" + JSON.stringify(res.data),
                })
            }
        }
    } else {
        Taro.showModal({
            title: '未知异常',
            content: "未知异常：" + JSON.stringify(res),
        })
    }
}

export default showError

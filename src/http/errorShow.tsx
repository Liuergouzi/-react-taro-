/**
 * 轮子哥
 * 错误弹窗
 */

import Taro from "@tarojs/taro"

const showError = (res) => {
    if (res.data.hasOwnProperty("data")) {
        if (res.data.code == 400) {
            Taro.showModal({
                title: '请求失败',
                content: JSON.stringify(res.data.message),
            })
        }
    }
    else {
        if (res.data.hasOwnProperty("status")) {
            if (res.data.status == 500) {
                Taro.showModal({
                    title: '服务内部异常！',
                    content: "服务内部发生异常错误！ " + JSON.stringify(res.data.error),
                })
            } else if (res.data.status == 502) {
                Taro.showModal({
                    title: '连接超时！',
                    content: "网络状态异常，请稍后重试！ " + JSON.stringify(res.data.error),
                })
            }
            else if (res.data.status == 404) {
                Taro.showModal({
                    title: '服务地址发生更变！',
                    content: "请联系轮子哥！ " + JSON.stringify(res.data.error),
                })
            }
            else {
                Taro.showModal({
                    title: '请求失败',
                    content: "未知错误：" + JSON.stringify(res.data),
                })
            }
        } else {
            Taro.showModal({
                title: '请求失败',
                content: "未知错误：" + JSON.stringify(res.data),
            })
        }
    }
}

export default showError

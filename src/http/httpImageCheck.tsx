//轮子哥 文本校验封装

import Taro from "@tarojs/taro"
import reUrl from "../requestUrl"

const netRequestImageCheck = (image) => {
    return new Promise<any>((resolve, reject) => {
        Taro.request({
            url: reUrl('imageCheck'),
            method: 'POST',
            data: {"media":image},
            header: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + Taro.getStorageSync("token") },
            success: function (res) {
                if (res.hasOwnProperty("data")) {
                    if (res.data.hasOwnProperty("data")) {
                        if (res.data.data != null) {
                            if (res.data.data.suggest == 'pass') {
                                resolve(res)
                            } else {
                                if (res.data.data.label == 10001) {
                                    Taro.showToast({
                                        title: '禁止发布任何广告！',
                                        icon: 'none',
                                        duration: 1500
                                    })
                                    reject(res)
                                }
                                else if (res.data.data.label == 20001) {
                                    Taro.showToast({
                                        title: '学习新思想，争做新青年！',
                                        icon: 'none',
                                        duration: 1500
                                    })
                                    reject(res)
                                }
                                else if (res.data.data.label == 20002) {
                                    Taro.showToast({
                                        title: '万恶淫之首！',
                                        icon: 'none',
                                        duration: 1500
                                    })
                                    reject(res)
                                }
                                else if (res.data.data.label == 20003) {
                                    Taro.showToast({
                                        title: '善于结善缘，恶语伤人心！',
                                        icon: 'none',
                                        duration: 1500
                                    })
                                    reject(res)
                                }
                                else if (res.data.data.label == 20006) {
                                    Taro.showToast({
                                        title: '天网恢恢法制临,惩奸除恶报应急!',
                                        icon: 'none',
                                        duration: 1500
                                    })
                                    reject(res)
                                }
                                else if (res.data.data.label == 20008) {
                                    Taro.showToast({
                                        title: '诈骗自有言如玉,信之却无黄金屋!',
                                        icon: 'none',
                                        duration: 1500
                                    })
                                    reject(res)
                                }
                                else if (res.data.data.label == 20012) {
                                    Taro.showToast({
                                        title: '不要被低俗虚掷你的黄金时代!',
                                        icon: 'none',
                                        duration: 1500
                                    })
                                    reject(res)
                                }
                                else if (res.data.data.label == 20013) {
                                    Taro.showToast({
                                        title: '有版有眼有法律,莫偷莫盗莫欺人!',
                                        icon: 'none',
                                        duration: 1500
                                    })
                                    reject(res)
                                }
                                else if (res.data.data.label == 21000) {
                                    Taro.showToast({
                                        title: '非法输入!',
                                        icon: 'none',
                                        duration: 1500
                                    })
                                    reject(res)
                                } 
                                else {
                                    Taro.showToast({
                                        title: '内容不合法请重新输入！',
                                        icon: 'none',
                                        duration: 1500
                                    })
                                    reject(res)
                                }
                            }
                        } else {
                            Taro.showToast({
                                title: '校验失败！',
                                icon: 'none',
                                duration: 1500
                            })
                            reject(res)
                        }
                    } else {
                        Taro.showToast({
                            title: '校验失败！',
                            icon: 'none',
                            duration: 1500
                        })
                        reject(res)
                    }
                } else {
                    Taro.showToast({
                        title: '校验失败！',
                        icon: 'none',
                        duration: 1500
                    })
                    reject(res)
                }
            },
            fail: function (res) {
                Taro.showToast({
                    title: '校验失败！',
                    icon: 'none',
                    duration: 1500
                })
                reject(res)
            }
        })

    })
}

export default netRequestImageCheck
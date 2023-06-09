//轮子哥图片校验封装

import Taro from "@tarojs/taro"
import reUrl from "../requestUrl"

const httpImageCheck = (urls) => {
    return new Promise<any>((resolve, reject) => {
        Taro.chooseImage({
            count: 1,
            success(ress) {
                const tempFilePaths = ress.tempFilePaths
                Taro.showLoading({ title: '校验图片合法性中...' })
                Taro.uploadFile({
                    url: reUrl('imageCheck'),
                    filePath: tempFilePaths[0],
                    name: 'media',
                    formData: {
                        'imgUrlName': urls
                    },
                    withCredentials: false,
                    header:{'Authorization': 'Bearer ' + Taro.getStorageSync("token")},
                    success(res: any) {
                        Taro.hideLoading()
                        const returns = JSON.parse(res.data)
                        if (returns.hasOwnProperty("code")) {
                            if (returns.code == 200) {
                                if (returns.data == "ok") {
                                    Taro.showLoading({ title: '验证通过，上传中' })
                                    Taro.uploadFile({
                                        url: reUrl('saveImg'),
                                        filePath: tempFilePaths[0],
                                        name: 'file',
                                        formData: {
                                            'imgUrlName': urls
                                        },
                                        withCredentials: false,
                                        header:{'Authorization': 'Bearer ' + Taro.getStorageSync("token")},
                                        success(ress: any) {
                                            Taro.hideLoading()
                                            const returnss = JSON.parse(ress.data)
                                            if (returnss.hasOwnProperty("url")) {
                                                resolve(returnss.url)
                                            } else {
                                                Taro.showToast({
                                                    title: '图片上传失败，请稍后重试!',
                                                    icon: 'none',
                                                    duration: 1500
                                                })
                                                reject(res)
                                            }
                                        },
                                        fail(error) {
                                            Taro.showToast({
                                                title: '图片上传失败，请稍后重试!',
                                                icon: 'none',
                                                duration: 1500
                                            })
                                            reject(error)
                                            Taro.hideLoading()
                                        }
                                    })
                                } else {
                                    Taro.showToast({
                                        title: '图片违规!',
                                        icon: 'none',
                                        duration: 1500
                                    })
                                    reject(res)
                                }
                            } else {
                                Taro.showModal({
                                    title: '401',
                                    content: JSON.stringify(returns.message),
                                })
                            }
                        } else {
                            Taro.showToast({
                                title: '校验失败或者未登录!',
                                icon: 'none',
                                duration: 1500
                            })
                            reject(res)
                        }
                    },
                    fail(res) {
                        Taro.showToast({
                            title: '请求失败!',
                            icon: 'none',
                            duration: 1500
                        })
                        reject(res)
                        Taro.hideLoading()
                    }
                })
            }
        })

    })
}

export default httpImageCheck

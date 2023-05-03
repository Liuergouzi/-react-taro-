import BottomNavigation from '../../component/navigation/BottomNavigation';
import style from './My.module.scss'
import My_bottom_list from './My_bottom_list';
import My_head_buttom from './My_head_buttom';
import React, { useEffect, useState } from 'react'
import store from '../../sclice/Store'
import { Provider } from 'react-redux';
import TopMostTaroNavigationBar from "../../component/navigation/TopMostTaroNavigationBar";
import MyHead from './MyHead';
import netRequest from '../../http/http';
import Taro from '@tarojs/taro';
import re from '../../requestUrl';

const My = React.memo(() => {

    const [user, setUser]= useState(
        {
            "avatar": "", "followCount": 0, "fansCount": 0,
            "nickname": "未命名用户", "grade": "", "sex": "男","useLogin":false,
            "address": "", "description": "", "isInfo": "false"
        }
    )
    const [articleTotal,setArticleTotal]=useState({"loveCount": 0, "articleCount": 0})

    useEffect(() => {
        if (Taro.getStorageSync("user") != "") {
            netRequest({}, re('info'), 'GET', 0)
                .then((res) => {
                    Taro.setStorageSync("user", res.data.data)
                    let userTemp = JSON.parse(JSON.stringify(user));
                    const useStore = res.data.data
                    userTemp.useLogin = true
                    if (useStore.avatar != null)
                        userTemp.avatar = useStore.avatar
                    if (useStore.nickname != null)
                        userTemp.nickname = useStore.nickname
                    if (useStore.followCount != null)
                        userTemp.followCount = useStore.followCount
                    if (useStore.fansCount != null)
                        userTemp.fansCount = useStore.fansCount
                    if (useStore.grade != null)
                        userTemp.grade = useStore.grade
                    if (useStore.sex != null)
                        userTemp.sex = useStore.sex
                    if (useStore.address != null)
                        userTemp.address = useStore.address
                    if (useStore.description != null)
                        userTemp.description = useStore.description
                    if (useStore.isInfo == false || useStore.isInfo == true)
                        userTemp.isInfo = String(useStore.isInfo)
                    setUser(userTemp)
                })
                .catch(() => {
                })
        }

        netRequest({ userId: Taro.getStorageSync("userId") }, 'getArticleTotal', 'POST', 0)
            .then((res) => {
                let articleTemp = JSON.parse(JSON.stringify(articleTotal))
                articleTemp.loveCount = res.data.data[0].loveCount
                articleTemp.articleCount = res.data.data[0].articleCount
                setArticleTotal(articleTemp)
            })
            .catch(() => {
            })

    }, [])

    return (
        <Provider store={store}>
            <TopMostTaroNavigationBar needBackIcon={false} mainTitle={'我的'} />
            <MyHead data={{useLogin:user.useLogin, avatar:user.avatar, nickname:user.nickname,sex:user.sex}} />
            <div className={style.waveWrapperInner + " " + style.waveAnimation}>
                <div className={style.wave + " " + style.waveTop}></div>
                <div className={style.wave + " " + style.waveMiddle}></div>
            </div>
            <My_head_buttom data={{ followCount: user.followCount, fansCount: user.fansCount, loveCount: articleTotal.loveCount, articleCount: articleTotal.articleCount }} />
            <My_bottom_list />
            <BottomNavigation />
        </Provider>
    )
}
)
export default My
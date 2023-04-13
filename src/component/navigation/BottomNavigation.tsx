
import { NavLink, useLocation } from 'react-router-dom'
import routers from '../../router/router';
import style from './BottomNavigation.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import time from '../../tool/time';
import { openSocket, setChatDataAll,setChatDefaultListOne } from '../../sclice/Notice_Sclice'
import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
/**
 * 轮子哥
 * 自定义底部tabbar
 */

export default function BottomNavigation() {

    const currentUrl = useLocation().pathname

    const dispatch: any = useDispatch()
    const chatListData: any = useSelector((state: any) => state.Notice_Reducer.chatList)
    const [newMessage, setNewMessage] = useState(false)
    //五大页面共同组件，初始化即打开socket连接
    useEffect(() => {
        dispatch(openSocket())
    })
    //接收到消息，及时更新缓存的数据列表
    Taro.onSocketMessage(function (res) {
        const resData = JSON.parse(res.data)
        if(resData.hasOwnProperty("type")){
            dispatch(setChatDefaultListOne(resData))
        }else{
            let chatTemp = JSON.parse(JSON.stringify(chatListData))
            chatTemp.forEach(element => {
                if (element.otherId == resData.sendId) {
                    element.redCount = Number(element.redCount) + 1
                    resData.messageType == 'text' ? element.message = resData.message : element.message = '[图片]'
                    element.time = time
                }
            });
            dispatch(setChatDataAll(chatTemp))
        }
        setNewMessage(true)
    })

    return (

        <div className={style.BottomNavigation}>
            {
                routers.map(
                    item =>
                        item.isBottomTabbar &&
                        <NavLink to={item.path} key={item.path} className={({ isActive }) => isActive ? style.BottomNavigationTrue : style.BottomNavigationFalse}>
                            {item.path == '/notice' && newMessage ? <div className={style.red}>new</div> : ''}
                            <img src={currentUrl === item.path ? item.imgUrlTrue : item.imgUrlFalse} className={style.BottomNavigationImg}></img>
                            {item.title}
                        </NavLink>
                )
            }
        </div>
    )
}



import { useEffect } from 'react'

import {  useDispatch, useSelector } from 'react-redux';
import time from '../tool/time';
import { openSocket, setChatDataAll,setChatDefaultListOne } from '../sclice/Notice_Sclice'
import Taro from '@tarojs/taro';

export default function Appsocket() {

    const dispatch: any = useDispatch()
    const chatListData: any = useSelector((state: any) => state.Notice_Reducer.chatList)
    //五大页面共同组件，初始化即打开socket连接
    useEffect(() => {
        dispatch(openSocket())
    },[])
    //接收到消息，及时更新缓存的数据列表
    Taro.onSocketMessage(function (res) {
        console.log("接收到消息"+JSON.stringify(res))
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
    })

  return (
    <div></div>
  )
}

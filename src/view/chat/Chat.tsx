import { useEffect, useState } from "react"
import Taro from "@tarojs/taro"
import { Toast } from '@antmjs/vantui'
import images from "../../resources"
import style from './Chat.module.scss'
import time from "../../tool/time"
import TopMostTaroNavigationBar from "../../component/navigation/TopMostTaroNavigationBar"
import netRequest from "../../http/http"
import netRequestTextCheck from "../../http/httpTextCheck"
import httpImageCheck from "../../http/httpImageCheck"

export default function Chat() {

    const setChatItemClick = Taro.getStorageSync("setChatItemClick")
    const sendId = Taro.getStorageSync("userId")
    const receiveId = setChatItemClick.id
    const [messageList, setMessageList] = useState<any[]>([])
    const [messageText, setMessageText] = useState("")
    const [inputButtom, setInputButtom] = useState(0)
    const [other] = useState({ headImg: setChatItemClick.head, name: setChatItemClick.name })
    const [me] = useState({ headImg: images.testH1, name: "萨斯给" })
    const [isHistory, setIsHistory] = useState(true)
    const [pageIndex, setPageIndex] = useState(0)
    const [isScroll, setIsScroll] = useState(true)

    //初始化连接
    useEffect(() => {
        handleClick(true)
        return () => {
            // Taro.closeSocket()
        }
    }, [])


    //加载更多
    const handleClick = (isOnce) => {
        netRequest({
            sendId: sendId,
            receiveId: setChatItemClick.id,
            pageIndex: pageIndex,
            pageSize: 10
        }, 'getMessage', 'POST', 0)
            .then((res) => {
                res.data.data.length != 10 && setIsHistory(false),
                    console.log(),
                    setMessageList([...res.data.data.reverse(), ...messageList]),
                    !isOnce && setIsScroll(false)
            })
            .catch(() => {
                setPageIndex(pageIndex - 1)
            })
        setPageIndex(pageIndex + 1)
    }


    //socket监听
    // Taro.onSocketOpen(function () {
    //     setSocketOpen(true)
    // })
    Taro.onSocketError(function () {
        Toast.show("聊天服务连接失败,请联系轮子哥");
    })
    Taro.onSocketMessage(function (res) {
        setMessageList([...messageList, { sendId: receiveId, receiveId: sendId, messageType: JSON.parse(res.data).messageType, message: JSON.parse(res.data).message, time: time }])
    })

    //消息存储
    const insertMessage = (message, messageType, time) => {
        netRequest({
            sendId: sendId,
            receiveId: receiveId,
            sendType: "one",
            message: message,
            messageType: messageType,
            time: time
        }, 'chatInsert', 'POST', 0)
            .then(() => {
            })
            .catch(() => {
            })
    }

    //监听滚动底部
    useEffect(() => {
        //控制加载更多时不滚动到底部
        if (isScroll) {
            scrollToBottom()
        } else {
            setIsScroll(true)
        }
    }, [messageList]);
    //滚动底部
    const scrollToBottom = () => {
        Taro.createSelectorQuery().select('#chatWindow').boundingClientRect(function (rect: any) {
            if (rect) {
                Taro.pageScrollTo({
                    scrollTop: rect.height
                })
            }
        }).exec()
    }

    //发送文本
    const sendText = () => {
        const sendTime = time;
        const sendData = {
            sendId: sendId, receiveId: receiveId, sendType: "one", messageType: "text",
            message: messageText, time: sendTime
        }
        if (messageText === "") {
            Toast.show("道友为何如此沉默寡言？");
            return;
        }
        netRequestTextCheck(JSON.stringify(sendData)).then(() => {
            Taro.sendSocketMessage({
                data: JSON.stringify(sendData)
            })
            insertMessage(messageText, "text", sendTime)
            setMessageList(() => ([...messageList, sendData]))
            setMessageText("")
        })
    }

    //发送图片
    function openImg() {
        const sendTime = time;
        httpImageCheck( "chat" + "-" + receiveId + "-" +sendId+ sendTime+Math.random() + ".png").then((res)=>{
            const sendData = {
                sendId: sendId, receiveId: receiveId, sendType: "one", messageType: "image",
                message: res, time: sendTime
            }
            Taro.sendSocketMessage({
                data: JSON.stringify(sendData)
            })
            setMessageList(() => ([...messageList, sendData]))
            insertMessage(res, "image", sendTime)
        }).catch()
    }


    return (
        <div>
            <TopMostTaroNavigationBar needBackIcon={true} mainTitle={"和 " + other.name + " 聊天"} goTop={true} />

            <div className={style.contain} id="chatWindow">
                {isHistory ? <div className={style.centerTip} onClick={() => { handleClick(false) }}>加载更多</div> : ''}
                {
                    messageList.map((item,index) =>
                        <div key={index}>
                            <div className={style.itemMessage} style={item.sendId != sendId ? {} : { flexDirection: "row-reverse" }}>
                                <img src={item.sendId != sendId ? other.headImg : me.headImg} className={style.headImg}></img>
                                {
                                    item.messageType == 'image' ? <img src={item.message} className={style.chatImg} /> :
                                        <div className={style.chatOuter}>{item.message}</div>
                                }
                            </div>
                            <div className={style.time}>{item.time}</div>
                        </div>
                    )
                }
            </div>

            <div className={style.chatBottom} style={{ bottom: inputButtom + 'px' }}>
                <div className={style.chatBottomDiv}>
                    <div className={style.bottomLeft}>
                        <img src={images.picture} className={style.bottomImg} onClick={() => openImg()} />
                    </div>
                    <div className={style.inputDiv} >
                        <input className={style.bottomInput} placeholder="开始你的聊天吧！" adjust-position={false}
                            onFocus={(e: any) => { e.detail.height && setInputButtom(e.detail.height) }}
                            onBlur={() => { setInputButtom(0) }} value={messageText}
                            onInput={(e: any) => setMessageText(e.target.value)} />
                    </div>
                    <div className={style.bottomRight}>
                        <img src={images.emote} className={style.bottomImg} />
                        <div className={style.bottomButton} onClick={() => sendText()}>发送</div>
                    </div>
                </div>
            </div>

            <Toast />
        </div>

    )
}

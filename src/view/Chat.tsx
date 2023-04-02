import { useEffect, useState } from "react"
import Taro from "@tarojs/taro"
import { Toast } from '@antmjs/vantui'
import images from "../resources"
import style from '../style/Chat.module.scss'
import time from "../tool/time"
import reUrl from "../config"
import TopBar from "../component/TopBar"

export default function Chat({ sendId = "1" }) {

    const setChatItemClick = Taro.getStorageSync("setChatItemClick")
    const receiveId = setChatItemClick.id

    const [messageList, setMessageList] = useState<any[]>([])

    const [socketOpen, setSocketOpen] = useState(false)
    const [messageText, setMessageText] = useState("")
    const [inputButtom, setInputButtom] = useState(0)
    const [other] = useState({ headImg: setChatItemClick.head, name: setChatItemClick.name })
    const [me] = useState({ headImg: images.testH1, name: "萨斯给" })
    const [isHistory, setIsHistory] = useState(true)
    const [pageIndex,setPageIndex] =useState(0)

    useEffect(() => {
        Taro.connectSocket({
            url: reUrl.chatWebSocket + sendId,
        })
        handleClick()
        return () => {
            Taro.closeSocket()
        }
    }, [])


    const handleClick = () => {
        Taro.request({
            url: reUrl.getMessage,
            method: 'POST',
            data: {
                sendId: sendId,
                receiveId: setChatItemClick.id,
                pageIndex: pageIndex,
                pageSize: 3
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                if (res.data.hasOwnProperty("data")) (
                    res.data.data.length != 3 && setIsHistory(false),
                    console.log(),
                    setMessageList([...res.data.data.reverse(),...messageList])
                )
                else {
                    setPageIndex(pageIndex-1)
                }
            }
        })
        setPageIndex(pageIndex+1)
    }


    Taro.onSocketOpen(function () {
        setSocketOpen(true)
    })

    Taro.onSocketError(function () {
        Toast.show("聊天服务连接失败,请联系轮子哥");
    })


    Taro.onSocketMessage(function (res) {
        setMessageList([...messageList, { sendId: sendId, receiveId: receiveId, messageType: "text", message: res.data, time: time, isOther: true }])
    })


    const insertMessage = (message, messageType, time) => {
        Taro.request({
            url: reUrl.chatInsert,
            data: {
                sendId: sendId,
                receiveId: receiveId,
                sendType: "one",
                message: message,
                messageType: messageType,
                time: time
            },
            header: {
                'content-type': 'application/json'
            },
            // success: function (res) {
            //     console.log(res.data)
            // }
        })
    }

    const sendText = () => {
        const sendTime = time;
        const sendData = {
            sendId: sendId, receiveId: receiveId, sendType: "one", messageType: "text",
            message: messageText, time: sendTime, isOther: false
        }
        if (messageText === "") {
            Toast.show("道友为何如此沉默寡言？");
            return;
        }
        if (socketOpen) {
            Taro.sendSocketMessage({
                data: JSON.stringify(sendData)
            })
        } else {
            Toast.show("消息已发送，但对方可能无法实时接收");
        }
        insertMessage(messageText, "text", sendTime)
        setMessageList([...messageList, sendData])
        setMessageText("")
    }



    function openImg() {
        const sendTime = time;
        Taro.chooseImage({
            count: 1,
            success(res) {
                const sendData = {
                    sendId: sendId, receiveId: receiveId, sendType: "one", messageType: "image",
                    message: res.tempFilePaths[0], time: sendTime, isOther: false
                }
                setMessageList([...messageList, sendData])
                // Taro.showLoading({ title: '图片上传中...' })
                const tempFilePaths = res.tempFilePaths
                Taro.uploadFile({
                    url: reUrl.chatUploadImg,
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                        'imgUrlName': sendId + "/" + receiveId + "/" + sendTime + ".png"
                    },
                    success(res: any) {
                        const sendData = {
                            sendId: sendId, receiveId: receiveId, sendType: "one", messageType: "image",
                            message: res.data, time: sendTime, isOther: false
                        }
                        Taro.sendSocketMessage({
                            data: JSON.stringify(sendData)
                        })
                        insertMessage(JSON.parse(res.data).url, "image", sendTime)
                        // Taro.hideLoading()
                        // Taro.showModal({
                        //     title: '返回结果',
                        //     content: JSON.stringify(res.data),
                        // })
                    },
                    fail(res: any) {
                        Toast.show(res.message);
                    }
                })
            }
        })
    }


    return (
        <div>
            <TopBar leftShow={true}>
                <div className={style.chatTop}>
                    <img src={other.headImg} className={style.headImg} />
                    <div className={style.headName}>{other.name}</div>
                </div>
            </TopBar>


            <div className={style.contain}>
                {isHistory ? <div className={style.centerTip} onClick={()=>{handleClick()}}>加载更多</div> : ''}
                {
                    messageList.map((item) =>
                        <div>
                            <div className={style.itemMessage} style={item.sendId != sendId ? {} : { flexDirection: "row-reverse" }}>
                                <img src={item.sendId != sendId ? other.headImg : me.headImg} className={style.headImg}></img>
                                {
                                    item.messageType === 'image' ? <img src={item.message} className={style.chatImg} /> :
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
                            onBlur={() => { setInputButtom(0) }}
                            value={messageText} onChange={(e: any) => setMessageText(e.detail.value)} />
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

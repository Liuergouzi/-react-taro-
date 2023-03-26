import { useEffect, useState } from "react"
import { axios } from 'taro-axios'
import { List } from 'lodash'
import Taro from "@tarojs/taro"
import { Toast } from '@antmjs/vantui'
import images from "../resources"
import style from '../style/Chat.module.scss'
import { useNavigate } from 'react-router-dom'
import time from "../tool/time"
import reUrl from "../config"

export default function Chat({ sendId = "1", receiveId = "2" }) {

    const [messageList, setMessageList] = useState([
        { sendId: "2", receiveId: "1", messageType: "text", message: "你好", time: "2023-03-20", isOther: true },
        { sendId: "1", receiveId: "2", messageType: "text", message: "有多好", time: "2023-03-20", isOther: false },
        { sendId: "2", receiveId: "1", messageType: "text", message: "你好", time: "2023-03-20", isOther: true },
        { sendId: "1", receiveId: "2", messageType: "text", message: "有多好?", time: "2023-03-20", isOther: false },
    ])

    const [socketOpen, setSocketOpen] = useState(false)
    const [messageText, setMessageText] = useState("")
    const [inputButtom, setInputButtom] = useState(0)

    const [other, setOther] = useState({ headImg: images.testH2, name: "路吠" })
    const [me, setMe] = useState({ headImg: images.testH1, name: "萨斯给" })

    const navigate = useNavigate();

    useEffect(() => {
        Taro.connectSocket({
            url: reUrl.chatWebSocket + sendId,
        })
        return () => {
            Taro.closeSocket()
        }
    }, [])

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
        insertMessage(messageText,"text",sendTime)
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
                    success(res:any) {
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
            <div className={style.chatTop}>
                <div onClick={() => { navigate("/notice"); }}>返回</div>
                <img src={other.headImg} className={style.headImg} />
                <div className={style.headName}>{other.name}</div>
            </div>

            <div className={style.contain}>
                {
                    messageList.map((item) =>
                        <div>
                            <div className={style.itemMessage} style={item.isOther ? {} : { flexDirection: "row-reverse" }}>
                                <img src={item.isOther ? other.headImg : me.headImg} className={style.headImg}></img>
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

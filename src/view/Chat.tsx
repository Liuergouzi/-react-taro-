import { useEffect, useState } from "react"
import { axios } from 'taro-axios'
import { List } from 'lodash'
import Taro from "@tarojs/taro"
import { Toast } from '@antmjs/vantui'

export default function Chat() {

    const [messageList, setMessageList] = useState([
        { id: "1", message: "你好世界" }
    ])

    const [socketOpen, setSocketOpen] = useState(false)
    const [messageText, setMessageText] = useState("")

    const handleClick = () => {
        Toast.show("服务连接失败,请联系轮子哥");
        return new Promise((resolve, reject) => {
            axios.get("http://localhost:9090/ws/getMessage?sendAccount=2121213&receiveAccount=12sdi3&pageIndex=0&pageSize=3")
                .then(res => {
                    console.log(res)
                    const append: List<any> = []
                    resolve(append)
                })
                .catch((error) => {
                    const appends: List<any> = [{ id: 1, name: "error" }]
                    reject(appends)
                }
                )
        });
    }


    var random = Math.floor(Math.random() * 1000)

    useEffect(() => {
        Taro.connectSocket({
            url: 'ws://localhost:9090/ws/' + "1",
        })

    },[])

    Taro.onSocketOpen(function (res) {
        setSocketOpen(true)
    })

    Taro.onSocketError(function (res) {
        Toast.show("聊天服务连接失败,请联系轮子哥");
    })

    Taro.onSocketMessage(function (res) {
        console.log(res)
    })

    const sendText = () => {

        const sendData:string=JSON.stringify({"sendId":"1","receiveId":"2","sendType":"one","messageType":"text","message":messageText,"time":"2023-03-20"})
        if (messageText === "") {
            Toast.show("道友为何如此沉默寡言？");
            return;
        }
        if (socketOpen) {
            Taro.sendSocketMessage({
                data: sendData
            })

        } else {
            Toast.show("当前聊天服务连接异常，对方可能无法实时接收");
            
        }
    }

    return (
        <div>
            {
                messageList.map((item) =>
                    <div key={item.id}>{item.message}</div>
                )
            }
            <div>
                <input type="text" placeholder="开始你的聊天吧！" value={messageText} onChange={(e: any) => setMessageText(e.detail.value)} />
                <div onClick={() => sendText()}>发送</div>
            </div>
            <Toast />
        </div>

    )
}

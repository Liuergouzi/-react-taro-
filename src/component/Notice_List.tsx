import style from '../style/Notice_List.module.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setChatDataAll } from '../sclice/Notice_Sclice'
import LoadMore from "./LoadMore";
import reUrl from "../config"
import { useState } from 'react';
import Taro from "@tarojs/taro";
import time from '../tool/time';
/**
 * 轮子哥
 * 自定义信息列表组件
 */

export default function Notice_List() {
    const navigate = useNavigate();
    const dispatch: any = useDispatch()
    const sendId: string = Taro.getStorageSync("socketId")
    const chatListData: any = useSelector((state: any) => state.Notice_Sclice_State.chatList)
    const [pageIndex] = useState(0);
    const [pageSize] = useState(15);

    const handleClick = (item: any, index: any) => {
        //更新小红点
        if (chatListData[index].redCount != 0) {
            Taro.request({
                url: reUrl.redReset,
                method: 'POST',
                data: { sendId: item.otherId, receiveId: sendId },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function () {
                    let chatTemp = JSON.parse(JSON.stringify(chatListData))
                    chatTemp[index].redCount = 0
                    dispatch(setChatDataAll(chatTemp))
                }
            })
        }
        //跨页面存入本地
        Taro.setStorageSync('setChatItemClick', { id: item.otherId, head: item.head, name: item.name })
        navigate("/chat");
    }



    return (
        <div>
            {sendId != "" ?
                <LoadMore
                    requesUrl={reUrl.getChatList}
                    viewId={'Notice_List'}
                    height={(Taro.getWindowInfo().screenHeight - 100) / 1.05 + 'px'}
                    ListCount={chatListData.length}
                    defaultListCount={3}
                    requestData={{
                        id: sendId,
                        pageIndex: pageIndex,
                        pageSize: pageSize
                    }}>
                    <div className={style.Notice_List}>
                        {
                            chatListData.map((item, index) => (
                                <div key={item.time} className={style.list_item} onClick={() => handleClick(item, index)} >
                                    <img src={item.head} className={style.itemImg} />
                                    <div className={style.list_center}>
                                        <div className={style.list_bottom}>
                                            <div className={style.list_title}>{item.name}</div>
                                            <div className={style.list_time}>
                                                {item.time != null && item.time != "" ?
                                                    (item.time.split(" ")[0] == time.split(" ")[0] ? item.time.split(" ")[1] : item.time.split(" ")[0]) : ""}
                                            </div>
                                        </div>
                                        <div className={style.list_bottom}>
                                            <div className={style.list_message}>
                                                {item.message}
                                            </div>

                                            {
                                                item.redCount > 0 && item.redCount <= 99 && <div className={style.list_red}>{item.redCount}</div>
                                            }
                                            {
                                                item.redCount > 99 && <div className={style.list_red}>99</div>
                                            }
                                        </div>
                                    </div>

                                </div>
                            )
                            )
                        }
                    </div>
                </LoadMore>
                :
                <div>
                    <div className={style.Notice_List}>
                        {
                            chatListData.map((item, index) => (
                                <div key={item.time} className={style.list_item} onClick={() => handleClick(item, index)} >
                                    <img src={item.head} className={style.itemImg} />
                                    <div className={style.list_center}>
                                        <div className={style.list_bottom}>
                                            <div className={style.list_title}>{item.name}</div>
                                            <div className={style.list_time}>
                                                {item.time != null && item.time != "" ?
                                                    (item.time.split(" ")[0] == time.split(" ")[0] ? item.time.split(" ")[1] : item.time.split(" ")[0]) : ""}
                                            </div>
                                        </div>
                                        <div className={style.list_bottom}>
                                            <div className={style.list_message}>
                                                {item.message}
                                            </div>
                                            {
                                                item.redCount > 0 && item.redCount <= 99 && <div className={style.list_red}>{item.redCount}</div>
                                            }
                                            {
                                                item.redCount > 99 && <div className={style.list_red}>99</div>
                                            }
                                        </div>
                                    </div>

                                </div>
                            )
                            )
                        }
                    </div>
                    <div className={style.noLogin1}>你还没有登录<div className={style.noLogin2} onClick={()=>{navigate("/login");}}>去登录?</div></div>
                </div>
            }
        </div>
    )
}
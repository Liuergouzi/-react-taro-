import style from './NoticeLoadMore.module.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setChatDataAll, setChatDefaultListRedCount } from '../../sclice/Notice_Sclice'
import LoadMore from "../../component/loadmore/LoadMore";
import reUrl from "../../config"
import Taro from "@tarojs/taro";
import time from '../../tool/time';


/**
 * 轮子哥
 * 自定义信息列表组件
 */

export default function NoticeLoadMore() {
    const navigate = useNavigate();
    const dispatch: any = useDispatch()
    const sendId: string = Taro.getStorageSync("socketId")
    const chatListData: any = useSelector((state: any) => state.Notice_Reducer.chatList)
    const pageIndex: number = useSelector((state: any) => state.Notice_Reducer.pageIndex);
    const pageSize = 15;

    const handleClick = (item: any, index: any) => {
        if (index <= 2 && chatListData[index].redCount != 0) {
            let type: string = "system"
            if (index == 1) {
                type = "interaction"
            } else if (index == 2) {
                type = "friend"
            }
            Taro.request({
                url: reUrl.updateMonRedCount,
                method: 'POST',
                data: { id: sendId, type: type },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
            })
            dispatch(setChatDefaultListRedCount(index))
        }
        //更新小红点
        if (chatListData[index].redCount != 0 && index > 2) {
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
        switch (item.otherId) {
            case -27333: sendId != "" && navigate("/sysNotice"); break;
            case -28333: sendId != "" && navigate("/interaction"); break;
            case -29333: sendId != "" && navigate("/newFriend"); break;
            default:        //跨页面存入本地
                Taro.setStorageSync('setChatItemClick', { id: item.otherId, head: item.head, name: item.name })
                navigate("/chat");
        }
    }


    return (
        <div>

            {sendId != "" ?
                <LoadMore
                    requesUrl={reUrl.getChatList}
                    viewId={'Notice_List'}
                    height={(Taro.getWindowInfo().screenHeight) - 106 * (Taro.getWindowInfo().screenHeight) / 568 + 'px'}
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
                                <div key={item.otherId} className={style.list_item} onClick={() => handleClick(item, index)} >
                                    <img src={item.head} className={style.itemImg} />
                                    <div className={style.list_center}>
                                        <div className={style.list_bottom}>
                                            <div className={style.list_title}>
                                                {item.name}
                                                {item.online == true ? <div className={style.list_online}>在线</div> : ''}
                                            </div>
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
                                                item.redCount > 0 && index <= 2 && <div className={style.list_red}>新</div>
                                            }
                                            {
                                                item.redCount > 0 && item.redCount <= 99 && index > 2 && <div className={style.list_red}>{item.redCount}</div>
                                            }
                                            {
                                                item.redCount > 99 && index > 2 && <div className={style.list_red}>99</div>
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
                                <div key={item.otherId} className={style.list_item} onClick={() => handleClick(item, index)} >
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
                    <div className={style.noLogin1}>你还没有登录<div className={style.noLogin2} onClick={() => { navigate("/login"); }}>去登录?</div></div>
                </div>
            }

        </div>
    )
}
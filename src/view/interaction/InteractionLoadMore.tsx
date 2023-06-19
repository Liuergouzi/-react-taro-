import style from './InteractionLoadMore.module..scss'
import images from '../../resources'
import LoadMore from "../../component/loadmore/LoadMore";
import Taro from '@tarojs/taro';
import { useSelector } from 'react-redux';
import time from '../../tool/time';
import { useState } from 'react';
import netRequest from '../../http/http';

export default function InteractionLoadMore() {
    const interactionList: any = useSelector((state: any) => state.Interaction_Reducer.interactionList)
    const pageIndex: number = useSelector((state: any) => state.Interaction_Reducer.pageIndex);
    const pageSize = 15;
    const [isRequestFinsh, setIsRequestFinsh] = useState(true)
    const [cache, setCache]: any = useState(Array.from(Taro.getStorageSync("agreeList")))

    const parView = (imgUrl) => {
        Taro.previewImage({
            current: imgUrl,
            urls: [imgUrl]
        })
    }
    const getTime = (t) => {
        var nowTime = time;
        var year1 = parseInt(nowTime.split(" ")[0].split("/")[0])
        var month1 = parseInt(nowTime.split(" ")[0].split("/")[1])
        var day1 = parseInt(nowTime.split(" ")[0].split("/")[2])
        var hour1 = parseInt(nowTime.split(" ")[1].split(":")[0])
        var minute1 = parseInt(nowTime.split(" ")[1].split(":")[1])

        var year2 = parseInt(t.split(" ")[0].split("/")[0])
        var month2 = parseInt(t.split(" ")[0].split("/")[1])
        var day2 = parseInt(t.split(" ")[0].split("/")[2])
        var hour2 = parseInt(t.split(" ")[1].split(":")[0])
        var minute2 = parseInt(t.split(" ")[1].split(":")[1])

        if (year1 - year2 != 0) { return "前" + (year1 - year2) + "年" }
        if (month1 - month2 != 0) { return "前" + (month1 - month2) + "月" }
        if (day1 - day2 != 0) { return "前" + (day1 - day2) + "天" }
        if (hour1 - hour2 != 0) { return "前" + (hour1 - hour2) + "小时" }
        if (minute1 - minute2 != 0) { return "前" + (minute1 - minute2) + "分钟" }
    }

    const agree = (item) => {
        if (isRequestFinsh) {
            setIsRequestFinsh(false)
            netRequest({
                _id: item.content,
                receiveId: item.otherId,
                time: time
            }, 'joinLegwork', 'POST', 0)
                .then(() => {
                    Taro.setStorageSync("agreeList", [...cache, item.content+"s"])
                    setCache(Array.from(Taro.getStorageSync("agreeList")))
                    setIsRequestFinsh(true)
                })
                .catch(() => {
                    setIsRequestFinsh(true)
                })
        }
    }

    const refuse = (item) => {
        if (isRequestFinsh) {
            setIsRequestFinsh(false)
            netRequest({
                legworkId: item.content,
                receiveId: item.otherId,
                userId: Taro.getStorageSync("userId"),
                time: time
            }, 'refuseLegwork', 'POST', 0)
                .then(() => {
                    Taro.setStorageSync("agreeList", [...cache, item.content+"s"])
                    setCache(Array.from(Taro.getStorageSync("agreeList")))
                    setIsRequestFinsh(true)
                })
                .catch(() => {
                    setIsRequestFinsh(true)
                })
        }
    }
    console.log(interactionList)
    return (
        <div className={style.interaction}>
            <LoadMore
                requesUrl={'getInteractionAll'}
                viewId={'Interaction'}
                ListCount={interactionList.length}
                defaultListCount={3}
                isLeaveClear
                requestData={{
                    pageIndex: pageIndex,
                    pageSize: pageSize
                }}>
                {
                    interactionList.map((item) => (
                        <div className={style.contain} key={item.time}>
                            <div className={style.left}>
                                <img className={style.leftImg} src={item.otherHead}></img>
                                {item.type == 'love' && <img className={style.leftMinImg} src={images.interactionLove}></img>}
                                {item.type == 'comment' && <img className={style.leftMinImg} src={images.interactionComment}></img>}
                                {item.type == 'replay' && <img className={style.leftMinImg} src={images.interactionReplay}></img>}
                            </div>
                            <div className={style.center}>
                                <div className={style.name}>{item.otherName}</div>
                                <div className={style.replay}>
                                    {item.type == "comment" && item.contentType == "text" && <div className={style.replayContent}>评论了你：{item.content}</div>}
                                    {item.type == "replay" && item.contentType == "text" && <div className={style.replayContent}>回复了你：{item.content}</div>}
                                    {item.type == 'love' || item.type == 'follow' ? <div className={style.replayContent}>{item.content}</div> : null}
                                    {item.type == 'legwork' && <div className={style.replayContent}>申请接取跑腿订单</div>}
                                    {item.type == 'legworkReplay' && <div className={style.replayContent}>{item.title}</div>}
                                    <div className={style.time}>{getTime(item.time)}</div>
                                </div>
                            </div>
                            <div className={style.right}>
                                {
                                    item.type != 'love' && item.type != 'follow' ?
                                        item.contentType == "image" && <img onClick={() => parView(item.content)} className={style.rightImg} src={item.content}></img>
                                        :
                                        null
                                }
                                {
                                    item.type == 'legwork' ?
                                        cache.indexOf(item.content+"s") == '-1' ?
                                            <div>
                                                <div className={style.qiang1} onClick={() => { agree(item) }}>同意</div>
                                                <div className={style.qiang2} onClick={() => { refuse(item) }}>拒绝</div>
                                            </div>
                                            :
                                            <div className={style.qiang2}>已处理</div>
                                        :null
                                }
                            </div>
                        </div>
                    ))
                }
            </LoadMore>

        </div>
    )
}

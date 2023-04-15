import style from './InteractionLoadMore.module..scss'
import images from '../../resources'
import LoadMore from "../../component/loadmore/LoadMore";
import Taro from '@tarojs/taro';
import reUrl from '../../config';
import { useSelector } from 'react-redux';
import time from '../../tool/time';

export default function InteractionLoadMore() {
    const interactionList: any = useSelector((state: any) => state.Interaction_Reducer.interactionList)
    const pageIndex: number = useSelector((state: any) => state.Interaction_Reducer.pageIndex);
    const pageSize = 15;
    const sendId: string = Taro.getStorageSync("socketId")

    const getTime = (t) => {
        var nowTime=time;
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

        if(year1-year2!=0){return "前"+(year1-year2)+"年"}
        if(month1-month2!=0){return "前"+(month1-month2)+"月"}
        if(day1-day2!=0){return "前"+(day1-day2)+"天"}
        if(hour1-hour2!=0){return "前"+(hour1-hour2)+"小时"}
        if(minute1-minute2!=0){return "前"+(minute1-minute2)+"分钟"}
    }

    return (
        <div className={style.interaction}>
            <LoadMore
                requesUrl={reUrl.getInteractionAll}
                viewId={'Interaction'}
                ListCount={interactionList.length}
                defaultListCount={3}
                height={(Taro.getWindowInfo().screenHeight) - 65 * 1.06 * (Taro.getWindowInfo().screenHeight) / 568 + 'px'}
                requestData={{
                    id: sendId,
                    pageIndex: pageIndex,
                    pageSize: pageSize
                }}>
                {
                    interactionList.map((item) => (
                        <div className={style.contain} key={item.time}>
                            <div className={style.left}>
                                <img className={style.leftImg} src={item.otherHead}></img>
                                {
                                    item.type == 'love' ?
                                        <img className={style.leftMinImg} src={images.love_3}></img> :
                                        <img className={style.leftMinImg} src={images.comment2}></img>
                                }
                            </div>
                            <div className={style.center}>
                                <div className={style.name}>{item.otherName}</div>
                                <div className={style.replay}>
                                    <div className={style.replayContent}>{item.content}</div>
                                    <div className={style.time}>{getTime(item.time)}</div>
                                </div>
                            </div>
                            <div className={style.right}>
                                <img className={style.rightImg} src={images.testH1}></img>
                            </div>
                        </div>
                    ))
                }
            </LoadMore>

        </div>
    )
}

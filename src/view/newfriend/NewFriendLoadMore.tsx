import style from './NewFriendLoadMore.module.scss'
import { useSelector } from 'react-redux';
import reUrl from '../../config';
import Taro from '@tarojs/taro';
import LoadMore from "../../component/loadmore/LoadMore";
import time from '../../tool/time';

export default function NewFriendLoadMore() {

    const newFriendList: any = useSelector((state: any) => state.NewFriend_Reducer.newFriendList)
    const pageIndex: number = useSelector((state: any) => state.NewFriend_Reducer.pageIndex);
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
        <div className={style.newFriend}>

            <LoadMore
                requesUrl={reUrl.getInteraction}
                viewId={'NewFriend'}
                ListCount={newFriendList.length}
                defaultListCount={1}
                height={(Taro.getWindowInfo().screenHeight) - 65 * 1.06 * (Taro.getWindowInfo().screenHeight) / 568 + 'px'}
                requestData={{
                    id: sendId,
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    type: 'follow'
                }}>

                {
                    newFriendList.map((item) => (
                        <div className={style.contain}>
                            <div className={style.left}>
                                <img className={style.leftImg} src={item.otherHead}></img>
                            </div>
                            <div className={style.center}>
                                <div className={style.name}>{item.otherName}</div>
                                <div className={style.content}><div className={style.time}>{getTime(item.time)}&ensp;</div> {item.content}</div>
                            </div>
                            <div className={style.right}>
                                <div className={style.rightButton}>回关</div>
                            </div>
                        </div>
                    ))
                }

            </LoadMore>
        </div>
    )
}

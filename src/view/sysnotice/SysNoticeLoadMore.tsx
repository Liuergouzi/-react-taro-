import style from './SysNotice.module.scss'
import { Ellipsis } from '@antmjs/vantui'
import LoadMore from "../../component/loadmore/LoadMore";
import { useSelector } from 'react-redux';
import Taro from '@tarojs/taro';
import time from '../../tool/time';

export default function SysNoticeLoadMore() {

    const SysNoticeList: any = useSelector((state: any) => state.SysNotice_Reducer.sysNoticeList)
    const pageIndex: number = useSelector((state: any) => state.SysNotice_Reducer.pageIndex);
    const pageSize = 15;

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

        if(year1-year2!=0){return "前"+(year1-year2)+"年"}
        if(month1-month2!=0){return "前"+(month1-month2)+"月"}
        if(day1-day2!=0){return "前"+(day1-day2)+"天"}
        if(hour1-hour2!=0){return "前"+(hour1-hour2)+"小时"}
        if(minute1-minute2!=0){return "前"+(minute1-minute2)+"分钟"}
    }
    console.log(Taro.getWindowInfo().screenHeight)

    return (

        <div className={style.bg}>
            <div className={style.contain} style={{ height: "100%"}}>

                <LoadMore
                    requesUrl={'getSysNotice'}
                    viewId={'SysNotice'}
                    ListCount={SysNoticeList.length}
                    defaultListCount={1}
                    height={(Taro.getWindowInfo().screenHeight) - 65 * 1.06 * (Taro.getWindowInfo().screenHeight) / 568 + 'px'}
                    requestData={{
                        pageIndex: pageIndex,
                        pageSize: pageSize
                    }}>
                    {
                        SysNoticeList.map((item) => (
                            <div className={style.sysItem} key={item._id}>
                                <div className={style.title}>{item.title}</div>
                                <div className={style.time}>{getTime(item.time)}</div>
                                <Ellipsis expandText={"全部"} collapseText={"收起"} rows={4} className={style.content}>
                                    {item.content}
                                </Ellipsis >
                            </div>
                        ))
                    }
                </LoadMore>

            </div>
        </div>

    )
}

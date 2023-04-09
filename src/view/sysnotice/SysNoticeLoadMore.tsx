import style from './SysNotice.module.scss'
import TopBar from "../../component/topbar/TopBar"
import { Ellipsis } from '@antmjs/vantui'
import LoadMore from "../../component/loadmore/LoadMore";
import reUrl from "../../config"
import { useSelector } from 'react-redux';
import Taro from '@tarojs/taro';

export default function SysNoticeLoadMore() {

    const SysNoticeList: any = useSelector((state: any) => state.SysNotice_Reducer.sysNoticeList)
    const pageIndex: number = useSelector((state: any) => state.SysNotice_Reducer.pageIndex);
    const pageSize = 15;
    return (

        <div className={style.bg}>
            <TopBar leftShow={true}>系统通知</TopBar>
            <div className={style.contain} style={{height:(Taro.getWindowInfo().screenHeight )-95*1.06*(Taro.getWindowInfo().screenHeight )/568  + 'px'}}>

                <LoadMore
                    requesUrl={reUrl.getSysNotice}
                    viewId={'SysNotice'}
                    ListCount={SysNoticeList.length}
                    defaultListCount={1}
                    height={(Taro.getWindowInfo().screenHeight )-96*1.06*(Taro.getWindowInfo().screenHeight )/568  + 'px'}
                    requestData={{
                        id: "1",
                        pageIndex: pageIndex,
                        pageSize: pageSize
                    }}
                >
                    {
                        SysNoticeList.map((item) => (
                            <div className={style.sysItem} key={item._id}>
                                <div className={style.title}>{item.title}</div>
                                <div className={style.time}>{item.time}</div>
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

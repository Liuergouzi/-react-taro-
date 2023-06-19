import style from './LegworkLoadMore.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadMore from "../loadmore/LoadMore";
import Taro from '@tarojs/taro';
import images from '../../resources'
import { useState } from 'react';
import { Dialog, Steps } from '@antmjs/vantui';
import time from '../../tool/time';
import netRequest from '../../http/http';
import { setLegworkListAll } from '../../sclice/Legwork_Sclice';

interface LegworkLoadMore {
    requesUrl?: string
    requestData?: any
    isUpdate?: boolean
    isReceive?: boolean
}

export default function LegworkLoadMore(props: LegworkLoadMore) {
    const dispatch: any = useDispatch()
    const navigate = useNavigate();
    const legworkList: any = useSelector((state: any) => state.Legwork_Reducer.legworkList)
    const pageIndex: number = useSelector((state: any) => state.Legwork_Reducer.pageIndex);
    let requestData = props.requestData
    requestData.pageIndex = pageIndex
    const [isRequestFinsh, setIsRequestFinsh] = useState(true)
    const [, setReportShow] = useState(false)
    const [cache, setCache]: any = useState(Array.from(Taro.getStorageSync("legworkList")))
    const [deleteData, setdeleteData] = useState({ item: {}, index: -1, isShow: false })

    const deleteLegeork = (item, index) => {
        if (isRequestFinsh) {
            setIsRequestFinsh(false)
            netRequest({
                _id: item.id
            }, 'deleteLegwork', 'POST', 0)
                .then(() => {
                    let temp = JSON.parse(JSON.stringify(legworkList))
                    temp.splice(index, 1)
                    dispatch(setLegworkListAll(temp))
                    setIsRequestFinsh(true)
                })
                .catch(() => {
                    setIsRequestFinsh(true)
                })
        }
    }

    const goChat = (item) => {
        Taro.setStorageSync('setChatItemClick', { id: item.userId, head: item.head, name: item.name })
        navigate("/chat");
    }

    const apply = (item) => {
        if (isRequestFinsh) {
            setIsRequestFinsh(false)
            netRequest({
                legworkId: item.id,
                receiveId: item.userId,
                time: time
            }, 'applyLegwork', 'POST', 0)
                .then(() => {
                    Taro.setStorageSync("legworkList", [...cache, item.id])
                    setCache(Array.from(Taro.getStorageSync('legworkList')))
                    setIsRequestFinsh(true)
                })
                .catch(() => {
                    setIsRequestFinsh(true)
                })
        }
    }

    return (
        <div>

            <LoadMore
                requesUrl={props.requesUrl}
                viewId={'Legwork'}
                ListCount={legworkList.length}
                defaultListCount={0}
                isLeaveClear={true}
                marginBottom={"70px"}
                requestData={requestData}>
                <Dialog
                    id="vadel"
                    title="删除"
                    showCancelButton
                    confirmButtonOpenType="getUserInfo"
                    show={deleteData.isShow}
                    onConfirm={() => { deleteLegeork(deleteData.item, deleteData.index) }}
                    onClose={() => setdeleteData({ item: {}, index: -1, isShow: false })}
                >
                    <div className={style.deleteTip}>删除不可逆，您确定要删除吗？</div>
                </Dialog>
                {
                    legworkList.map((item, index) =>
                        <div key={item.id} className={style.Article + " Article"}>
                            <div className={style.Article_top}>
                                <div className={style.Article_top_left}>
                                    <div className={style.Article_top_head} onClick={() => { Taro.setStorageSync("articleDetailData", item); navigate("/personalDetails"); }}>
                                        <img className={style.Article_top_headImg} src={item.head == "" ? images.boyHead : item.head} alt='' />
                                        <div className={style.Article_top_name}>{item.name == "" ? "匿名用户" : item.name}</div>
                                        {item.state == '0' && <div className={style.state1}>待抢单</div>}
                                        {item.state == '1' && <div className={style.state2}>已接单</div>}
                                        {item.state == '2' && <div className={style.state3}>已超时</div>}
                                    </div>
                                    <div className={style.Article_top_headleft}>
                                        <Steps
                                            style={{ zIndex: 0 }}
                                            steps={[
                                                {
                                                    text: '',
                                                    desc: item.start,
                                                    inactiveIcon: 'location-o',
                                                    activeIcon: 'success',
                                                },
                                                {
                                                    text: '',
                                                    desc: item.end,
                                                    inactiveIcon: 'location-o',
                                                    activeIcon: 'success',
                                                }
                                            ]}
                                            active={2}
                                            direction="vertical"
                                            activeColor="#8BD1AE"
                                        />
                                    </div>
                                </div>
                                <div className={style.Article_top_right}>
                                    {
                                        props.isUpdate ?
                                            <div className={style.updateDiv}>
                                                <div className={style.delete} onClick={() => setdeleteData({ item: item, index: index, isShow: true })}>删除</div>
                                            </div>
                                            :
                                            <img className={style.Article_top_rightImg} src={images.more} alt='' onClick={() => setReportShow(true)} />
                                    }

                                </div>
                            </div>
                            <div className={style.liuchen}>
                                <div className={style.liuchenLeft}>
                                    <div>截止时间：{item.time == '' ? '无限制' : item.time}</div>
                                    <div style={{ display: 'flex', paddingTop: '5px' }}>金额：{item.time == '' ? <span style={{ color: 'gray' }}>无偿</span> : <span style={{ color: 'red' }}>{item.money}元</span>}</div>
                                    {
                                        props.isReceive ?
                                            <>
                                                <div>物品/快递号：{item.goods}</div>
                                                <div>联系方式：{item.contact}</div>
                                                <div>备注：{item.notes}</div>
                                            </>
                                            :
                                            null
                                    }
                                </div>
                                <div className={style.liuchenRight}>
                                    {
                                        !props.isReceive ?
                                            item.state == '0' ?
                                                cache.indexOf(item.id) == '-1' ?
                                                    <div className={style.qiang1} onClick={() => apply(item)}>抢！</div> :
                                                    <div className={style.qiang2}>已申请</div>
                                                :
                                                <div className={style.qiang2}>抢！</div>
                                            :
                                            <div className={style.qiang1} onClick={() => goChat(item)}>私信</div>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </LoadMore>

        </div>
    )
}


LegworkLoadMore.defaultProps = {
    requesUrl: 'getLegworkListAll',
    requestData: { pageSize: 15, pageIndex: 0 },
    isUpdate: false,
    isReceive: false
}

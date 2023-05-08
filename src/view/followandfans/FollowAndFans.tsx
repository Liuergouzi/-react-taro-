import style from './FollowAndFans.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import Taro from '@tarojs/taro';
import LoadMore from "../../component/loadmore/LoadMore";
import { useEffect, useState } from 'react';
import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar';
import { useNavigate } from 'react-router-dom';
import netRequest from '../../http/http';
import { setFollowAndFansListAll } from '../../sclice/FollowAndFans_Sclice';

export default function FollowAndFans() {

    const followAndFansList: any = useSelector((state: any) => state.FollowAndFans_Reducer.followAndFansList)
    const pageIndex: number = useSelector((state: any) => state.FollowAndFans_Reducer.pageIndex);
    const pageSize = 999999;
    const userId: string = Taro.getStorageSync("userId")
    const isFollow = Taro.getStorageSync("isFollow") == "" ? false : true
    const navigate = useNavigate();
    const dispatch: any = useDispatch()
    const [isRequestFinsh, setIsRequestFinsh] = useState(true)

    const handClick = (item) => {
        if (isRequestFinsh) {
            setIsRequestFinsh(false)
            netRequest({ userId: userId, followedUserId: item.userId, status: 1 }, 'follow', 'POST', 0)
                .then(() => {
                    var newTemp = followAndFansList.filter((e) => { e == item })
                    dispatch(setFollowAndFansListAll(newTemp))
                    setIsRequestFinsh(true)
                })
                .catch(() => {
                    setIsRequestFinsh(true)
                })
        }
    }

    const handClick1 = (item) => {
        Taro.setStorageSync("articleDetailData", { userId: item.userId })
        navigate("/personalDetails");
    }

    useEffect(() => {
        return () => {
            if (isFollow) {
                Taro.removeStorageSync("isFollow")
            }
        }
    }, [])

    return (
        <div >
            <TopMostTaroNavigationBar needBackIcon={true} mainTitle={isFollow ? '我的关注' : "我的粉丝"} />
            <LoadMore
                requesUrl={isFollow ? 'getFollow' : 'getFans'}
                viewId={'FollowAndFans'}
                ListCount={followAndFansList.length}
                defaultListCount={0}
                isLeaveClear
                requestData={{
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    userId: userId
                }}>
                {
                    followAndFansList.map((item) => (
                        <div className={style.contain}>
                            <div className={style.left}>
                                <img className={style.leftImg} src={item.avatar == null ? "" : item.avatar}></img>
                            </div>
                            <div className={style.center}>
                                <div className={style.name}>{item.nickname == null ? "未命名用户" : item.nickname}</div>
                                <div className={style.content}>
                                    <div className={style.time}>{item.sex == null ? "未知性别" : item.sex}&ensp;</div>
                                </div>
                            </div>
                            <div className={style.right}>
                                {isFollow ?
                                    <div className={style.rightButtonCancel}
                                        onClick={() => { handClick(item) }}>
                                        取关
                                    </div> : null}
                            </div>
                            <div className={style.right}>
                                <div className={style.rightButton}
                                    onClick={() => { handClick1(item) }}>
                                    查看
                                </div>
                            </div>
                        </div>
                    ))
                }
            </LoadMore>
        </div>
    )
}

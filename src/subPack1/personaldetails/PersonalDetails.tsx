import style from './PersonalDetails.module.scss'
import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar'
import { Tag } from '@antmjs/vantui'
import Taro from '@tarojs/taro'
import TabsArticleLoadMore from '../../component/ariticle/TabsArticleLoadMore'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import netRequest from '../../http/http'
import reUrl from "../../requestUrl"

export default function PersonalDetails() {

    const navigate = useNavigate();
    var userId = Taro.getStorageSync("articleDetailData").userId;
    const [userDetail, setUserDetail] = useState({
        avatar: null, nickname: "未命名用户", fansCount: "xx",
        likeCount: "xx", grade: "xxxx", description: "xxxx", sex: "x", address: "xx-xx-xx"
    })
    const [isPrivacy, setIsPrivacy] = useState(true)
    const parView = (imgUrl) => {
        Taro.previewImage({
            current: imgUrl, // 当前显示图片的http链接
            urls: [imgUrl] // 需要预览的图片http链接列表
        })
    }

    useEffect(() => {
        netRequest({}, reUrl('user') + userId, 'GET', 0)
            .then((res) => {
                if (res.data.data.isInfo != null) {
                    setIsPrivacy(false)
                    let userTemp = JSON.parse(JSON.stringify(userDetail))
                    userTemp.avatar = res.data.data.avatar
                    userTemp.nickname = res.data.data.nickname
                    userTemp.fansCount = res.data.data.fansCount
                    userTemp.likeCount = res.data.data.likeCount
                    userTemp.grade = res.data.data.grade
                    userTemp.description = res.data.data.description
                    userTemp.sex = res.data.data.sex
                    userTemp.address = res.data.data.address

                    netRequest({ userId: userId }, 'getArticleTotal', 'POST', 0)
                    .then((ress) => {
                        userTemp.likeCount = ress.data.data[0].loveCount
                        setUserDetail(userTemp)
                    })
                    .catch(() => {
                    })

                } else {
                    let userTemp = JSON.parse(JSON.stringify(userDetail))
                    userTemp.nickname = "隐私用户无法查看"
                    setUserDetail(userTemp)
                }
            })
            .catch(() => {
            })
    }, [])

    const goChat = () => {
        Taro.setStorageSync('setChatItemClick', { id: userId, head: userDetail.avatar, name: userDetail.nickname })
        navigate("/chat");
    }

    return (
        <div>
            <TopMostTaroNavigationBar needBackIcon={true} mainTitle={'个人详情'} />
            <div className={style.top}>
                <div className={style.topHead}>
                    <img className={style.topHeadImg} src={userDetail.avatar == null ? '' : userDetail.avatar} onClick={() => parView(userDetail.avatar)}></img>
                    <div className={style.topChat} onClick={() => { goChat() }}>私聊</div>
                </div>

                <div className={style.topHeadBottom}>
                    <div className={style.topName}>{userDetail.nickname}</div>
                    <div className={style.topList}>
                        <div className={style.topItem}>
                            <div>粉丝&emsp;</div>
                            <div>{userDetail.fansCount}</div>
                        </div>
                        <div className={style.topItem}>
                            <div>获赞&emsp;</div>
                            <div>{userDetail.likeCount}</div>
                        </div>
                    </div>

                </div>
                <div className={style.topTag}>
                    <Tag className={style.tag}>
                        {userDetail.grade}级
                    </Tag>
                    <Tag className={style.tag1}>
                        被举报有效次数： 0
                    </Tag>
                    <Tag className={style.tag2}>
                        简介：{userDetail.description}
                    </Tag>
                    <Tag className={style.tag2}>
                        性别:{userDetail.sex}
                    </Tag>
                    <Tag className={style.tag3}>
                        地区：{userDetail.address}
                    </Tag>
                </div>
            </div>
            <TabsArticleLoadMore isprivate={isPrivacy} userId={userId} />
        </div>
    )
}

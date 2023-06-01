import style from './ArticleDetail.module.scss'
import images from '../../resources'
import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar'
import Taro from '@tarojs/taro'
import CommentLoadMore from '../../component/ariticle/CommentLoadMore'
import { Provider } from 'react-redux'
import store from '../../sclice/Store'
import { useEffect, useState } from 'react'
import { ShareSheet } from '@antmjs/vantui'
import netRequest from '../../http/http'
import itemList from '../../itemList'
import time from '../../tool/time'

export default function ArticleDetail() {

    var isHasId = false;
    if (Taro.getStorageSync("articleDetailDataId") != "") {
        isHasId = true
    }

    const [articleDetailData, setArticleDetailData]: any = useState(!isHasId ? Taro.getStorageSync("articleDetailData") : itemList.articleDeatilInit)
    const [shareShow, setShareShow] = useState(false)
    const [isFollow, setIsFollow] = useState(false)
    const [isRequestFinsh, setIsRequestFinsh] = useState(true)

    useEffect(() => {
        if (isHasId) {
            netRequest({
                _id: Taro.getStorageSync("articleDetailDataId")
            }, 'getArticleDisplayListByMainId', 'POST', 0)
                .then((res) => {
                    if (res.data.data.length != 0) {
                        setArticleDetailData(res.data.data[0])
                    }
                })
                .catch(() => {

                })
        }
        return () => {
            Taro.removeStorageSync("articleDetailData")
            Taro.removeStorageSync("articleDetailDataId")
        }
    }, [])

    const parView = (imgUrl) => {
        Taro.previewImage({
            current: imgUrl,
            urls: [imgUrl] // 需要预览的图片http链接列表
        })
    }

    const loveClick = (item) => {
        if (isRequestFinsh) {
            setIsRequestFinsh(false)
            var thisArticle = JSON.parse(JSON.stringify(articleDetailData))
            console.log(thisArticle)
            if (Taro.getStorageSync(thisArticle.id) != ("")) {
                thisArticle.loveCount = thisArticle.loveCount - 1
                Taro.removeStorageSync(thisArticle.id)
                netRequest({
                    movementId: item.id,
                    userId: Taro.getStorageSync("userId")
                }, 'cancelLoveArticleDisplayList', 'POST', 0)
                    .then(() => {
                        setIsRequestFinsh(true)
                    })
                    .catch(() => {
                        setIsRequestFinsh(true)
                    })
            } else {
                thisArticle.loveCount = thisArticle.loveCount + 1
                Taro.setStorageSync(thisArticle.id, 1)
                netRequest({
                    movementId: item.id,
                    receiveId: item.userId,
                    otherId: Taro.getStorageSync("userId"),
                    title: item.name + "赞了你",
                    time: time,
                    content: item.name + "赞了你",
                }, 'loveArticleDisplayList', 'POST', 0)
                    .then(() => {
                        setIsRequestFinsh(true)
                    })
                    .catch(() => {
                        setIsRequestFinsh(true)
                    })
            }
            setArticleDetailData(thisArticle)
        }
    }

    const options = [
        {
            name: '微信',
            icon: 'wechat',
            openType: 'share',
        },
        {
            name: '微博',
            icon: 'weibo',
        },
        {
            name: '复制链接',
            icon: 'link',
        },
        {
            name: '分享海报',
            icon: 'poster',
        }
    ]

    const handFollow = () => {
        if (isRequestFinsh) {
            setIsRequestFinsh(false)
            if (!isFollow) {
                netRequest({ userId: Taro.getStorageSync("userId"), followedUserId: articleDetailData.userId, status: 0 }, 'follow', 'POST', 0)
                    .then(() => {
                        setIsFollow(true)
                        setIsRequestFinsh(true)
                    })
                    .catch(() => {
                        setIsRequestFinsh(true)
                    })
            } else {
                netRequest({ userId: Taro.getStorageSync("userId"), followedUserId: articleDetailData.userId, status: -1 }, 'follow', 'POST', 0)
                    .then(() => {
                        setIsFollow(false)
                        setIsRequestFinsh(true)
                    })
                    .catch(() => {
                        setIsRequestFinsh(true)
                    })
            }
        }
    }

    return (
        <Provider store={store}>
            <ShareSheet
                show={shareShow}
                title="立即分享给好友"
                options={options}
                onSelect={(e) => console.log(e.detail.name)}
                onClose={() => setShareShow(false)}
            />
            <div className={style.main}>
                <TopMostTaroNavigationBar needBackIcon={true} mainTitle={'详情'} />

                <div className={style.info}>
                    <div className={style.infoLeft}>
                        <img src={articleDetailData.head == "" ? images.boyHead : articleDetailData.head} className={style.infoImage} alt="" onClick={() => parView(articleDetailData.head)} />
                        <div className={style.infoText}>
                            <div className={style.infoLeftName}>{articleDetailData.name == "" ? "匿名用户" : articleDetailData.name}</div>
                            <div className={style.infoLeftTime}>{articleDetailData.time}</div>
                        </div>
                    </div>
                    <div className={style.infoRight} onClick={() => { handFollow() }}>{isFollow ? "已关注" : "关注"}</div>
                </div>
                <div className={style.message}>
                    <div className={style.title}>{articleDetailData.title}</div>
                    <div className={style.context}>{articleDetailData.content}</div>
                    <div className={style.imageThreeDiv}>
                        {
                            articleDetailData.imageList.map((img) => (
                                <div className={style.mask2}>
                                    <img className={style.maskImg} src={img} onClick={() => parView(img)}></img>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={style.items}>
                    <div className={style.itemsDiv} onClick={() => { loveClick(articleDetailData) }}>
                        <img className={style.itemImg} src={Taro.getStorageSync(articleDetailData.id) != ("") ? images.love_1 : images.love_2} alt='' />
                        <div className={style.itemText}>{articleDetailData.loveCount}</div>
                    </div>
                    <div className={style.itemsDiv}>
                        <img className={style.itemImg} src={images.comment} alt='' />
                        <div className={style.itemText}>{articleDetailData.commentCount}</div>
                    </div>
                    <div className={style.itemsDiv} onClick={() => setShareShow(true)}>
                        <img className={style.itemImg} src={images.share} alt='' />
                        <div className={style.itemText}>{articleDetailData.shareCount}</div>
                    </div>
                </div>
                <div className={style.foot}>评论(0)</div>

                <div>
                    {
                        <CommentLoadMore id={isHasId ? Taro.getStorageSync("articleDetailDataId") : articleDetailData.id} userId={articleDetailData.userId} />
                    }
                    <div className="safe-area-inset-bottom"></div>
                </div>

            </div>
        </Provider>
    )
}



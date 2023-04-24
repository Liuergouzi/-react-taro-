import style from './ArticleDetail.module.scss'
import images from '../../resources'
import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar'
import itemList from '../../itemList'
import Taro from '@tarojs/taro'
import CommentLoadMore from '../../component/ariticle/CommentLoadMore'
import { Provider, useDispatch } from 'react-redux'
import store from '../../sclice/Store'
import { useEffect, useState } from 'react'
import { ShareSheet } from '@antmjs/vantui'
import { addLove, addComment, addShare, reduceLove, reduceComment, reduceShare } from '../../sclice/Article_Sclice'
import netRequest from '../../http/http'

export default function ArticleDetail() {
    const dispatch: any = useDispatch()

    const [articleDetailData, setArticleDetailData] = useState(itemList.articleDislayList[0])
    const [shareShow, setShareShow] = useState(false)
    const [isRequestFinsh, setIsRequestFinsh] = useState(true)

    useEffect(() => {
        const data = Taro.getStorageSync("articleDetailData")
        if (data != "") {
            setArticleDetailData(data)
        }
    }, [])

    const parView = (imgUrl) => {
        Taro.previewImage({
            current: imgUrl, // 当前显示图片的http链接
            urls: [imgUrl] // 需要预览的图片http链接列表
        })
    }

    const loveClick = (item) => {
        if (isRequestFinsh) {
            setIsRequestFinsh(false)
            let articleListTemp = JSON.parse(JSON.stringify(articleDetailData))
            if (Taro.getStorageSync(articleListTemp._id) != ("")) {
                articleListTemp.loveCount = articleListTemp.loveCount - 1
                dispatch(reduceLove(articleListTemp))
                Taro.removeStorageSync(articleListTemp._id)

                netRequest({
                    _id: item._id,
                    userId: item.userId
                }, 'loveArticleDislay', 'POST', 0)
                    .then(() => {
                        setIsRequestFinsh(true)
                    })
                    .catch(() => {
                        setIsRequestFinsh(true)
                    })
            } else {
                articleListTemp.loveCount = articleListTemp.loveCount + 1
                Taro.setStorageSync(articleListTemp._id, 1)
                dispatch(addLove(articleListTemp))

                netRequest({
                    _id: item._id,
                    userId: item.userId
                }, 'loveArticleDislay', 'POST', 0)
                    .then(() => {
                        setIsRequestFinsh(true)
                    })
                    .catch(() => {
                        setIsRequestFinsh(true)
                    })
            }
            setArticleDetailData(articleListTemp)
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
                        <img src={articleDetailData.userHeadImg} className={style.infoImage} alt="" onClick={() => parView(images.testH1)} />
                        <div className={style.infoText}>
                            <div className={style.infoLeftName}>{articleDetailData.userName}</div>
                            <div className={style.infoLeftTime}>{articleDetailData.time}</div>
                        </div>
                    </div>
                    <div className={style.infoRight}>关注</div>
                </div>
                <div className={style.message}>
                    <div className={style.context}>{articleDetailData.content}</div>
                </div>
                <div className={style.items}>
                    <div className={style.itemsDiv} onClick={() => { loveClick(articleDetailData) }}>
                        <img className={style.itemImg} src={Taro.getStorageSync(articleDetailData._id) != ("") ? images.love_1 : images.love_2} alt='' />
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
                    <CommentLoadMore id={"1"} />
                    <div className="safe-area-inset-bottom"></div>
                </div>

            </div>
        </Provider>
    )
}



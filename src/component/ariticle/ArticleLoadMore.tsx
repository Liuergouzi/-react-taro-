import images from '../../resources'
import style from './ArticleLoadMore.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadMore from "../loadmore/LoadMore";
import Taro from '@tarojs/taro';
import { useState } from 'react';
import { ActionSheet, Dialog, Ellipsis, Field, ShareSheet } from '@antmjs/vantui';
import { setArticleListAll } from '../../sclice/Article_Sclice'
import time from '../../tool/time';
import netRequest from '../../http/http';
import { Toast } from '@antmjs/vantui'
/**
 * 轮子哥
 * 帖子加载
 */
interface ArticleLoadMore {
  requesUrl?: string
  requestData?: any
  type?: string
  isUpdate?: boolean
}


export default function ArticleLoadMore(props: ArticleLoadMore) {
  const dispatch: any = useDispatch()
  const navigate = useNavigate();
  const articleList: any = useSelector((state: any) => state.Article_Reducer.articleList)
  const pageIndex: number = useSelector((state: any) => state.Article_Reducer.pageIndex);
  let requestData = props.requestData
  requestData.pageIndex = pageIndex
  const [shareShow, setShareShow] = useState(false)
  const [isRequestFinsh, setIsRequestFinsh] = useState(true)
  const [reportShow, setReportShow] = useState(false)
  const [confirmDelete, setConfirmDelete]: any = useState({ data: {}, index: -1, delete: false })
  const Toast_ = Toast.createOnlyToast()

  const loveClick = (item, index) => {
    if (isRequestFinsh) {
      setIsRequestFinsh(false)
      var thisArticle = JSON.parse(JSON.stringify(articleList))
      if (Taro.getStorageSync(thisArticle[index].id) != ("")) {
        thisArticle[index].loveCount = thisArticle[index].loveCount - 1
        Taro.removeStorageSync(thisArticle[index].id)
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
        thisArticle[index].loveCount = thisArticle[index].loveCount + 1
        Taro.setStorageSync(thisArticle[index].id, 1)

        netRequest({
          movementId: item.id,
          receiveId: item.userId,
          otherId: Taro.getStorageSync("userId"),
          title: Taro.getStorageSync("user").nickname + "赞了你",
          time: time,
          content: Taro.getStorageSync("user").nickname + "赞了你",
        }, 'loveArticleDisplayList', 'POST', 0)
          .then(() => {
            setIsRequestFinsh(true)
          })
          .catch(() => {
            setIsRequestFinsh(true)
          })
      }
      dispatch(setArticleListAll(thisArticle))
    }
  }

  const deleteArticle = () => {
    console.log(confirmDelete)
    if (isRequestFinsh) {
      setIsRequestFinsh(false)
      netRequest({
        _id: confirmDelete.data.id
      }, 'deleteArticleDisplayList', 'POST', 0)
        .then(() => {
          let thisArticle = JSON.parse(JSON.stringify(articleList))
          thisArticle.splice(confirmDelete.index, 1)
          dispatch(setArticleListAll(thisArticle))
          setIsRequestFinsh(true)
        })
        .catch(() => {
          setIsRequestFinsh(true)
        })
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

  const goToArticleDetail = (item) => {
    Taro.setStorageSync("articleDetailData", item)
    navigate("/articleDetail");
  }

  const parView = (imgUrl) => {
    Taro.previewImage({
      current: imgUrl,
      urls: [imgUrl]
    })
  }

  return (
    <div>
      <ShareSheet
        show={shareShow}
        title="立即分享给好友"
        options={options}
        onSelect={(e) => console.log(e.detail.name)}
        onClose={() => setShareShow(false)}
      />
      <Toast_ />
      <ActionSheet show={reportShow} title="举报帖子" onClose={() => setReportShow(false)}>
        <div className={style.reportTip}>(***多次恶意提交无效举报将会受到处罚***)</div>
        <div style={{ marginBottom: '20px' }}>
          <Field
            label="举报理由"
            placeholder="请输入举报理由(选填)"
            border={true} />
          <div className={style.reportButton} onClick={() => { Toast_.show("提交成功"); setReportShow(false); }}>提交</div>
        </div>
      </ActionSheet>
      <LoadMore
        requesUrl={props.requesUrl}
        viewId={'Article'}
        ListCount={articleList.length}
        defaultListCount={0}
        isLeaveClear={true}
        // height={ '2000px'}
        marginBottom={"70px"}
        requestData={requestData}>
        <Dialog
          id="vadel"
          title="删除"
          showCancelButton
          confirmButtonOpenType="getUserInfo"
          show={confirmDelete.delete}
          onConfirm={() => { deleteArticle() }}
          onClose={() => setConfirmDelete({ data: {}, index: -1, delete: false })}
        >
          <div className={style.deleteTip}>删除不可逆，您确定要删除吗？</div>
        </Dialog>
        {
          articleList.map((item, index) => (
            <div className={style.Article + " Article"} key={item.id}>
              <div className={style.Article_top}>
                <div className={style.Article_top_left} onClick={() => { Taro.setStorageSync("articleDetailData", item); navigate("/personalDetails"); }}>
                  <div className={style.Article_top_head} >
                    <img className={style.Article_top_headImg} src={item.head == "" ? images.boyHead : item.head} alt='' />
                  </div>
                  <div className={style.Article_top_headleft}>
                    <div className={style.Article_top_name}>{item.name == "" ? "匿名用户" : item.name}</div>
                    <div className={style.Article_top_time}>{getTime(item.time)}</div>
                  </div>
                </div>
                <div className={style.Article_top_right}>
                  {
                    props.isUpdate ?
                      <div className={style.updateDiv}>
                        <div className={style.update} onClick={() => { Taro.setStorageSync("updateArticle", item); navigate(`/push?update`) }}>修改</div>
                        <div className={style.delete} onClick={() => { setConfirmDelete({ data: item, index: index, delete: !confirmDelete.delete }) }}>删除</div>
                      </div>
                      :
                      <img className={style.Article_top_rightImg} src={images.more} alt='' onClick={() => setReportShow(true)} />
                  }

                </div>
              </div>
              
              <div className={style.Article_context} onClick={() => { goToArticleDetail(item) }}>
                <div className={style.Article_context_title}>
                  {item.title}
                </div>
                <div className={style.Article_context_contain}>
                  {
                    parseInt(item.content.length) < 300 ?
                      item.content :
                      <Ellipsis rows={4} hiddenAction className={style.Article_context_contain}>{item.content}</Ellipsis>
                  }
                </div>
              </div>
              <div className={style.imageThreeDiv}>
                {
                  item.imageList.map((img, imgIndex) => (
                    item.imageList.length > 3 && imgIndex == 2 ?
                      <div className={style.mask} key={img}>
                        <div className={style.bgMask}>+{item.imageList.length - 3}</div>
                        <img className={style.maskImg} src={img} onClick={() => parView(img)}></img>
                      </div>
                      :
                      imgIndex < 3 ?
                        <div className={style.mask2}>
                          <img className={style.maskImg} src={img} onClick={() => parView(img)}></img>
                        </div>
                        :
                        ""
                  ))
                }
              </div>
              <div className={style.Article_bottom}>
                <div className={style.Article_bottomDiv} onClick={() => { loveClick(item, index) }}>
                  <img className={style.Article_bottomImg} src={Taro.getStorageSync(item.id) != ("") ? images.love_1 : images.love_2} alt='' />
                  <div className={style.Article_bottom_text}>{item.loveCount}</div>
                </div>
                <div className={style.Article_bottomDiv} onClick={() => { goToArticleDetail(item) }}>
                  <img className={style.Article_bottomImg} src={images.comment} alt='' />
                  <div className={style.Article_bottom_text}>{item.commentCount}</div>
                </div>
                <div className={style.Article_bottomDiv} onClick={() => setShareShow(true)}>
                  <img className={style.Article_bottomImg} src={images.share} alt='' />
                  <div className={style.Article_bottom_text}>{item.shareCount}</div>
                </div>
              </div>
            </div>
          )
          )
        }
      </LoadMore></div>
  )
}

ArticleLoadMore.defaultProps = {
  requesUrl: 'getArticleDisplayListAll',
  requestData: { pageSize: 8, pageIndex: 0, type: "日常分享" },
  isUpdate: false
}



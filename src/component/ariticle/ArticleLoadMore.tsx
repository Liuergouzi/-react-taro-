import images from '../../resources'
import style from './ArticleLoadMore.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadMore from "../loadmore/LoadMore";
import Taro from '@tarojs/taro';
import { useState } from 'react';
import { ActionSheet, Ellipsis, Field, ShareSheet } from '@antmjs/vantui';
import { setArticleListAll } from '../../sclice/Article_Sclice'
import time from '../../tool/time';
import netRequest from '../../http/http';
/**
 * 轮子哥
 * 帖子加载
 */
interface ArticleLoadMore{
  requesUrl?:string
  requestData?:any
}


export default function ArticleLoadMore(props:ArticleLoadMore) {
  const dispatch: any = useDispatch()
  const navigate = useNavigate();
  const articleList: any = useSelector((state: any) => state.Article_Reducer.articleList)
  const pageIndex: number = useSelector((state: any) => state.Article_Reducer.pageIndex);
  const pageSize = 15;
  let requestData=props.requestData
  requestData.pageIndex=pageIndex
  requestData.pageSize=pageSize
  const [shareShow, setShareShow] = useState(false)
  const [isRequestFinsh, setIsRequestFinsh] = useState(true)
  const [reportShow, setReportShow] = useState(false)
  const loveClick = (item) => {

    if (isRequestFinsh) {
      setIsRequestFinsh(false)
      let articleListTemp = JSON.parse(JSON.stringify(articleList))
      articleListTemp.forEach(element => {
        if (element._id == item._id) {
          if (Taro.getStorageSync(element._id) != ("")) {
            element.loveCount = element.loveCount - 1
            Taro.removeStorageSync(element._id)
            
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
            element.loveCount = element.loveCount + 1
            Taro.setStorageSync(element._id, 1)
            
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
        }
      });
      dispatch(setArticleListAll(articleListTemp))
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


  return (
    <div>
      <ShareSheet
        show={shareShow}
        title="立即分享给好友"
        options={options}
        onSelect={(e) => console.log(e.detail.name)}
        onClose={() => setShareShow(false)}
      />
      <ActionSheet show={reportShow} title="举报帖子" onClose={() => setReportShow(false)}>
        <div className={style.reportTip}>(***多次恶意提交无效举报将会受到处罚***)</div>
        <div>
          <Field
            label="举报理由"
            placeholder="请输入举报理由(选填)"
            border={true} />
          <div className={style.reportButton}>提交</div>
        </div>
      </ActionSheet>
      <LoadMore
        requesUrl={props.requesUrl}
        viewId={'Article'}
        ListCount={articleList.length}
        defaultListCount={1}
        isLeaveClear
        // height={(Taro.getWindowInfo().screenHeight) / 1.4 + 'px'}
        marginBottom={"50px"}
        requestData={requestData}>
        {
          articleList.map((item) => (
            <div className={style.Article + " Article"} key={item._id}>
              <div className={style.Article_top}>
                <div className={style.Article_top_left}>
                  <div className={style.Article_top_head} onClick={() => { navigate("/personalDetails"); }}>
                    <img className={style.Article_top_headImg} src={item.userHeadImg} alt='' />
                  </div>
                  <div className={style.Article_top_headleft}>
                    <div className={style.Article_top_name}>{item.userName}</div>
                    <div className={style.Article_top_time}>{getTime(item.time)}</div>
                  </div>
                </div>
                <div className={style.Article_top_right}><img className={style.Article_top_rightImg} src={images.more} alt='' onClick={() => setReportShow(true)} /></div>
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
              <div className={style.Article_bottom}>
                <div className={style.Article_bottomDiv} onClick={() => { loveClick(item) }}>
                  <img className={style.Article_bottomImg} src={Taro.getStorageSync(item._id) != ("") ? images.love_1 : images.love_2} alt='' />
                  <div className={style.Article_bottom_text}>{item.loveCount}</div>
                </div>
                <div className={style.Article_bottomDiv}>
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
  requesUrl:'getArticleDislayListAll',
  requestData:{}
}



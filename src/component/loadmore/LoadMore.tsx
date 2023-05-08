import { InfiniteScroll, PullToRefresh } from '@antmjs/vantui'
import react, { useEffect, useState } from 'react'
import { setArticleList, clearArticleList, setArticlePageIndex, clearArticlePageIndex } from '../../sclice/Article_Sclice'
import { setChatData, clearChatData, setChatPageIndex, clearChatPageIndex, setChatDefaultList } from '../../sclice/Notice_Sclice'
import { setSysNoticeList, clearSysNoticeList, setSysNoticePageIndex, clearSysNoticePageIndex } from '../../sclice/SysNotice_Sclice'
import { setInteractionList, clearInteractionList, setInteractionPageIndex, clearInteractionPageIndex } from '../../sclice/Interaction_Sclice'
import { setNewFriendList, clearNewFriendList, setNewFriendPageIndex, clearNewFriendPageIndex } from '../../sclice/NewFriend_Sclice'
import { setCommentList, clearCommentList, setCommentPageIndex, clearCommentPageIndex } from '../../sclice/Comment_Sclice'
import { setMyCommentList,clearMyCommentList,setMyCommentPageIndex,clearMyCommentPageIndex } from '../../sclice/MyComment_Sclice'
import { setFollowAndFansList,clearFollowAndFansList,setFollowAndFansPageIndex,clearFollowAndFansPageIndex } from '../../sclice/FollowAndFans_Sclice'
import { useDispatch } from 'react-redux'
import Taro from '@tarojs/taro'
import './LoadMore.scss'
import showError from '../../http/errorShow'
import re from '../../requestUrl'
/**
 * 轮子哥
 * 自定义数据加载组件
 */

export default function HomeLoadMore(props: any) {

  const dispatch: any = useDispatch()
  const mockRequest = (tempRequestDatas) => handleClick(tempRequestDatas)
  const [tempRequestData, setTempRequestData] = useState(props.requestData)
  let requests: any;
  const setDatas = (viewId: string, data: any, noticeList: any) => {
    switch (viewId) {
      case 'Article': dispatch(setArticleList(data)); data.length == tempRequestData.pageSize && dispatch(setArticlePageIndex()); break;
      case 'Notice_List': if (tempRequestData.pageIndex == 0 && noticeList.length != 0) { dispatch(setChatDefaultList(noticeList)) }; dispatch(setChatData(data)); data.length == tempRequestData.pageSize && dispatch(setChatPageIndex()); break;
      case 'SysNotice': dispatch(setSysNoticeList(data)); data.length == tempRequestData.pageSize && dispatch(setSysNoticePageIndex()); break;
      case 'Interaction': dispatch(setInteractionList(data)); data.length == tempRequestData.pageSize && dispatch(setInteractionPageIndex()); break;
      case 'NewFriend': dispatch(setNewFriendList(data)); data.length == tempRequestData.pageSize && dispatch(setNewFriendPageIndex()); break;
      case 'Comment': dispatch(setCommentList(data)); data.length == tempRequestData.pageSize && dispatch(setCommentPageIndex()); break;
      case 'MyComment': dispatch(setMyCommentList(data)); data.length == tempRequestData.pageSize && dispatch(setMyCommentPageIndex()); break;
      case 'FollowAndFans': dispatch(setFollowAndFansList(data)); data.length == tempRequestData.pageSize && dispatch(setFollowAndFansPageIndex()); break;
    }
  }
  const clearDatas = (viewId: string) => {
    switch (viewId) {
      case 'Article': dispatch(clearArticlePageIndex()); dispatch(clearArticleList()); break;
      case 'Notice_List': dispatch(clearChatPageIndex()); dispatch(clearChatData()); break;
      case 'SysNotice': dispatch(clearSysNoticePageIndex()); dispatch(clearSysNoticeList()); break;
      case 'Interaction': dispatch(clearInteractionPageIndex()); dispatch(clearInteractionList()); break;
      case 'NewFriend': dispatch(clearNewFriendPageIndex()); dispatch(clearNewFriendList()); break;
      case 'Comment': dispatch(clearCommentPageIndex()); dispatch(clearCommentList()); break;
      case 'MyComment': dispatch(clearMyCommentPageIndex()); dispatch(clearMyCommentList()); break;
      case 'FollowAndFans': dispatch(clearFollowAndFansPageIndex()); dispatch(clearFollowAndFansList()); break;
    }
  }

  const handleClick = (tempRequestDatas) => {
    console.log("开始请求")
    return new Promise((resolve) => {
      requests = Taro.request({
        url: re(props.requesUrl),
        data: tempRequestDatas,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + Taro.getStorageSync("token")
        },
        success: function (res) {
          if (res.hasOwnProperty("data")) {
            if (res.data.hasOwnProperty("data")&&res.data.data!=null) {
              if (props.viewId == 'Notice_List') {
                console.log(res)
                setDatas(props.viewId, res.data.data, res.data.noticeList)
              } else {
                setDatas(props.viewId, res.data.data, null)
              }
              tempRequestDatas.pageSize == res.data.data.length ? resolve('loading') : resolve('complete')
            }
            else {
              resolve('complete')
            }
          } else {
            resolve('complete')
          }
          showError(res)
        },
        fail: function (res) {
          resolve('complete')
          Taro.showModal({
            title: '请求失败',
            content: "请求路径错误" + JSON.stringify(res),
          })
        }
      })
    });
  }

  useEffect(() => {
    setTempRequestData(props.requestData)
  }, [props.requestData.pageIndex])

  const basicsDoRefresh: any = async () => {
    await clearDatas(props.viewId)
    let tempRequestDatas = tempRequestData;
    tempRequestDatas.pageIndex = 0;
    await mockRequest(tempRequestDatas)
    return 'complete'
  }
  const basicsLoadMore: any = async () => {
    let tempRequestDatas = tempRequestData
    if (props.ListCount % tempRequestData.pageSize == props.defaultListCount) {
      return await mockRequest(tempRequestDatas)
    } else {
      return 'complete'
    }
  }

  react.useEffect(() => {
    return () => {
      //离开页面取消请求
      if (requests != undefined)
        requests.abort()
      if (props.isLeaveClear) {
        clearDatas(props.viewId)
      }
    }
  }, [])

  return (
    <PullToRefresh onRefresh={basicsDoRefresh} touchMaxStart={1000}>
      {props.children}
      <InfiniteScroll loadMore={basicsLoadMore} />
    </PullToRefresh>
  )
}

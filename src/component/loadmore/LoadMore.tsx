import { PowerScrollView } from '@antmjs/vantui'
import react, { useEffect, useState } from 'react'
import { setData } from '../../sclice/Home_Sclice'
import { setChatData, clearChatData, setChatPageIndex, clearChatPageIndex } from '../../sclice/Notice_Sclice'
import { setSysNoticeList, clearSysNoticeList, setSysNoticePageIndex, clearSysNoticePageIndex } from '../../sclice/SysNotice_Sclice'
import { setInteractionList, clearInteractionList, setInteractionPageIndex, clearInteractionPageIndex } from '../../sclice/Interaction_Sclice'
import { useDispatch } from 'react-redux'
import Taro from '@tarojs/taro'
import './LoadMore.scss'
import showError from '../../http/errorShow'
/**
 * 轮子哥
 * 数据加载组件
 */

export default function HomeLoadMore(props: any) {

  const dispatch: any = useDispatch()
  const mockRequest = (tempRequestDatas) => handleClick(tempRequestDatas)
  const [state, changeState] = react.useState({
    basicsList: [],
    basicsFinished: false,
    backRefCount: 1
  })
  const [tempRequestData, setTempRequestData] = useState(props.requestData)
  let requests: any;
  const setState = (newState) => {
    changeState({
      ...state,
      ...newState,
    })
  }
  const setDatas = (viewId: string, data: any) => {
    switch (viewId) {
      case 'ArticleLoadMore': dispatch(setData(data)); data.length == tempRequestData.pageSize && dispatch(setSysNoticePageIndex()); break;
      case 'Notice_List': dispatch(setChatData(data)); data.length == tempRequestData.pageSize && dispatch(setChatPageIndex()); break;
      
      case 'SysNotice': dispatch(setSysNoticeList(data)); data.length == tempRequestData.pageSize && dispatch(setSysNoticePageIndex()); break;
      case 'Interaction': dispatch(setInteractionList(data)); data.length == tempRequestData.pageSize && dispatch(setInteractionPageIndex()); break;
    }
  }
  const clearDatas = (viewId: string) => {
    switch (viewId) {
      case 'ArticleLoadMore': dispatch(clearChatPageIndex()); dispatch(clearChatPageIndex()); break;
      case 'Notice_List': dispatch(clearChatPageIndex()); dispatch(clearChatData()); break;
      case 'SysNotice': dispatch(clearSysNoticePageIndex()); dispatch(clearSysNoticeList()); break;
      case 'Interaction': dispatch(clearInteractionPageIndex());dispatch(clearInteractionList()); break;

    }
  }

  const handleClick = (tempRequestDatas) => {
    console.log("开始请求")
    return new Promise((resolve) => {
      requests = Taro.request({
        url: props.requesUrl,
        data: tempRequestDatas,
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.hasOwnProperty("data")) (
            setDatas(props.viewId, res.data.data),
            tempRequestDatas.pageSize != res.data.data.length ?
              setState({ basicsList: [{}], basicsFinished: true }) :
              setState({ basicsList: [{}], basicsFinished: false }),
            resolve(res.data.data)
          )
          else {
            setState({
              basicsList: [{}],
              basicsFinished: true,
            })
            resolve([])
          }
          showError(res)
        }
      })
    });
  }

  useEffect(() => {
    setTempRequestData(props.requestData)
  }, [props.requestData.pageIndex])

  console.log(props.requestData.pageIndex)
  console.log(tempRequestData)

  const basicsDoRefresh: any = async () => {
    await clearDatas(props.viewId)
    let tempRequestDatas = tempRequestData;
    tempRequestDatas.pageIndex = 0;
    await mockRequest(tempRequestDatas)
  }
  const basicsLoadMore: any = async () => {
    let tempRequestDatas = tempRequestData
    await mockRequest(tempRequestDatas)
  }

  react.useEffect(() => {
    if (props.ListCount % tempRequestData.pageSize != props.defaultListCount) {
      setState({ basicsList: [...state.basicsList, {}], basicsFinished: props.ListCount % tempRequestData.pageSize != props.defaultListCount })
    } else {
      basicsLoadMore()
    }
    return () => {
      //离开页面取消请求
      if (requests != undefined)
        requests.abort()
      // dispatch(clearPageIndex())
      // dispatch(clearChatData())
    }
  }, [])

  return (
    <PowerScrollView
      finishedText="没有更多了"
      successText="刷新成功"
      errorText="请求失败，点击重新加载"
      onScrollToUpper={basicsDoRefresh}
      onScrollToLower={basicsLoadMore}
      current={state.basicsList.length}
      finished={state.basicsFinished}
      renderLoading={props.ListCount % tempRequestData.pageSize != props.defaultListCount ? <div></div> : ""}
      animationDuration={10}
      style={{
        height: props.height
      }}
    >
      {state.basicsList.map(() => (
        props.children
      )
      )}
    </PowerScrollView>
  )
}

import { PowerScrollView } from '@antmjs/vantui'
import react, { useState } from 'react'
import { setData } from '../sclice/Home_Sclice'
import { setChatData, clearChatData, setPageIndex, clearPageIndex } from '../sclice/Notice_Sclice'
import { useDispatch, useSelector } from 'react-redux'
import Taro from '@tarojs/taro'

/**
 * 轮子哥
 * 数据加载组件
 */

export default function HomeLoadMore(props: any) {

  const dispatch: any = useDispatch()
  const mockRequest = () => handleClick()
  const [state, changeState] = react.useState({
    basicsList: [],
    basicsFinished: false,
    backRefCount: 1
  })
  const [tempRequestData, setTempRequestData] = useState(props.requestData)
  let requests:any;
  const setState = (newState) => {
    changeState({
      ...state,
      ...newState,
    })
  }
  const setDatas = (viewId: string, data: any) => {
    switch (viewId) {
      case 'ArticleLoadMore': dispatch(setData(data)); dispatch(setPageIndex()); break;
      case 'Notice_List': dispatch(setChatData(data)); dispatch(setPageIndex()); break;
    }
  }

  let temp = tempRequestData;
  temp.pageIndex = useSelector((state: any) => state.Notice_Sclice_State.pageIndex);
  console.log("我执行了", temp.pageIndex)
  console.log("父",props.ListCount)

  const handleClick = () => {
    console.log("开始请求")
    return new Promise((resolve) => {
      requests =Taro.request({
        url: props.requesUrl,
        data: tempRequestData,
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.hasOwnProperty("data")) (
            setDatas(props.viewId, res.data.data),
            tempRequestData.pageSize != res.data.data.length ?
              setState({ basicsList: [{}], basicsFinished: true }) :
              setState({ basicsList: [{}], basicsFinished: false }),
            resolve(res.data.data)
          )
          else {
            Taro.showModal({
              title: '请求失败',
              content: "错误：" + JSON.stringify(res.data),
            })
            setState({
              basicsList: [{}],
              basicsFinished: true,
            })
            resolve([])
          }
        }
      })
    });
  }


  const basicsDoRefresh: any = async () => {
    await dispatch(clearPageIndex())
    await dispatch(clearChatData())
    const append: any = await mockRequest()
    if (tempRequestData.pageSize == append.length) setTempRequestData(temp)
  }
  const basicsLoadMore: any = async () => {
    let append: any = await mockRequest()
    if (tempRequestData.pageSize == append.length) setTempRequestData(temp)
  }

  react.useEffect(() => {
    if (temp.pageIndex != 0) {
      setState({ basicsList: [...state.basicsList, {}], basicsFinished: props.ListCount%tempRequestData.pageSize!=props.defaultListCount })
    } else {
      basicsLoadMore()
    }
    return () => {
      //离开页面取消请求
      if(requests!=undefined)
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
      renderLoading={props.ListCount%tempRequestData.pageSize!=props.defaultListCount ? '':<div></div>}
      animationDuration={10}
      style={{
        height: props.height,
        marginBottom: "3rem"
      }}>
      {state.basicsList.map(() => (
        props.children
      )
      )}
    </PowerScrollView>
  )
}


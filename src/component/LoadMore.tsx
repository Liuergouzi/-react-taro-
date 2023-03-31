import { PowerScrollView } from '@antmjs/vantui'
import react, { useEffect, useState } from 'react'
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
  })
  const [tempRequestData, setTempRequestData] = useState(props.requestData)

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

  const handleClick = () => {
    console.log("开始请求")
    return new Promise((resolve, reject) => {
      Taro.request({
        url: props.requesUrl,
        data: tempRequestData,
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.hasOwnProperty("data")) (
            setDatas(props.viewId, res.data.data),
            tempRequestData.pageSize != res.data.data.length ?
            setState({ basicsList: [...state.basicsList], basicsFinished: true }):
            setState({ basicsList: [ {}], basicsFinished: false }),
            resolve(res.data.data)
          )
          else {
            Taro.showModal({
              title: '请求失败',
              content: "错误：" + JSON.stringify(res.data),
            }),
              setState({
                basicsFinished: true,
              })
          }
        }
      })
    });
  }


  const basicsDoRefresh: any = async (event = 0) => {
    await dispatch(clearPageIndex())
    await dispatch(clearChatData())
    const append: any = await mockRequest()
    if(tempRequestData.pageSize == append.length )setTempRequestData(temp)
  }
  const basicsLoadMore: any = async (event = 0, isRefresh = false) => {
    let append: any = await mockRequest()
    if(tempRequestData.pageSize == append.length )setTempRequestData(temp)
    console.log(append)
  }

  react.useEffect(() => {
    basicsLoadMore()
    return ()=>{
      dispatch(clearPageIndex())
      dispatch(clearChatData())
    }
  }, [])

  return (
    <PowerScrollView
      finishedText="没有更多了"
      successText="刷新成功"
      onScrollToUpper={basicsDoRefresh}
      onScrollToLower={basicsLoadMore}
      current={state.basicsList.length}
      finished={state.basicsFinished}
      style={{
        height: props.height,
        marginBottom: "3rem"
      }}>
      {state.basicsList.map((e, i) => (
        props.children
      )
      )}
    </PowerScrollView>
  )
}


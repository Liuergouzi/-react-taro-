import { PowerScrollView } from '@antmjs/vantui'
import { List } from 'lodash'
import react from 'react'
import { axios } from 'taro-axios'
import { setData } from '../sclice/Home_Sclice'
import { useDispatch } from 'react-redux'

/**
 * 轮子哥
 * 数据加载组件
 */

export default function HomeLoadMore(props:any) {

  const dispatch:any = useDispatch()

  const  mockRequest  = ()=>handleClick()

  const [state, changeState] = react.useState({
    
    basicsList: [],
    basicsFinished: false,
  })
  const setState = (newState) => {
    changeState({
      ...state,
      ...newState,
    })
  }
  
  const  handleClick = () => {
        return  new Promise(  (resolve, reject) => {
          axios.get("https://www.baidu.com/")
          .then(res => {
              const append:List<any> = [{id:1,name:1},{id:1,name:1},{id:1,name:1},{id:1,name:1},{id:1,name:1},{id:1,name:1},{id:1,name:1},{id:1,name:1}]
              resolve(append)
          })
          .catch((error)=>{
            const appends:List<any> = [{id:1,name:"error"}]
            reject(appends)
          }
          )
        });
}

 
  const basicsDoRefresh:any = async (event = 0) => {
    const append:any = await mockRequest()

    dispatch(setData(append))
    setState({
      basicsList: append ,

      basicsFinished: append.length === 0,
    })
  }
  const basicsLoadMore:any = async (event = 0, isRefresh = false) => {
    let append:any = await mockRequest()
    dispatch(setData(append))
    setData(append)

    setState({
      basicsList: [...state.basicsList, ...append],
      basicsFinished: append.length === 0,
    })
  }

  react.useEffect(() => {
    basicsLoadMore()
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
        height:"350px",
        marginBottom: "3rem"
      }}
    >
      {state.basicsList.map((e, i) => (
          props.children
      )
      )}
    </PowerScrollView>
  )
}


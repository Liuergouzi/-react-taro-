import { Provider } from 'react-redux'
import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar'
import store from '../../sclice/Store'
import MyCommentLoadMore from './MyCommentLoadMore'

export default function MyComment() {
  return (
    <Provider store={store}>
      <TopMostTaroNavigationBar needBackIcon={true} mainTitle={'我的评论'} />
      <MyCommentLoadMore/>
    </Provider>
  )
}

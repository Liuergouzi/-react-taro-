import { Provider } from 'react-redux'
import TopBar from "../../component/topbar/TopBar"
import store from '../../sclice/Store'
import InteractionLoadMore from './InteractionLoadMore'

export default function Interaction() {
  return (
    <Provider store={store}>
      <TopBar leftShow={true}>我的动态</TopBar>
      <InteractionLoadMore></InteractionLoadMore>
    </Provider>
  )
}

import { Provider } from 'react-redux'
import TopBar from '../../component/topbar/TopBar'
import store from '../../sclice/Store'
import NewFriendLoadMore from "./NewFriendLoadMore"


export default function NewFriend() {
  return (
    <Provider store={store}>
      <TopBar leftShow={true}>新粉丝</TopBar>
      <NewFriendLoadMore></NewFriendLoadMore>
    </Provider>
  )
}

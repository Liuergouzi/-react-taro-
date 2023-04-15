import { Provider } from 'react-redux'
import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar'
import store from '../../sclice/Store'
import NewFriendLoadMore from "./NewFriendLoadMore"


export default function NewFriend() {
  return (
    <Provider store={store}>
      <TopMostTaroNavigationBar needBackIcon={true} mainTitle={'新粉丝'} />
      <NewFriendLoadMore></NewFriendLoadMore>
    </Provider>
  )
}

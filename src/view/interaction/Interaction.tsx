import { Provider } from 'react-redux'
import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar'
import store from '../../sclice/Store'
import InteractionLoadMore from './InteractionLoadMore'

export default function Interaction() {
  return (
    <Provider store={store}>
      <TopMostTaroNavigationBar needBackIcon={true} mainTitle={'动态'} />
      <InteractionLoadMore></InteractionLoadMore>
    </Provider>
  )
}

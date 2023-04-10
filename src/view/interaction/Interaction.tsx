import { Provider } from 'react-redux'
import store from '../../sclice/Store'
import InteractionLoadMore from './InteractionLoadMore'

export default function Interaction() {
  return (
    <Provider store={store}>
      <InteractionLoadMore></InteractionLoadMore>
    </Provider>
  )
}

import { Provider } from 'react-redux';
import store from '../../sclice/Store'
import SysNoticeLoadMore from './SysNoticeLoadMore';
export default function SysNotice() {
  return (
    <div>
          <Provider store={store}>
            <SysNoticeLoadMore></SysNoticeLoadMore>
          </Provider>
    </div>
  )
}

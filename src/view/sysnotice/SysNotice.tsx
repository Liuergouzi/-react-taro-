import { Provider } from 'react-redux';
import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar';
import store from '../../sclice/Store'
import SysNoticeLoadMore from './SysNoticeLoadMore';
export default function SysNotice() {
  return (
    <div>
          <Provider store={store}>
          <TopMostTaroNavigationBar needBackIcon={true} mainTitle={'系统通知'} />
            <SysNoticeLoadMore></SysNoticeLoadMore>
          </Provider>
    </div>
  )
}

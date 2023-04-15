import BottomNavigation from '../../component/navigation/BottomNavigation';
import NoticeLoadMore from './NoticeLoadMore';
import store from '../../sclice/Store'
import { Provider } from 'react-redux'
import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar';

export default function Notice() {

    return (
        <div>
            <Provider store={store}>
            <TopMostTaroNavigationBar needBackIcon={false} mainTitle={'消息'} />
                <NoticeLoadMore />
                <BottomNavigation />
            </Provider>
        </div>
    )

}

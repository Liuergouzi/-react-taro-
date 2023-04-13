import BottomNavigation from '../../component/navigation/BottomNavigation';
import NoticeLoadMore from './NoticeLoadMore';
import store from '../../sclice/Store'
import { Provider } from 'react-redux'

export default function Notice() {

    return (
        <div>
            <Provider store={store}>
                <NoticeLoadMore />
                <BottomNavigation />
            </Provider>
        </div>
    )

}

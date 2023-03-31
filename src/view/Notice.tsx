import BottomNavigation from '../component/BottomNavigation';
import Notice_ListLoadMore from '../component/Notice_ListLoadMore';
import store from '../sclice/Store'
import { Provider } from 'react-redux'

export default function Notice() {

    return (
        <div>
            <Provider store={store}>
                <Notice_ListLoadMore />
                <BottomNavigation />
            </Provider>
        </div>
    )

}

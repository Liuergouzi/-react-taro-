import BottomNavigation from '../component/BottomNavigation';
import Notice_List from '../component/Notice_List';
import store from '../sclice/Store'
import { Provider } from 'react-redux'

export default function Notice() {

    return (
        <div>
            <Provider store={store}>
                <Notice_List />
                <BottomNavigation />
            </Provider>
        </div>
    )

}

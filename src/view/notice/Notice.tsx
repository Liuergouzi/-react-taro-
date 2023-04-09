import BottomNavigation from '../../component/navigation/BottomNavigation';
import Notice_List from './Notice_List';
import store from '../../sclice/Store'
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

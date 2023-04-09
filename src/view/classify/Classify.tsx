import { Provider } from 'react-redux';
import BottomNavigation from '../../component/navigation/BottomNavigation';
import store from '../../sclice/Store'
export default function Classify() {
    return (
        <Provider store={store}>
            分类
            <BottomNavigation/>
        </Provider>
    )
}

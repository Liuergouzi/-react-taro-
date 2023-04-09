import BottomNavigation from '../../component/navigation/BottomNavigation';
import Push_textarea from './Push_textarea'
import Push_UploadImg from './Push_UploadImg';
import Push_tags from './Push_tags';
import Push_Buttom from './Push_Buttom';
import store from '../../sclice/Store'
import { Provider } from 'react-redux'

export default function Push() {
    return (
        <div>
            <Provider store={store}>
                <Push_tags />
                <Push_textarea />
                <Push_UploadImg />
                <Push_Buttom />
                <BottomNavigation />
            </Provider>
        </div>
    )
}

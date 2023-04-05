import BottomNavigation from '../component/BottomNavigation';
import Push_textarea from '../component/Push_textarea'
import Push_UploadImg from '../component/Push_UploadImg';
import Push_tags from '../component/Push_tags';
import Push_Buttom from '../component/Push_Buttom';
import store from '../sclice/Store'
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

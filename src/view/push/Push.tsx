import Push_textarea from './Push_textarea'
import Push_UploadImg from './Push_UploadImg';
import Push_tags from './Push_tags';
import Push_Buttom from './Push_Buttom';
import store from '../../sclice/Store'
import { Provider } from 'react-redux'
import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar';

export default function Push() {
    return (
        <div>
            <Provider store={store}>
                <TopMostTaroNavigationBar needBackIcon={true} mainTitle={'发布'} />
                <Push_tags />
                <Push_textarea />
                <Push_UploadImg />
                <Push_Buttom />
            </Provider>
        </div>
    )
}

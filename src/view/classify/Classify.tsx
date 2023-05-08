import { Provider } from 'react-redux';
import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar';
import BottomNavigation from '../../component/navigation/BottomNavigation';
import store from '../../sclice/Store'
export default function Classify() {
    return (
        <Provider store={store}>
            <TopMostTaroNavigationBar needBackIcon={false} mainTitle={'分类'} />
            分类----后续扩展内容待更新
            {/* <div style={{height:"300px"}}>
                <iframe src='https://ctrlc.cc' ></iframe >
            </div> */}
            <BottomNavigation />
        </Provider>
    )
}

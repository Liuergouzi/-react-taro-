import BottomNavigation from '../../component/navigation/BottomNavigation';
import My_head from './My_head';
import My_bottom_list from './My_bottom_list';
import My_head_buttom from './My_head_buttom';
import React from 'react'
import store from '../../sclice/Store'
import { Provider } from 'react-redux';
import TopMostTaroNavigationBar from "../../component/navigation/TopMostTaroNavigationBar";
import { useNavigate } from 'react-router-dom';
const My = React.memo(() => {
    const navigate = useNavigate();
    return (
        <Provider store={store}>
            <TopMostTaroNavigationBar needBackIcon={false} mainTitle={'我的'} />
            <My_head />
            <div onClick={() => { navigate("/personalSetting"); }}>
                点击设置
            </div>
            <My_head_buttom />
            <My_bottom_list />
            <BottomNavigation />
        </Provider>
    )
}
)
export default My
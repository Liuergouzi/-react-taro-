import { Outlet } from "react-router-dom";
import BottomNavigation from '../component/BottomNavigation';
import Carousel from '../component/Announcement';
import Home_bottom_list from '../component/Home_bottom_list';
import Home_center_1 from '../component/Home_center_1';
import Home_center_2 from '../component/Home_center_2';
import store from '../sclice/Store'
import { Provider } from 'react-redux'
import React from 'react'

const Home= React.memo(()=> {
    return (
        <div>
            <Provider store={store}>
                <Carousel />
                <Home_center_1 />
                <Home_center_2 />
                <Home_bottom_list />
                <Outlet />
                <BottomNavigation />
            </Provider>
        </div>
    )
}
)
export default Home
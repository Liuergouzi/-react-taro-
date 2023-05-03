import { Outlet, useNavigate } from "react-router-dom";
import BottomNavigation from '../../component/navigation/BottomNavigation';
import Carousel from '../../component/carousel/Announcement';
import style from './Home.module.scss'
import itemList from '../../itemList'
import images from '../../resources'
import Home_bottom_list from './Home_bottom_list';
import store from '../../sclice/Store'
import { Provider } from 'react-redux'
import React from 'react'
import TopMostTaroNavigationBar from "../../component/navigation/TopMostTaroNavigationBar";

const Home = React.memo(() => {

    const navigate = useNavigate();

    return (
        <div>
            <TopMostTaroNavigationBar needBackIcon={false} mainTitle={''}>
                <div className={style.search} onClick={() => navigate("/search")}>
                    <img src={images.search} className={style.searchImg}></img>
                    搜索你的想法，如：爱坤
                </div>
            </TopMostTaroNavigationBar>
            <Provider store={store}>
                <Carousel />
                <div className={style.HomeCenterList}>
                    <ul className={style.HomeCenterUl}>
                        {
                            itemList.Home_center_list.map(item => (
                                <li className={style.HomeCenterLi} key={item.id}>
                                    <img className={style.HomeCenterImg} src={item.url} />{item.name}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className={style.Home_center_2}>
                    <div className={style.left}>
                        <div className={style.left_top}>
                            <div style={{ width: "100%" }}>
                                <div className={style.left_top_title}>失物招领</div>
                                <div className={style.left_top_headImg}>
                                    <img className={style.img1} src={images.boy}></img>
                                    <img className={style.img2} src={images.girl}></img>
                                    <img className={style.img3} src={images.boy}></img>
                                    <img className={style.img4} src={images.girl}></img>
                                </div>
                            </div>
                            <img className={style.img5} src={images.lost_bg}></img>
                        </div>
                        <div className={style.left_bottom}>
                            2020人在寻找丢失物
                        </div>
                    </div>

                    <div className={style.right}>

                        <div className={style.left_top}>
                            <div style={{ width: "100%" }}>
                                <div className={style.left_top_title}>闲置出售</div>
                                <div className={style.left_top_headImg}>
                                    <img className={style.img1} src={images.girl}></img>
                                    <img className={style.img2} src={images.boy}></img>
                                    <img className={style.img3} src={images.girl}></img>
                                    <img className={style.img4} src={images.girl}></img>
                                </div>
                            </div>
                            <img className={style.img5} src={images.sell_bg}></img>
                        </div>
                        <div className={style.right_bottom}>
                            2023人在出售闲置物品
                        </div>
                    </div>

                </div>
                <Home_bottom_list />
                <div className={style.list}>
                    <Outlet />
                </div>
                <BottomNavigation />
            </Provider>
        </div>
    )
}
)
export default Home
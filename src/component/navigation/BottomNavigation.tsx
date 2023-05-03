
import { NavLink, useLocation } from 'react-router-dom'
import routers from '../../router/router';
import style from './BottomNavigation.module.scss'
import { useState } from 'react';
import images from '../../resources';
import { useSelector } from 'react-redux';
/**
 * 轮子哥
 * 自定义底部tabbar
 */

export default function BottomNavigation() {

    const currentUrl = useLocation().pathname
    const newMessage = useSelector((state: any) => state.Notice_Reducer.navBarRed)
    const [moveMouse, setMoveMouse] = useState(false)

    return (

        <div className={style.BottomNavigation}>

            {
                routers.map(
                    item =>
                        item.isBottomTabbar && item.isleft &&
                        <NavLink to={item.path} key={item.path} className={({ isActive }) => isActive ? style.BottomNavigationTrue : style.BottomNavigationFalse}>
                            <div className={style.navFlex}>
                                <img src={currentUrl === item.path ? item.imgUrlTrue : item.imgUrlFalse} className={style.BottomNavigationImg}></img>
                                {item.title}
                            </div>
                        </NavLink>
                )
            }
            <div>
                <div className={moveMouse ? style.navbar2 : style.navbar1} onClick={() => { setMoveMouse(!moveMouse) }} >
                    <img className={moveMouse ? style.pushImg2 : style.pushImg1} src={images.add} />
                    <ul className={moveMouse ? style.menu2 : style.menu1}>
                        <li className={moveMouse ? style.liItem2 : style.liItem1}>
                            <NavLink to={'/push'} className={moveMouse ? style.aitem2 : style.aitem1}>
                                表白
                            </NavLink>
                        </li>
                        <li className={moveMouse ? style.liItem2 : style.liItem1}>
                            <NavLink to={'/push'} className={moveMouse ? style.aitem2 : style.aitem1}>
                                帖子
                            </NavLink>
                        </li>
                        <li className={moveMouse ? style.liItem2 : style.liItem1}>
                            <NavLink to={'/push'} className={moveMouse ? style.aitem2 : style.aitem1}>
                                求助
                            </NavLink>
                        </li>
                    </ul>
                </div>

            </div>

            {
                routers.map(
                    item =>
                        item.isBottomTabbar && !item.isleft &&
                        <NavLink to={item.path} key={item.path} className={({ isActive }) => isActive ? style.BottomNavigationTrue : style.BottomNavigationFalse}>
                            {item.path == '/notice' && newMessage ? <div className={style.red}>new</div> : ''}
                            <div className={style.navFlex}>
                                <img src={currentUrl === item.path ? item.imgUrlTrue : item.imgUrlFalse} className={style.BottomNavigationImg}></img>
                                {item.title}
                            </div>
                        </NavLink>
                )
            }


        </div>
    )
}




import { NavLink, useLocation } from 'react-router-dom'
import routers from '../../router/router';
import style from './BottomNavigation.module.scss'
import { useState } from 'react';
/**
 * 轮子哥
 * 自定义底部tabbar
 */

export default function BottomNavigation() {

    const currentUrl = useLocation().pathname

    const [newMessage] = useState(false)

    return (

        <div className={style.BottomNavigation}>
            {
                routers.map(
                    item =>
                        item.isBottomTabbar &&
                        <NavLink to={item.path} key={item.path} className={({ isActive }) => isActive ? style.BottomNavigationTrue : style.BottomNavigationFalse}>
                            {item.path == '/notice' && newMessage ? <div className={style.red}>new</div> : ''}
                            <img src={currentUrl === item.path ? item.imgUrlTrue : item.imgUrlFalse} className={style.BottomNavigationImg}></img>
                            {item.title}
                        </NavLink>
                )
            }
        </div>
    )
}



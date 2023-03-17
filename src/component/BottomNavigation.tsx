import { NavLink, useLocation } from 'react-router-dom'
import routers from '../router/router';
import style from '../style/BottomNavigation.module.scss'

/**
 * 轮子哥
 * 自定义底部tabbar
 */

export default function BottomNavigation() {

    const currentUrl = useLocation().pathname

    return (

        <div className={style.BottomNavigation}>
            {
                routers.map(
                    item =>
                        item.isBottomTabbar &&
                        <NavLink to={item.path} key={item.path} className={({ isActive }) => isActive ? style.BottomNavigationTrue : style.BottomNavigationFalse}>
                            <img src={currentUrl === item.path ? item.imgUrlTrue : item.imgUrlFalse} className={style.BottomNavigationImg}></img>
                            {item.title}
                        </NavLink>
                )
            }
        </div>
    )
}

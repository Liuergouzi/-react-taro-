import style from '../style/Home_center_1.module.scss'
import itemList from '../itemList'

/**
 * 轮子哥
 * 自定义首页中间icon列表组件
 */

export default function Home_center_1() {

    return (
        <div className={style.HomeCenterList}>
            <ul className={style.HomeCenterUl}>
                {
                    itemList.Home_center_list.map(item => (
                        <li className={style.HomeCenterLi} key={item.id}>
                            <img className={style.HomeCenterImg} src={item.url}/>{item.name}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

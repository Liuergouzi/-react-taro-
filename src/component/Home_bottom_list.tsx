import { Component } from 'react'
import style from '../style/Home_bottom_list.module.scss'
import { NavLink} from 'react-router-dom'
import itemList from '../itemList'

/**
 * 轮子哥
 * 自定义首页底部标签栏
 */

interface propsbind {
    type: number
}

export default class Home_bottom_list extends Component<propsbind, any> {
    constructor(props: propsbind) {
        super(props)
    }

    static defaultProps = {
        type: 1
    }

    componentDidMount() {
        // this.props.type
        // 构造axios请求
    }

    render() {
        return (
            <div className={style.HomeButtomList}>
                <ul className={style.HomeButtomListUl}>
                    {
                        itemList.Home_bottom_list.map((item: any) =>
                            <li key={item.id} className={style.HomeButtomListLi}>
                                <NavLink to={item.path}  className={({ isActive }) => isActive ? style.BottomNavigationTrue : style.BottomNavigationFalse}>
                                    {item.name}
                                </NavLink>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}


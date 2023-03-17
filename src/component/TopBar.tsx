import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import style from '../style/TopBar.module.scss'
import  images  from '../resources'

/**
 * 轮子哥
 * 自定义顶部导航栏组件
 */

interface propsBind {
    title?: string
    leftShow: boolean
    rightShow: boolean
}

export default class TopBar extends Component<propsBind, any> {

    constructor(props: propsBind) {
        super(props)
    }

    render() {
        return (
            <div className={style.TopBar}>
                {this.props.leftShow ?
                    <div className={style.TopBarLeftItem}>
                        <img src={images.back}></img>
                        <div>返回</div>
                    </div>:<div className={style.TopBarLeftItem}></div>
                }

                <div  className={style.TopBarItem}>{this.props.title}</div>

                { this.props.rightShow ?
                    <Link to="/login" className={style.TopBarItem}>去登录？</Link>:<div className={style.TopBarItem}></div>
                }
            </div>
        )
    }
}

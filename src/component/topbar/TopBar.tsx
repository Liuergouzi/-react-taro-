import { Component } from 'react'
import style from './TopBar.module.scss'
import images from '../../resources'

/**
 * 轮子哥
 * 自定义顶部导航栏组件
 */

interface propsBind {
    leftShow: boolean
    children?: any
}

export default class TopBar extends Component<propsBind, any> {
    
    constructor(props: propsBind) {
        super(props)
    }
    

    render() {
        return (
            <div className={style.TopBar}>
                {this.props.leftShow ?
                    <div className={style.TopBarLeftItem} onClick={()=>{window.history.back()}}>
                        <img className={style.TopBarLeftItemImg} src={images.back}></img>
                        <div>返回</div>
                    </div> : <div className={style.TopBarLeftItem}></div>
                }

                <div className={style.TopBarItem}>{this.props.children}</div>

                <div className={style.TopBarItem}></div>

            </div>
        )
    }
}

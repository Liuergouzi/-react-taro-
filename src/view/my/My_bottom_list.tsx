import style from './My_bottom_list.module.scss'
import itemList from '../../itemList'

/**
 * 轮子哥
 * 我的-自定义底部icon列表
 */

export default function My_bottom_list() {
    return (
        <div>
            <div className={style.myTop}>
                <div className={style.myLeft}>
                    <div className={style.myLeftTop}>我的订单</div>
                </div>
                <div className={style.myRight}>
                    <div className={style.myRightTop}>
                        我的任务
                    </div>
                </div>
            </div>

            <div className={style.My_bottom_list}>
                {
                    itemList.My_bottom_list.map(item => (
                        <div className={style.list} key={item.id}>
                            <div className={style.listTitle}>{item.title}</div>
                            <div className={style.listLine}></div>
                            <div className={style.listItem}>
                                {
                                    item.data.map(items => (
                                        <div className={style.listDiv} key={items.id}>
                                            <img className={style.itemImg} src={items.url}></img>
                                            <div className={style.itemText}>{items.name}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                    )
                }
            </div>
        </div>
    )
}

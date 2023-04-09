import style from './My_bottom_list.module.scss'
import itemList from '../../itemList'

/**
 * 轮子哥
 * 我的-自定义底部icon列表
 */

export default function My_bottom_list() {
    return (
        <div className={style.My_bottom_list}>
            {
                itemList.My_bottom_list.map(item => (
                    <div className={style.list}>
                        <div className={style.listTitle}>{item.title}</div>
                        <div className={style.listLine}></div>
                        <div className={style.listItem}>
                            {
                                item.data.map(items => (
                                    <div className={style.listDiv}>
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
    )
}
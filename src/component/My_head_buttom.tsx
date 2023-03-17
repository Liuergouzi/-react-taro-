import style from '../style/My_head_buttom.module.scss'
import itemList from '../itemList'

/**
 * 轮子哥
 * 我的-自定义头像底部数据栏
 */

export default function My_head_buttom() {
    return (
        <div>
            <div className={style.myTop}>
                <div className={style.topFlex}>
                    {
                        itemList.My_head_buttom_list.map(item => (
                            <div className={style.topItem} key={item.id}>
                                <div className={style.itemData}>
                                    {item.count}
                                </div>
                                <div className={style.itemText}>
                                    {item.name}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

import style from './My_head_buttom.module.scss'
import itemList from '../../itemList'
import React from 'react'

/**
 * 轮子哥
 * 我的-自定义头像底部数据栏
 */

interface My_head_buttom {
    data: {
        followCount: number,
        fansCount: number,
        loveCount: number,
        articleCount: number
    }
}

const My_head_buttom = React.memo((props: My_head_buttom) => {
    return (
        <div>
            <div className={style.myTop}>
                <div className={style.topFlex}>
                    {
                        itemList.My_head_buttom_list.map((item, index) => (
                            <div className={style.topItem} key={item.id}>
                                <div className={style.itemData}>
                                    {index == 0 && props.data.followCount}
                                    {index == 1 && props.data.fansCount}
                                    {index == 2 && props.data.loveCount}
                                    {index == 3 && props.data.articleCount}
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
)
export default My_head_buttom
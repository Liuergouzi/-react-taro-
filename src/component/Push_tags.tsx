import style from '../style/Push_tags.module.scss'
import itemList from '../itemList'
import { setTagId } from '../sclice/Push_Sclice'
import { useDispatch } from 'react-redux'

/**
 * 轮子哥
 * 发布-自定义顶部标签块选择
 */

const itemListCopy: any = [{ id: 0, name: "请选择标签：", path: "" }, ...itemList.Home_bottom_list]

export default function Push_tags() {

    const dispatch:any = useDispatch()

    return (
        <div>
            <div className={style.tagList}>
                <ul className={style.tagListUl}>
                    {
                        itemListCopy.map((item: any) =>
                            <li key={item.id} className={style.tagListLi}>
                                {item.id == 0 ?
                                    <div>{item.name}</div>
                                    :
                                    <div className={style.tagDiv}
                                        onClick={() => {dispatch(setTagId(item.id)) }}>
                                        #{item.name}
                                    </div>
                                }
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

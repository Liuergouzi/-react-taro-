import style from '../style/Notice_List.module.scss'
import itemList from '../itemList'
import { useNavigate } from 'react-router-dom'
/**
 * 轮子哥
 * 自定义信息列表组件
 */

export default function Notice_List() {
    const navigate = useNavigate();
    return (
        <div className={style.Notice_List}>
            {
                itemList.Notice_List.map(item => (
                    <div key={item.title} className={style.list_item} onClick={()=>{navigate("/chat");}} >
                        <img src={item.url} className={style.itemImg}/>
                        <div className={style.list_center}>
                            <div className={style.list_title}>{item.title}</div>
                            <div className={style.list_message}>{item.message} {item.time}</div>
                        </div>
                    </div>
                )
                )
            }
        </div>
    )


}

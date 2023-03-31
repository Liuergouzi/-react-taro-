import style from '../style/Notice_List.module.scss'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

/**
 * 轮子哥
 * 自定义信息列表组件
 */

export default function Notice_List() {
    const navigate = useNavigate();

    const chatListData: any = useSelector((state: any) => state.Notice_Sclice_State.chatList)

    console.log("list",JSON.stringify(chatListData))
    return (
            <div className={style.Notice_List} onClick={()=>{console.log(chatListData)}}>
                {
                    chatListData.map(item => (
                        <div key={item.time} className={style.list_item} onClick={() => { navigate("/chat"); }} >
                            <img src={item.head} className={style.itemImg} />
                            <div className={style.list_center}>
                                <div className={style.list_title}>{item.name}</div>
                                <div className={style.list_message}>{item.message} {item.time}</div>
                            </div>
                        </div>
                    )
                    )
                }
            </div>
    )


}
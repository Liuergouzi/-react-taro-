import style from './My_bottom_list.module.scss'
import itemList from '../../itemList'
import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 轮子哥
 * 我的-自定义底部icon列表
 */

const My_bottom_list = React.memo(() => {

    const navigate = useNavigate();
    const goTo=(index)=>{
        switch(index){
            case 0:navigate("/myPush");break;
            case 1:navigate(`/myLike`);break;
            case 2:navigate(`/myComment`);break;
        }
    }

    return (
        <div>
            <div className={style.myTop}>
                <div className={style.myLeft}>
                    <div className={style.myLeftTop}>我的动态</div>
                    <div className={style.TopListItem}>
                    {
                        itemList.My_bottom_list_left.map((item,index) => (
                            <div className={style.topListDiv} key={item.id} onClick={()=>{goTo(index)}}>
                                <img className={style.topItemImg} src={item.url}></img>
                                <div className={style.topItemText}>{item.title}</div>
                            </div>
                        ))
                    }
                    </div>
                </div>
                <div className={style.myRight}>
                    <div className={style.myRightTop}>我的社交</div>
                    <div className={style.TopListItem}>
                    {
                        itemList.My_bottom_list_right.map((item) => (
                            <div className={style.topListDiv} key={item.id}>
                                <img className={style.topItemImg} src={item.url}></img>
                                <div className={style.topItemText}>{item.title}</div>
                            </div>
                        ))
                    }
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
)

export default My_bottom_list; 
import { useSelector } from 'react-redux'
import itemList from '../itemList'
import { Switch } from '@antmjs/vantui'
import style from '../style/Push_Buttom.module.scss'
import { useState } from 'react'
import GButton from './GButton'

/**
 * 轮子哥
 * 发布-自定义底部组件
 */

export default function Push_Buttom() {

    const selectId: any = useSelector((state: any) => state.Push_Sclice.tagId)
    const tagName: Array<any> = itemList.Home_bottom_list.filter((e) => e.id == selectId)
    const [value, setValue] = useState(false)
    return (
        <div className={style.pushBottom}>
            <div className={style.selectDiv}>
                <div className={style.tagDiv}>
                    已选标签：
                    <div className={style.tag}>
                        {tagName.length ? " #" + tagName[0].name : ""}
                    </div>
                </div>
                <div className={style.isPublice}>
                    <div className="isPubliceLeft">{value ? "匿名" : "公开"}</div>
                    <Switch
                        size="20px"
                        activeColor="#8BD1AE"
                        inactiveColor="#a5a5a5"
                        checked={value}
                        onChange={(e) => setValue(e.detail)} />
                </div>
            </div>
            <GButton text='发布' marginTop='50px'/>
        </div>
    )
}

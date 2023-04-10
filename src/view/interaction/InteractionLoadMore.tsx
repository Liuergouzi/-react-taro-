import React, { useState } from 'react'
import style from './InteractionLoadMore.module..scss'
import images from '../../resources'

export default function InteractionLoadMore() {

    const [loveCount, setLoveCount] = useState(10)
    const [type, setType] = useState("replay")

    return (
        <div>

            <div className={style.contain}>
                <div className={style.left}>
                    <img className={style.leftImg} src={images.testH1}></img>
                    {
                        type == 'love' ?
                            <img className={style.leftMinImg} src={images.love_3}></img> :
                            <img className={style.leftMinImg} src={images.comment2}></img>
                    }
                </div>
                <div className={style.center}>
                    <div className={style.name}>轮子哥</div>
                    <div className={style.replay}>
                        <div className={style.replayContent}>肖志豪点赞了你的大屁股</div>
                        <div className={style.time}>2分钟前</div>
                    </div>
                </div>
                <div className={style.right}>
                    <img className={style.rightImg} src={images.testH1}></img>
                </div>
            </div>

            
        </div>
    )
}

import style from './ArticleDetail.module.scss'
import images from '../../resources'

const itemList = [
    { id: 1, image: images.test, name: "点赞" },
    { id: 1, image: images.test, name: "评论" },
    { id: 1, image: images.test, name: "转发" },
    { id: 1, image: images.test, name: "0" },
]

export default function ArticleDetail() {
    return (
        <div className={style.main}>

            <div className={style.info}>

                <div className={style.infoLeft}>
                    <img src={images.test} className={style.infoImage} alt="" />
                    <div className={style.infoText}>
                        <div className={style.infoLeftName}>轮子哥专业造轮子</div>
                        <div className={style.infoLeftTime}>1个月后发布</div>
                    </div>
                </div>

                <div className={style.infoRight}>关注</div>
            </div>

            <div className={style.message}>
                <div className={style.context}>
                    没想到吧，我就是爱坤，没想到吧，我就是爱坤，没想到吧，我就是爱坤，没想到吧，我就是爱坤
                    没想到吧，我就是爱坤，没想到吧，我就是爱坤，没想到吧，我就是爱坤，没想到吧，我就是爱坤
                    没想到吧，我就是爱坤，没想到吧，我就是爱坤，没想到吧，我就是爱坤，没想到吧，我就是爱坤
                    没想到吧，我就是爱坤，没想到吧，我就是爱坤，没想到吧，我就是爱坤，没想到吧，我就是爱坤
                    没想到吧，我就是爱坤，没想到吧，我就是爱坤，没想到吧，我就是爱坤，没想到吧，我就是爱坤
                    没想到吧，我就是爱坤，没想到吧，我就是爱坤，没想到吧，我就是爱坤，没想到吧，我就是爱坤
                </div>
            </div>

            <div className={style.items}>
                {
                    itemList.map((item) =>
                        <div className={style.item} key={item.id}>
                            <img src={item.image} className={style.itemImg} alt="" />
                            <div className={style.itemText}>{item.name}</div>
                        </div>
                    )
                }
            </div>

            <div className={style.foot}>评论(0)</div>

        </div>
    )
}

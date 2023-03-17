import images from '../resources'
import style from '../style/Home_center_2.module.scss'

/**
 * 轮子哥
 * 首页自定义列表块
 */

export default function Home_center_2() {
    return (
        <div className={style.Home_center_2}>
            <div className={style.left}>
                <div className={style.left_top}>
                    <div style={{width: "100%"}}>
                        <div className={style.left_top_title}>失物招领</div>
                        <div className={style.left_top_headImg}>
                            <img className={style.img1} src={images.boy}></img>
                            <img className={style.img2} src={images.girl}></img>
                            <img className={style.img3} src={images.boy}></img>
                            <img className={style.img4} src={images.girl}></img>
                        </div>
                    </div>
                    <img className={style.img5} src={images.lost_bg}></img>
                </div>
                <div className={style.left_bottom}>
                    2020人在寻找丢失物
                </div>
            </div>

            <div className={style.right}>

                <div className={style.left_top}>
                    <div style={{width: "100%"}}>
                        <div className={style.left_top_title}>闲置出售</div>
                        <div className={style.left_top_headImg}>
                            <img className={style.img1} src={images.girl}></img>
                            <img className={style.img2} src={images.boy}></img>
                            <img className={style.img3} src={images.girl}></img>
                            <img className={style.img4} src={images.girl}></img>
                        </div>
                    </div>
                    <img  className={style.img5} src={images.sell_bg}></img>
                </div>
                <div className={style.right_bottom}>
                    2023人在出售闲置物品
                </div>
            </div>

        </div>
    )
}

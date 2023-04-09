import images from '../../resources'
import style from './Article.module.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
/**
 * 轮子哥
 * 帖子自定义组件
 */

export default function Article() {
    const navigate = useNavigate();
    const articleData:any = useSelector((state:any) => state.Home_Reducer_State.article)

    return (
        <div className={style.Article + " Article"}>
            <div className={style.Article_top}>
                <div className={style.Article_top_left}>
                    <div className={style.Article_top_head}><img className={style.Article_top_headImg} src={images.boy} alt='' /></div>
                    <div className={style.Article_top_headleft}>
                        <div className={style.Article_top_name} onClick={()=>{console.log(articleData)}}>轮子哥</div>
                        <div className={style.Article_top_time}>1小时前</div>
                    </div>
                </div>
                <div className={style.Article_top_right}><img className={style.Article_top_rightImg} src={images.more} alt='' /></div>
            </div>

            <div className={style.Article_context} onClick={()=>{navigate("/articleDetail");}}>
                <div className={style.Article_context_title}>
                    这是一个标题《造轮子专业户》
                </div>
                <div className={style.Article_context_contain}>
                    我们不是大自然的搬运工,我们采用长白山最秃头的轮子道长亲自开过光的键盘,用富含多种灰尘的老cpu,独具匠心只为造好轮子，你放心我也放心！
                </div>
            </div>
            <div className={style.Article_bottom}>
                <img className={style.Article_bottomImg} src={images.love_2} alt='' />
                <div className={style.Article_bottom_text}>666</div>
                <img className={style.Article_bottomImg} src={images.comment} alt='' />
                <div className={style.Article_bottom_text}>32</div>
            </div>
        </div>
    )
}


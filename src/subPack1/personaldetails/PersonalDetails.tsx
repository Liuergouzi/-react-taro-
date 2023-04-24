import style from './PersonalDetails.module.scss'
import images from '../../resources'
import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar'
import { Tag } from '@antmjs/vantui'
import Taro from '@tarojs/taro'
import TabsArticleLoadMore from '../../component/ariticle/TabsArticleLoadMore'
import { useNavigate } from 'react-router-dom'

export default function PersonalDetails() {

    const navigate = useNavigate();
    
    const parView=(imgUrl)=>{
        Taro.previewImage({
            current: imgUrl, // 当前显示图片的http链接
            urls: [imgUrl] // 需要预览的图片http链接列表
          })
    }

    const goChat=(item)=>{
        // Taro.setStorageSync('setChatItemClick', { id: item.otherId, head: item.head, name: item.name })
        navigate("/chat");
    }

    return (
        <div>
            <TopMostTaroNavigationBar needBackIcon={true} mainTitle={'个人详情'} />
            <div className={style.top}>
                <div className={style.topHead}>
                    <img className={style.topHeadImg} src={images.testH1} onClick={()=>parView(images.testH1)}></img>
                    <div className={style.topChat} onClick={()=>{goChat("")}}>私聊</div>
                </div>
                <div className={style.topHeadBottom}>
                    <div className={style.topName}>轮子哥</div>
                    <div className={style.topList}>
                    <div className={style.topItem}>
                        <div>粉丝&emsp;</div>
                        <div>0</div>
                    </div>
                    <div className={style.topItem}>
                        <div>获赞&emsp;</div>
                        <div>0</div>
                    </div>
                </div>
                </div>
                <div className={style.topTag}>
                    <Tag className={style.tag}>
                        2023级
                    </Tag>
                    <Tag className={style.tag1}>
                        被举报有效次数：0
                    </Tag>
                    <Tag className={style.tag2}>
                        简单介绍一下你自己吧！如：作为一名真正的爱坤，我们并没有爱坤口号，而是爱在心里！
                    </Tag>
                    <Tag className={style.tag2}>
                        性别:沃尔玛购物袋
                    </Tag>
                    <Tag className={style.tag3}>
                        地区：广东-潮州
                    </Tag>
                </div>

            </div>
            <TabsArticleLoadMore/>
        </div>
    )
}

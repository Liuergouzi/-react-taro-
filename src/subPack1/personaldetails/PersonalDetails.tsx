import style from './PersonalDetails.module.scss'
import images from '../../resources'
import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar'
import { Tab, Tabs, Tag, Toast } from '@antmjs/vantui'

export default function PersonalDetails() {

    TopMostTaroNavigationBar({ title: "", frontColor: '#ffffff', backgroundColor: '#ffffff' })
    // console.log(process.env.TARO_ENV)

    return (
        <div>
            <div className={style.top}>
                <div className={style.topHead}>
                    <img className={style.topHeadImg} src={images.testH1}></img>
                    <div className={style.topChat}>私聊</div>
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
            <Tabs
                active={"1"}
                sticky={true}
                animated
                // swipeable
                lineWidth={'30px'}
                titleActiveColor="#8BD1AE"
                onChange={(e) =>
                    Toast.show({
                        message: e.detail.name,
                        selector: '#tabs-toast2',
                    })
                }>
                <Tab title="帖子" name="1">
                    
                </Tab>
                <Tab title="求助" name="2">
                    
                </Tab>
                <Tab title="闲置" name="3">
                    
                </Tab>
                <Tab title="表白" name="4">
                    
                </Tab>
                <Toast id="tabs-toast2" />
            </Tabs>

        </div>
    )
}

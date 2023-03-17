
import style from '../style/Announcement.module.scss'
import images from '../resources'
import Carousels, { CarouselItem, CarouselInfo } from "./Carousel";

/**
 * 轮子哥
 * 轮播图&&公告
 */

// 轮播图数据
const info = [
    {
        id: 1,
        image: "https://img2.baidu.com/it/u=138111414,3014715895&fm=253&fmt=auto&app=138&f=JPEG?w=1000&h=300",
        title: "岐王李茂贞",
        content: "轮子哥测试文本内容轮子哥测试文本内容轮子哥测试文本内容"
    },
    {
        id: 2,
        image: "https://img1.baidu.com/it/u=652481803,1746310969&fm=253&fmt=auto&app=138&f=JPEG?w=1000&h=300",
        title: "我们的船长可是要立志成为【海王】的男人",
        content: "轮子哥测试文本内容轮子哥测试文本内容轮子哥测试文本内容"
    },
    {
        id: 3,
        image: "https://img0.baidu.com/it/u=84299672,3744735177&fm=253&fmt=auto&app=138&f=JPEG?w=1000&h=300",
        title: "魁拔！魁拔！",
        content: "轮子哥测试文本内容轮子哥测试文本内容轮子哥测试文本内容"
    },
    {
        id: 4,
        image: "https://img2.baidu.com/it/u=1544206047,4026750196&fm=253&fmt=auto&app=138&f=JPEG?w=1000&h=300",
        title: "我白小纯，果真是天道之人",
        content: "轮子哥测试文本内容轮子哥测试文本内容轮子哥测试文本内容"
    },

];

const announcementValue="轮子哥通知测试轮子哥通知测试轮子哥通知测试轮子哥通知测试轮子哥通知测试"

export default function Carousel() {

    return (
        <div className={style.Carousel}>


            <Carousels switchingTime={5000} width="auto" height="8rem">
                {info?.map((item) => {
                    return (
                        <CarouselItem key={item.id}>
                            <CarouselInfo image={item.image} title={item.title} content={item.content} />
                        </CarouselItem>
                    );
                })}
            </Carousels>

            <div className={style.announcement}>
                    <div className={style.announcementImgDiv}><img src={images.announcement} className={style.announcementImg}></img></div>
                    <div className={style.announcementText}>公告</div>
                    {/* <AtNoticebar  marquee className={style.announcementNoticebar}> */}
                        {announcementValue}
                    {/* </AtNoticebar> */}
                    <div className={style.announcementNull}></div>
            </div>

        </div>
    )
}

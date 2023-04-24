import style from './CommentLoadMore.module.scss'
import LoadMore from "../../component/loadmore/LoadMore";
import { useSelector } from 'react-redux';
import Taro from '@tarojs/taro';
import { Image } from '@antmjs/vantui'
import images from '../../resources';
import { useRef, useState } from 'react';

export default function CommentLoadMore(props) {

    const CommentlList: any = useSelector((state: any) => state.Comment_Reducer.commentList)
    const pageIndex: number = useSelector((state: any) => state.Comment_Reducer.pageIndex);
    const pageSize = 15;

    const inputDom:any=useRef()
    const [messageText, setMessageText] = useState("")
    const [inputButtom, setInputButtom] = useState(0)
    const [inputTip,setInputTip]=useState("说两句?")
    const [replayName,setReplayName]=useState("")

    const parView = (imgUrl) => {
        Taro.previewImage({
            current: imgUrl, 
            urls: [imgUrl] 
        })
    }

    const replayClick=(userName)=>{
        setInputTip("回复"+userName)
        setReplayName(userName)
        inputDom.current.focus()
    }

    const sendText = () => {
        // if (isRequestFinsh) {
        //     setIsRequestFinsh(false)
        //     Taro.request({
        //         url: reUrl.loveArticleDislay,
        //         method: 'POST',
        //         data: {
        //             // _id: item._id,
        //             // userId: item.userId
        //         },
        //         header: { 'content-type': 'application/x-www-form-urlencoded' },
        //         success: function () { setIsRequestFinsh(true) },
        //         fail: function () { setIsRequestFinsh(true) }
        //     })
        // }
    }

    return (
        <div>
            <LoadMore
                requesUrl={'getSysNotice'}
                viewId={'Comment'}
                ListCount={CommentlList.length}
                defaultListCount={0}
                // height={(Taro.getWindowInfo().screenHeight) / 1.4 + 'px'}
                marginBottom={"50px"}
                requestData={{
                    id: props.id,
                    pageIndex: pageIndex,
                    pageSize: pageSize
                }}>
                {
                    CommentlList.map((item) =>
                        <div className={style.commentItem}>
                            <div className={style.mainComment}>
                                <img fade-in className={style.userHeadImg} src={item.userHeadImg}></img>
                                <div className={style.others} onClick={()=>{replayClick(item.userName)}} >
                                    <div className={style.userName}>{item.userName}</div>
                                    {
                                        item.type == "text" ? <div className={style.content}>{item.comment}</div> :
                                            <Image
                                                width="100px"
                                                height="auto"
                                                fit="widthFix"
                                                onClick={() => parView(item.comment)}
                                                src={item.comment}></Image>
                                    }
                                    <div className={style.commentButtom}>
                                        <div>{item.time}&emsp;&emsp;回复</div>
                                        <div className={style.loveDiv}>
                                            <img src={images.love_2} className={style.commentLoveImg}></img>
                                            <div>{item.loveCount}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                item.subCommentList.map((subItem) =>
                                    <div className={style.subComment}>
                                        <img fade-in className={style.userHeadImg} src={subItem.userHeadImg}></img>
                                        <div className={style.others} onClick={()=>{replayClick(subItem.userName)}}>
                                            <div className={style.userName}>{subItem.userName}&ensp; 回复 &ensp;{subItem.replyUserName}</div>
                                            {
                                                subItem.type == "text" ? <div className={style.content}>{subItem.comment}</div> :
                                                    <Image
                                                        width="100px"
                                                        height="auto"
                                                        fit="widthFix"
                                                        onClick={() => parView(subItem.comment)}
                                                        src={subItem.comment}></Image>
                                            }
                                            <div className={style.commentButtom}>
                                                <div>{subItem.time}&emsp;&emsp;回复</div>
                                                <div className={style.loveDiv}>
                                                    <img src={images.love_2} className={style.commentLoveImg}></img>
                                                    <div>{subItem.loveCount}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </LoadMore>

            <div className={style.chatBottom} style={{ bottom: inputButtom + 'px' }}>
                    <div className={style.chatBottomDiv}>
                        <div className={style.bottomLeft}>
                            <img src={images.picture} className={style.bottomImg} onClick={() => { }} />
                        </div>
                        <div className={style.inputDiv} >
                            <input className={style.bottomInput}  ref={inputDom} placeholder={inputTip} 
                                adjust-position={false}
                                onFocus={(e: any) => { e.detail.height && setInputButtom(e.detail.height) }}
                                onBlur={() => { setInputButtom(0);setInputTip("说两句?");setReplayName("") }}
                                value={messageText} onChange={(e: any) => setMessageText(e.detail.value)} />
                        </div>
                        <div className={style.bottomRight}>
                            <img src={images.emote} className={style.bottomImg} />
                            <div className={style.bottomButton} onClick={() => { sendText() }}>发送</div>
                        </div>
                    </div>
                </div>

        </div>
    )
}

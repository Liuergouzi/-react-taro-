import style from './CommentLoadMore.module.scss'
import LoadMore from "../../component/loadmore/LoadMore";
import { useDispatch, useSelector } from 'react-redux';
import Taro from '@tarojs/taro';
import { Button, Image } from '@antmjs/vantui'
import images from '../../resources';
import { useRef, useState } from 'react';
import netRequest from '../../http/http';
import { setCommentListAll } from '../../sclice/Comment_Sclice'
import time from '../../tool/time';
import re from '../../requestUrl';
import time2 from '../../tool/time2';
import netRequestTextCheck from '../../http/httpTextCheck';
import netRequestImageCheck from '../../http/httpImageCheck';

export default function CommentLoadMore(props) {
    const userId = props.userId
    let CommentlList: any = useSelector((state: any) => state.Comment_Reducer.commentList)
    const pageIndex: number = useSelector((state: any) => state.Comment_Reducer.pageIndex);
    const pageSize = 15;
    const dispatch: any = useDispatch()
    const inputDom: any = useRef()
    const [inputButtom, setInputButtom] = useState(0)
    const [replayClickData, setReplayClickData] = useState({
        inputTip: "发表你的一些观点吧",
        replayName: "",
        replayId: "",
        replayUserId: "",
        index: -1,
        subIndex: -1
    })

    const [inputValue, setInpValue] = useState("")
    const [isRequestFinsh, setIsRequestFinsh] = useState(true)
    const [displaySub, setDisplaySub]: any = useState([])

    const parView = (imgUrl) => {
        Taro.previewImage({
            current: imgUrl,
            urls: [imgUrl]
        })
    }

    const getSubComment = (item, index) => {
        if (isRequestFinsh) {
            setIsRequestFinsh(false)
            setDisplaySub((displaySub) => [...displaySub, String(index) + "first"])
            netRequest({
                movementId: item.movementId,
                faId: item.id,
                pageIndex: 0,
                pageSize: 15
            }, 'getSubCommentList', 'POST', 0)
                .then((res) => {
                    let temp = JSON.parse(JSON.stringify(CommentlList))
                    temp[index].subCommentList = res.data.data
                    if (res.data.data.length < 15) {
                        setDisplaySub((displaySub) => [...displaySub, String(index) + "second"])
                        console.log(displaySub)
                    }
                    setIsRequestFinsh(true)
                    dispatch(setCommentListAll(temp))
                })
                .catch(() => {
                    setIsRequestFinsh(true)
                })
        }
    }

    const replayClick = (userName, id, userId, index, subIndex) => {
        setInpValue("")
        setReplayClickData({
            inputTip: "回复" + userName,
            replayName: userName,
            replayId: id,
            replayUserId: userId,
            index: index,
            subIndex: subIndex
        })
        inputDom.current.focus()
    }

    const sendImg = () => {
        Taro.chooseImage({
            count: 1,
            success(ress) {
                const tempFilePaths = ress.tempFilePaths
                Taro.showLoading({ title: '正在加载中...' })
                Taro.uploadFile({
                    url: re('imageCheck'),
                    filePath: tempFilePaths[0],
                    name: 'media',
                    formData: {
                        'imgUrlName': "comment/" + time2 + "-" + "userId=" + Taro.getStorageSync("userId") + ".png"
                    },
                    success(res: any) {
                        console.log(JSON.stringify(res))
                        const returns = JSON.parse(res.data)
                        if (returns.hasOwnProperty("code")) {
                            if (returns.code == 200) {
                                sendText("image", returns.url)
                                // netRequestImageCheck(returns.url).then((res)=>{console.log(JSON.stringify(res))}).catch((res)=>{console.log(JSON.stringify(res))})
                            }
                        }
                        Taro.hideLoading()
                    },
                    fail() {
                        Taro.hideLoading()
                    }
                })
            }
        })
    }

    const sendText = (type, url) => {
        var comments;
        if (url == "") {
            comments = inputValue
        } else {
            comments = url
        }
        if (isRequestFinsh && comments != "") {
            setIsRequestFinsh(false)
            if (replayClickData.replayName == "") {
                netRequestTextCheck(JSON.stringify(comments)).then(() => {
                    netRequest({
                        movementId: props.id,
                        otherId: Taro.getStorageSync("userId"),
                        receiveId: replayClickData.replayUserId != "" ? replayClickData.replayUserId : userId,
                        title: Taro.getStorageSync("user").nickname + "评论了你",
                        comment: comments,
                        type: type,
                        time: time
                    }, 'insertArticleComment', 'POST', 0)
                        .then((res) => {
                            let temp = JSON.parse(JSON.stringify(CommentlList))
                            console.log(res.data.data)
                            temp = [{
                                "id": res.data.data,
                                "movementId": props.id,
                                "faId": null,
                                "replyName": null,
                                "userId": Taro.getStorageSync("userId"),
                                "name": Taro.getStorageSync("user").nickname,
                                "head": Taro.getStorageSync("user").avatar,
                                "comment": comments,
                                "time": time,
                                "type": type,
                                "loveCount": 0,
                                "subCommentCount": 0,
                                "state": 0,
                                "subCommentList": null
                            }, ...CommentlList]
                            dispatch(setCommentListAll(temp))
                            setInpValue("")
                            setIsRequestFinsh(true)
                        })
                        .catch(() => {
                            setIsRequestFinsh(true)
                        })
                }).catch(() => {
                    setIsRequestFinsh(true)
                })
            } else {
                netRequestTextCheck(JSON.stringify(comments)).then(() => {
                    netRequest({
                        movementId: props.id,
                        faId: replayClickData.replayId,
                        replyName: replayClickData.replayName,
                        otherId: Taro.getStorageSync("userId"),
                        receiveId: replayClickData.replayUserId != "" ? replayClickData.replayUserId : userId,
                        title: Taro.getStorageSync("user").nickname + "回复了你",
                        comment: comments,
                        type: type,
                        time: time
                    }, 'replyArticleComment', 'POST', 0)
                        .then((res) => {
                            let temp = JSON.parse(JSON.stringify(CommentlList))
                            if (temp[replayClickData.index].subCommentList != null) {
                                temp[replayClickData.index].subCommentList = [{
                                    "id": res.data.data,
                                    "movementId": props.id,
                                    "faId": replayClickData.replayId,
                                    "replyName": replayClickData.replayName,
                                    "userId": Taro.getStorageSync("userId"),
                                    "name": Taro.getStorageSync("user").nickname,
                                    "head": Taro.getStorageSync("user").avatar,
                                    "comment": comments,
                                    "time": time,
                                    "type": type,
                                    "loveCount": 0,
                                    "subCommentCount": 0,
                                    "state": 0,
                                    "subCommentList": null
                                }, ...temp[replayClickData.index].subCommentList]
                            } else {
                                temp[replayClickData.index].subCommentList = [{
                                    "id": "xxx",
                                    "movementId": props.id,
                                    "faId": replayClickData.replayId,
                                    "replyName": replayClickData.replayName,
                                    "userId": Taro.getStorageSync("userId"),
                                    "name": Taro.getStorageSync("user").nickname,
                                    "head": Taro.getStorageSync("user").avatar,
                                    "comment": comments,
                                    "time": time,
                                    "type": type,
                                    "loveCount": 0,
                                    "subCommentCount": 0,
                                    "state": 0,
                                    "subCommentList": null
                                }]
                            }
                            dispatch(setCommentListAll(temp))
                            setInpValue("")
                            setIsRequestFinsh(true)
                        })
                        .catch(() => {
                            setIsRequestFinsh(true)
                        })
                }).catch(() => {
                    setIsRequestFinsh(true)
                })
            }
        }
    }

    const deleteComment = (item, index, subindex, bool) => {
        if (isRequestFinsh) {
            setIsRequestFinsh(false)
            let temp = JSON.parse(JSON.stringify(CommentlList))
            if (bool) {
                temp.splice(index, 1)
            } else {
                temp[index].subCommentList.splice(subindex, 1)
            }
            dispatch(setCommentListAll(temp))
            netRequest({
                movementId: props.id,
                _id: item.id,
                isSub: !bool,
                faId: item.faId
            }, 'deleteArticleComment', 'POST', 0)
                .then(() => {
                    setIsRequestFinsh(true)
                })
                .catch(() => {
                    setIsRequestFinsh(true)
                })
        }
    }

    const loveClick = (item, index, subIndex, bool) => {
        if (isRequestFinsh) {
            setIsRequestFinsh(false)
            if (Taro.getStorageSync(item.id) != ("")) {
                Taro.removeStorageSync(item.id)
                let temp = JSON.parse(JSON.stringify(CommentlList))
                if (bool) {
                    temp[index].loveCount = temp[index].loveCount - 1
                } else {
                    temp[index].subCommentList[subIndex].loveCount = temp[index].subCommentList[subIndex].loveCount - 1
                }
                dispatch(setCommentListAll(temp))
                netRequest({
                    _id: item.id
                }, 'cancelLoveArticleComment', 'POST', 0)
                    .then(() => {
                        setIsRequestFinsh(true)
                    })
                    .catch(() => {
                        setIsRequestFinsh(true)
                    })
            } else {
                let temp = JSON.parse(JSON.stringify(CommentlList))
                if (bool) {
                    temp[index].loveCount = temp[index].loveCount + 1
                } else {
                    temp[index].subCommentList[subIndex].loveCount = temp[index].subCommentList[subIndex].loveCount + 1
                }
                dispatch(setCommentListAll(temp))
                Taro.setStorageSync(item.id, 1)
                netRequest({
                    _id: item.id
                }, 'loveArticleComment', 'POST', 0)
                    .then(() => {
                        setIsRequestFinsh(true)
                    })
                    .catch(() => {
                        setIsRequestFinsh(true)
                    })
            }
        }
    }

    return (
        <div>
            <LoadMore
                requesUrl={'getArticleCommentAll'}
                viewId={'Comment'}
                ListCount={CommentlList.length}
                defaultListCount={0}
                isLeaveClear
                marginBottom={"50px"}
                requestData={{
                    _id: props.id,
                    pageIndex: pageIndex,
                    pageSize: pageSize
                }}>
                {
                    CommentlList.map((item, index) =>
                        <div className={style.commentItem}>
                            <div className={style.mainComment}>
                                <img fade-in className={style.userHeadImg} src={item.head}></img>
                                <div className={style.others} >
                                    <div className={style.userName}>{item.name}</div>
                                    {
                                        item.type == "text" ?
                                            <div className={style.content} onClick={() => { replayClick(item.name, item.id, item.userId, index, 0) }}>{item.comment}</div> :
                                            <Image
                                                width="100px"
                                                height="auto"
                                                fit="widthFix"
                                                onClick={() => parView(item.comment)}
                                                src={item.comment}></Image>
                                    }
                                    <div className={style.commentButtom}>
                                        <div onClick={() => { replayClick(item.name, item.id, item.userId, index, 0) }}>{item.time}&emsp;&emsp;回复</div>
                                        {
                                            item.userId == Taro.getStorageSync("userId") && <div onClick={() => { deleteComment(item, index, -1, true) }}>&emsp;删除</div>
                                        }
                                        <div className={style.loveDiv}>
                                            <img onClick={() => loveClick(item, index, -1, true)} src={Taro.getStorageSync(item.id) != ("") ? images.love_1 : images.love_2} className={style.commentLoveImg}></img>
                                            <div>{item.loveCount}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                item.subCommentList != null && item.subCommentList.map((subItem, subIndex) =>
                                    <div className={style.subComment}>
                                        <img fade-in className={style.userHeadImg} src={subItem.head}></img>
                                        <div className={style.others}>
                                            <div className={style.userName}>{subItem.name}&ensp; 回复 &ensp;{subItem.replyName}</div>
                                            {
                                                subItem.type == "text" ?
                                                    <div className={style.content} onClick={() => { replayClick(subItem.name, subItem.id, item.userId, index, subIndex) }}>{subItem.comment}</div> :
                                                    <Image
                                                        width="100px"
                                                        height="auto"
                                                        fit="widthFix"
                                                        onClick={() => parView(subItem.comment)}
                                                        src={subItem.comment}></Image>
                                            }
                                            <div className={style.commentButtom}>
                                                <div onClick={() => { replayClick(subItem.name, subItem.id, item.userId, index, subIndex) }}>{subItem.time}&emsp;回复</div>
                                                {
                                                    subItem.userId == Taro.getStorageSync("userId") && <div onClick={() => { deleteComment(subItem, index, subIndex, false) }}>&emsp;删除</div>
                                                }
                                                <div className={style.subLoveDiv}>
                                                    <img onClick={() => loveClick(item, index, subIndex, false)} src={Taro.getStorageSync(subItem.id) != ("") ? images.love_1 : images.love_2} className={style.commentLoveImg}></img>
                                                    <div>{subItem.loveCount}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                item.subCommentCount > 0 ?
                                    displaySub.includes(String(index) + "first") ?
                                        displaySub.includes(String(index) + "second") ?
                                            <div className={style.displayLine}>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;没有更多了</div>
                                            :
                                            <div className={style.displayLine} onClick={() => { getSubComment(item, index) }}>——展开更多</div>
                                        :
                                        <div className={style.displayLine} onClick={() => { getSubComment(item, index) }}>——展开{item.subCommentCount}条回复∨</div>
                                    :
                                    null
                            }
                        </div>
                    )
                }
            </LoadMore>

            <div className={style.chatBottom} style={{ bottom: inputButtom + 'px' }}>
                <div className={style.chatBottomDiv}>
                    <div className={style.bottomLeft}>
                        <img src={images.picture} className={style.bottomImg} onClick={() => { sendImg() }} />
                    </div>
                    <div className={style.inputDiv} >
                        <input className={style.bottomInput} ref={inputDom} placeholder={replayClickData.inputTip}
                            adjust-position={false}
                            value={inputValue}
                            onFocus={(e: any) => { e.detail.height && setInputButtom(e.detail.height) }}
                            onBlur={(e: any) => { setInputButtom(0); setInpValue(e.detail.value) }} />
                    </div>
                    <div className={style.bottomRight}>
                        <img src={images.emote} className={style.bottomImg} />
                        <Button loading={!isRequestFinsh} className={style.bottomButton} onClick={() => { sendText("text", "") }}>发送</Button>
                        {
                            replayClickData.replayName == "" ? null :
                                <div className={style.canReplay} onClick={() => {
                                    setReplayClickData({
                                        inputTip: "发表你的一些观点吧",
                                        replayName: "",
                                        replayId: "",
                                        replayUserId: "",
                                        index: -1,
                                        subIndex: -1
                                    })
                                    setInpValue("")
                                }}>取消</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


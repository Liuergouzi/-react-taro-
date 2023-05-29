import Push_textarea from './Push_textarea'
import Push_UploadImg from './Push_UploadImg';
import Push_tags from './Push_tags';
import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar';
import { useDispatch, useSelector } from 'react-redux'
import itemList from '../../itemList'
import { Button, Switch } from '@antmjs/vantui'
import style from './Push.module.scss'
import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro';
import time from '../../tool/time';
import netRequest from '../../http/http';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearAll, setAll } from '../../sclice/Push_Sclice'
import netRequestTextCheck from '../../http/httpTextCheck';

export default function Push() {

    const navigate = useNavigate();
    const dispatch: any = useDispatch()

    const params = useLocation()
    const updateArticle: any = Taro.getStorageSync("updateArticle")
    var isUpdate: boolean
    params.search != "" && updateArticle != "" ? isUpdate = true : isUpdate = false

    useEffect(() => {
        if (isUpdate) {
            dispatch(setAll({
                tagId: itemList.Home_bottom_list.filter((e) => e.name == updateArticle.type)[0].id,
                title: { titleData: updateArticle.title, titleLen: 50 - updateArticle.title.length },
                content: { contentData: updateArticle.content, contentLen: 500 - updateArticle.content.length },
                imageList: updateArticle.imageList
            }))
        }
        return () => {
            dispatch(clearAll())
        }
    }, [])


    const selectId: any = useSelector((state: any) => state.Push_Sclice.tagId)
    const title: any = useSelector((state: any) => state.Push_Sclice.title.titleData)
    const content: any = useSelector((state: any) => state.Push_Sclice.content.contentData)
    const imageList: any = useSelector((state: any) => state.Push_Sclice.imageList.upList)
    const tagName: Array<any> = itemList.Home_bottom_list.filter((e) => e.id == selectId)
    const [isRequestFinsh, setIsRequestFinsh] = useState(true)
    const [value, setValue] = useState(false)


    const push = () => {
        const textLength = title + content

        if (title != "" && content != "" && selectId != -1) {
            if (textLength.length <= 5) {
                Taro.showModal({
                    title: '发布失败',
                    content: "低质量帖子",
                })
            } else {
                const requestData = {
                    userId: Taro.getStorageSync("userId"),
                    title: title, content: content, time: time, type: tagName[0].name, imageList: imageList
                }
                const requestData2 = {
                    id: updateArticle.id, userId: Taro.getStorageSync("userId"),
                    title: title, content: content, time: time, type: tagName[0].name, imageList: imageList
                }
                if (isRequestFinsh) {
                    setIsRequestFinsh(false)
                    if (isUpdate) {
                        netRequestTextCheck(JSON.stringify(requestData2)).then(() => {
                            netRequest(requestData2, 'updateArticleDisplayList', 'POST', 0)
                                .then(() => {
                                    Taro.showToast({
                                        title: '修改成功',
                                        icon: 'success',
                                        duration: 2000
                                    })
                                    dispatch(clearAll())
                                    setIsRequestFinsh(true)
                                    navigate(-1)
                                })
                                .catch(() => {
                                    setIsRequestFinsh(true)
                                })
                        }).catch(() => {
                            setIsRequestFinsh(true)
                        })
                    } else {
                        netRequestTextCheck(JSON.stringify(requestData)).then(() => {
                            netRequest(requestData, 'insertArticleDisplayList', 'POST', 0)
                                .then(() => {
                                    Taro.showToast({
                                        title: '发布成功',
                                        icon: 'success',
                                        duration: 2000
                                    })
                                    dispatch(clearAll())
                                    setIsRequestFinsh(true)
                                    navigate(-1)
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
        } else {
            Taro.showModal({
                title: '发布失败',
                content: "标题、内容、类型不能为空",
            })
        }

    }

    return (
        <div>
            <TopMostTaroNavigationBar needBackIcon={true} mainTitle={isUpdate ? '修改帖子' : '发布'} />
            <Push_tags />
            <Push_textarea />
            <Push_UploadImg />
            <div className={style.pushBottom}>
                <div className={style.selectDiv}>
                    <div className={style.tagDiv}>
                        已选类型：
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
                            disabled
                            onChange={(e) => setValue(e.detail)} />
                    </div>
                </div>
                <Button className={style.loginButton} loading={!isRequestFinsh} type="info" loadingText="发布中..." onClick={() => push()}>{isUpdate ? "修改" : "发布"}</Button>
            </div>
        </div>
    )
}
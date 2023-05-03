import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar'
import style from './SearchView.module.scss'
import { Search, Tag } from '@antmjs/vantui'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import ArticleLoadMore from '../../component/ariticle/ArticleLoadMore'


export default function SearchView() {

    const [value, setValue] = useState('')
    const [searchList, setSearchList] = useState([...Taro.getStorageSync("searchList")])
    const [isSearch, setIsSearch] = useState(false)

    const searchAction = () => {
        setIsSearch(!isSearch)
        let searchLists = Taro.getStorageSync("searchList")
        var isHave = false
        if (searchLists.length == 0) {
            Taro.setStorageSync("searchList", [{ value: value }])
            setSearchList([{ value: value }])
        }
        if (searchLists.length > 0 && searchLists.length <= 20) {
            searchLists.forEach(element => {
                if (element.value == value) {
                    isHave = true
                }
            });
            if (!isHave) {
                Taro.setStorageSync("searchList", [{ value: value }, ...searchLists])
                setSearchList([{ value: value }, ...searchLists])
            } else {
                //重新排序
                var newTemp = [{ value: value }] as any[]
                searchList.forEach(item => (item.value != value && newTemp.push(item)))
                setSearchList(newTemp)
            }
        }
        if (searchLists.length > 20) {
            var newTemp = searchLists as any[]
            newTemp.pop()
            Taro.setStorageSync("searchList", [{ value: value }, ...newTemp])
            setSearchList([{ value: value }, ...newTemp])
        }

    }

    const closeSearchList = (values) => {
        var newTemp = [] as any[]
        searchList.forEach(item => (item.value != values && newTemp.push(item)))
        setSearchList(newTemp)
        Taro.setStorageSync("searchList", newTemp)
    }

    const clearSearchList = () => {
        setSearchList([])
        Taro.removeStorageSync("searchList")
    }


    return (
        <div>
            <TopMostTaroNavigationBar needBackIcon={true} mainTitle={'搜索'} />
            <Search
                onBlur={(e) => setValue(e.detail)}
                value={value}
                placeholder="请输入搜索关键词"
                renderAction={<div onClick={searchAction}>{isSearch?'取消':'搜索'}</div>}
            />
            {
                !isSearch ?
                    <div className={style.history}>
                        <div className={style.historyTop}>
                            <div>搜索历史</div>
                            <div className={style.clear} onClick={() => { clearSearchList() }}>全部清空</div>
                        </div>
                        <div className={style.historyTag}>
                            {
                                searchList.length <= 20 ?
                                    searchList.map((item) => (
                                        <Tag
                                            className={style.tags}
                                            type="primary"
                                            size="medium"
                                            closeable
                                            onClick={()=>{setValue(item.value)}}
                                            onClose={() => closeSearchList(item.value)}
                                        >
                                            {item.value}
                                        </Tag>
                                    ))
                                    :
                                    <div>
                                        {
                                            searchList.map((item) => (
                                                <Tag
                                                    className={style.tags}
                                                    type="primary"
                                                    size="medium"
                                                    closeable
                                                    onClick={()=>{setValue(item.value)}}
                                                    onClose={() => closeSearchList(item.value)}
                                                >
                                                    {item.value}
                                                </Tag>
                                            ))
                                        }
                                        <div className={style.moreTip}>最多显示20条历史记录，超出部分已自动删除</div>
                                    </div>
                            }
                        </div>
                    </div>
                    :
                    <ArticleLoadMore requesUrl={'searchArticleDisplay'}
                    requestData={{ search: value, pageSize: 15, pageIndex: 0 }} />
            }
        </div>
    )
}

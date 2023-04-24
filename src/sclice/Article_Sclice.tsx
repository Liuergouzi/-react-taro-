import { createSlice } from '@reduxjs/toolkit'
import itemList from '../itemList'
/**
 * 轮子哥
 * 普通帖子数据交互切片
 */

export const Article_Sclice = createSlice({
    name: '系统模块全局状态传参管理',
    initialState: {
        articleList: [...itemList.articleDislayList],
        pageIndex: 0,
    },
    reducers: {
        setArticleList: (state: any, action) => {
            state.articleList = [...state.articleList, ...action.payload]
        },
        clearArticleList: (state: any) => {
            state.articleList = [...itemList.articleDislayList]
        },
        setArticlePageIndex: (state: any) => {
            state.pageIndex = state.pageIndex + 1
        },
        clearArticlePageIndex: (state: any) => {
            state.pageIndex = 0
        },
        setArticleListAll: (state: any, action) => {
            state.articleList = [...action.payload]
        },
        addLove: (state: any, action) => {
            let temp = state.articleList
            temp.forEach(element => {
                if (element._id == action.payload._id) {
                    element.love = element.loveCount + 1
                }
            });
            state.articleList = [...temp]
        },
        reduceLove: (state: any, action) => {
            let temp = state.articleList
            temp.forEach(element => {
                if (element._id == action.payload._id) {
                    element.love = element.loveCount - 1
                }
            });
            state.articleList = [...temp]
        },
        addComment: (state: any, action) => {
            let temp = state.articleList
            temp.forEach(element => {
                if (element._id == action.payload._id) {
                    element.commentCount = element.commentCount + 1
                }
            });
            state.articleList = [...temp]
        },
        reduceComment: (state: any, action) => {
            let temp = state.articleList
            temp.forEach(element => {
                if (element._id == action.payload._id) {
                    element.commentCount = element.commentCount + 1
                }
            });
            state.articleList = [...temp]
        },
        addShare: (state: any, action) => {
            let temp = state.articleList
            temp.forEach(element => {
                if (element._id == action.payload._id) {
                    element.shareCount = element.shareCount + 1
                }
            });
            state.articleList = [...temp]
        },
        reduceShare: (state: any, action) => {
            let temp = state.articleList
            temp.forEach(element => {
                if (element._id == action.payload._id) {
                    element.shareCount = element.shareCount + 1
                }
            });
            state.articleList = [...temp]
        }
    }
})

export const { setArticleList, clearArticleList, setArticlePageIndex, clearArticlePageIndex, setArticleListAll,
    addLove, reduceLove,addComment,reduceComment,addShare,reduceShare
} = Article_Sclice.actions

export default Article_Sclice.reducer
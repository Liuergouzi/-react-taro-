import { createSlice } from '@reduxjs/toolkit'
import itemList from '../itemList'
/**
 * 轮子哥
 * 评论模块数据交互切片
 */

export const Comment_Sclice = createSlice({
    name: '系统模块全局状态传参管理',
    initialState: {
        commentList: [...itemList.articleComment],
        pageIndex: 0,
    },
    reducers: {
        setCommentList: (state: any, action) => {
            state.commentList = [...state.commentList, ...action.payload]
        },
        clearCommentList: (state: any) => {
            state.commentList = [...itemList.articleComment]
        },
        setCommentPageIndex: (state: any) => {
            state.pageIndex = state.pageIndex + 1
        },
        clearCommentPageIndex: (state: any) => {
            state.pageIndex = 0
        },
    }
})

export const { setCommentList,clearCommentList,setCommentPageIndex,clearCommentPageIndex} = Comment_Sclice.actions

export default Comment_Sclice.reducer
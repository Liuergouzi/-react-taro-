import { createSlice } from '@reduxjs/toolkit'

/**
 * 轮子哥
 * 动态交互模块数据交互切片
 */

export const MyComment_Sclice = createSlice({
    name: '系统模块全局状态传参管理',
    initialState: {
        myCommentList: [],
        pageIndex: 0,
    },
    reducers: {
        setMyCommentList: (state: any, action) => {
            state.myCommentList = [...state.myCommentList, ...action.payload]
        },
        clearMyCommentList: (state: any) => {
            state.myCommentList = []
        },
        setMyCommentPageIndex: (state: any) => {
            state.pageIndex = state.pageIndex + 1
        },
        clearMyCommentPageIndex: (state: any) => {
            state.pageIndex = 0
        },
    }
})

export const { setMyCommentList,clearMyCommentList,setMyCommentPageIndex,clearMyCommentPageIndex} = MyComment_Sclice.actions

export default MyComment_Sclice.reducer
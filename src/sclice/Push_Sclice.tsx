import { createSlice } from '@reduxjs/toolkit'

/**
 * 轮子哥
 * 发布页面数据交互切片
 */

export const Push_Sclice = createSlice({
    name: '发布全局状态传参管理',
    initialState: {
        tagId:-1
    },
    reducers: {
        setTagId: (state: any, action) => {
            state.tagId=action.payload
        },
    }
})

export const { setTagId } = Push_Sclice.actions

export default Push_Sclice.reducer
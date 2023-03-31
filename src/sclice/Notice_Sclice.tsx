import { createSlice } from '@reduxjs/toolkit'

/**
 * 轮子哥
 * 消息模块数据交互切片
 */

export const Notice_Sclice = createSlice({
    name: '消息模块全局状态传参管理',
    initialState: {
        chatList: [],
        pageIndex: 0
    },
    reducers: {
        setChatData: (state: any, action) => {
            state.chatList = [...state.chatList, ...action.payload]
        },
        clearChatData:(state:any)=>{
            state.chatList=[]
        },
        setPageIndex: (state: any) => {
            state.pageIndex = state.pageIndex + 1
        },
        clearPageIndex: (state: any) => {
            state.pageIndex = 0
        }
    }
})

export const { setChatData,clearChatData, setPageIndex, clearPageIndex } = Notice_Sclice.actions

export default Notice_Sclice.reducer
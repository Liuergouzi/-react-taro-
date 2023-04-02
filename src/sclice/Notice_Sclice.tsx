import { createSlice } from '@reduxjs/toolkit'
import itemList from '../itemList'

/**
 * 轮子哥
 * 消息模块数据交互切片
 */

export const Notice_Sclice = createSlice({
    name: '消息模块全局状态传参管理',
    initialState: {
        chatList: [...itemList.Notice_List],
        pageIndex: 0,
        chatItemClick:{}
    },
    reducers: {
        setChatData: (state: any, action) => {
            state.chatList = [...state.chatList, ...action.payload]
        },
        setChatDataAll:(state: any, action)=>{
            state.chatList = [...action.payload]
        },
        clearChatData:(state:any)=>{
            state.chatList=[...itemList.Notice_List]
        },
        setPageIndex: (state: any) => {
            state.pageIndex = state.pageIndex + 1
        },
        clearPageIndex: (state: any) => {
            state.pageIndex = 0
        },
        setChatItemClick: (state: any, action) => {
            state.chatItemClick=action.payload
        }
    }
})

export const { setChatData,clearChatData,setChatDataAll, setPageIndex, clearPageIndex,setChatItemClick } = Notice_Sclice.actions

export default Notice_Sclice.reducer
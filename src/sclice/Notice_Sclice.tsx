import { createSlice } from '@reduxjs/toolkit'
import Taro from '@tarojs/taro'
import reUrl from '../config'
import itemList from '../itemList'

/**
 * 轮子哥
 * 消息模块数据交互切片
 */

export const Notice_Sclice = createSlice({
    name: '消息模块全局状态传参管理',
    initialState: {
        socketState: false,
        chatList: [...itemList.Notice_List],
        pageIndex: 0,
        chatItemClick: {}
    },
    reducers: {
        openSocket: (state: any) => {
            if (!state.socketState && Taro.getStorageSync("socketId")!="") {
                 Taro.connectSocket({
                    url: reUrl.chatWebSocket + "1",
                })
                state.socketState=true
            }
        },
        setChatData: (state: any, action) => {
            state.chatList = [...state.chatList, ...action.payload]
        },
        setChatDataAll: (state: any, action) => {
            state.chatList = [...action.payload]
        },
        clearChatData: (state: any) => {
            state.chatList = [...itemList.Notice_List]
        },
        setPageIndex: (state: any) => {
            state.pageIndex = state.pageIndex + 1
        },
        clearPageIndex: (state: any) => {
            state.pageIndex = 0
        },
        setChatItemClick: (state: any, action) => {
            state.chatItemClick = action.payload
        }
    }
})

export const { openSocket, setChatData, clearChatData, setChatDataAll, setPageIndex, clearPageIndex, setChatItemClick } = Notice_Sclice.actions

export default Notice_Sclice.reducer
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
            if (!state.socketState && Taro.getStorageSync("socketId") != "") {
                Taro.connectSocket({
                    url: reUrl.chatWebSocket + "1",
                })
                state.socketState = true
            }
        },
        setChatData: (state: any, action) => {
            state.chatList = [...state.chatList, ...action.payload]
        },
        setChatDataAll: (state: any, action) => {
            state.chatList = [...action.payload]
        },
        clearChatData: (state: any) => {
            state.chatList = []
            if (Taro.getStorageSync("chatList0") != "") {
                state.chatList.push(Taro.getStorageSync("chatList0"))
            } else {
                state.chatList.push(itemList.Notice_List[0])
            }
            if (Taro.getStorageSync("chatList1") != "") {
                state.chatList.push(Taro.getStorageSync("chatList1"))
            } else {
                state.chatList.push(itemList.Notice_List[1])
            }
            if (Taro.getStorageSync("chatList2") != "") {
                state.chatList.push(Taro.getStorageSync("chatList2"))
            } else {
                state.chatList.push(itemList.Notice_List[2])
            }
        },
        setChatPageIndex: (state: any) => {
            state.pageIndex = state.pageIndex + 1
        },
        clearChatPageIndex: (state: any) => {
            state.pageIndex = 0
        },
        setChatItemClick: (state: any, action) => {
            state.chatItemClick = action.payload
        },
        setChatDefaultList: (state: any, action) => {
            if (action.payload[0].hasOwnProperty("sysMessage")) {
                state.chatList[0].message = action.payload[0].sysMessage
                state.chatList[0].time = action.payload[0].sysTime
                state.chatList[0].redCount = action.payload[0].sysRedCount
                Taro.setStorageSync('chatList0', state.chatList[0])
            }
            if (action.payload[0].hasOwnProperty("interactionMessage")) {
                state.chatList[1].message = action.payload[0].interactionMessage
                state.chatList[1].time = action.payload[0].interactionTime
                state.chatList[1].redCount = action.payload[0].interactionRedCount
                Taro.setStorageSync('chatList1', state.chatList[1])
            }
            if (action.payload[0].hasOwnProperty("friendMessage")) {
                state.chatList[2].message = action.payload[0].friendMessage
                state.chatList[2].time = action.payload[0].friendTime
                state.chatList[2].redCount = action.payload[0].friendRedCount
                Taro.setStorageSync('chatList2', state.chatList[2])
            }
        },
        setChatDefaultListOne: (state: any, action) => {
            switch (action.payload.type) {
                case 'systemCommon':
                    state.chatList[0].message = action.payload.content;
                    state.chatList[0].time = action.payload.time;
                    state.chatList[0].redCount = 1
                    Taro.setStorageSync('chatList0', state.chatList[0])
                    break;
                case 'systemUser':
                    state.chatList[0].message = action.payload.content;
                    state.chatList[0].time = action.payload.time;
                    state.chatList[0].redCount = 1
                    Taro.setStorageSync('chatList0', state.chatList[0])
                    break;
                case 'love':
                    state.chatList[1].message = action.payload.content;
                    state.chatList[1].time = action.payload.time;
                    state.chatList[1].redCount = 1
                    Taro.setStorageSync('chatList1', state.chatList[1])
                    break;
                case 'replay':
                    state.chatList[1].message = action.payload.content;
                    state.chatList[1].time = action.payload.time;
                    state.chatList[1].redCount = 1
                    Taro.setStorageSync('chatList1', state.chatList[1])
                    break;
                case 'comment':
                    state.chatList[1].message = action.payload.content;
                    state.chatList[1].time = action.payload.time;
                    state.chatList[1].redCount = 1
                    Taro.setStorageSync('chatList1', state.chatList[1])
                    break;
                case 'follow':
                    state.chatList[2].message = action.payload.content;
                    state.chatList[2].time = action.payload.time;
                    state.chatList[2].redCount = 1
                    Taro.setStorageSync('chatList2', state.chatList[2])
                    break;
            }
        },
        setChatDefaultListRedCount: (state: any, action) => {
            state.chatList[action.payload].redCount = 0;
            Taro.setStorageSync('chatList'+action.payload, state.chatList[action.payload])
        }
    }
})

export const { openSocket, setChatData, clearChatData, setChatDataAll, setChatPageIndex,
     clearChatPageIndex, setChatItemClick, setChatDefaultList,setChatDefaultListOne,setChatDefaultListRedCount } = Notice_Sclice.actions

export default Notice_Sclice.reducer
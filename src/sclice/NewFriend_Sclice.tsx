import { createSlice } from '@reduxjs/toolkit'
import itemList from '../itemList'

/**
 * 轮子哥
 * 动态交互模块数据交互切片
 */

export const NewFriend_Sclice = createSlice({
    name: '系统模块全局状态传参管理',
    initialState: {
        newFriendList: [...itemList.NewFriendList],
        pageIndex: 0,
    },
    reducers: {
        setNewFriendList: (state: any, action) => {
            state.newFriendList = [...state.newFriendList, ...action.payload]
        },
        clearNewFriendList: (state: any) => {
            state.newFriendList = [...itemList.NewFriendList]
        },
        setNewFriendPageIndex: (state: any) => {
            state.pageIndex = state.pageIndex + 1
        },
        clearNewFriendPageIndex: (state: any) => {
            state.pageIndex = 0
        },
    }
})

export const { setNewFriendList,clearNewFriendList,setNewFriendPageIndex,clearNewFriendPageIndex} = NewFriend_Sclice.actions

export default NewFriend_Sclice.reducer
import { createSlice } from '@reduxjs/toolkit'

/**
 * 轮子哥
 * 关注和粉丝模块数据交互切片
 */

export const FollowAndFans_Sclice = createSlice({
    name: '关注和粉丝模块全局状态传参管理',
    initialState: {
        followAndFansList: [],
        pageIndex: 0,
    },
    reducers: {
        setFollowAndFansList: (state: any, action) => {
            state.followAndFansList = [...state.followAndFansList, ...action.payload]
        },
        setFollowAndFansListAll: (state: any, action) => {
            state.followAndFansList = [ ...action.payload]
        },
        clearFollowAndFansList: (state: any) => {
            state.followAndFansList = []
        },
        setFollowAndFansPageIndex: (state: any) => {
            state.pageIndex = state.pageIndex + 1
        },
        clearFollowAndFansPageIndex: (state: any) => {
            state.pageIndex = 0
        },
    }
})

export const { setFollowAndFansList,setFollowAndFansListAll,clearFollowAndFansList,setFollowAndFansPageIndex,clearFollowAndFansPageIndex} = FollowAndFans_Sclice.actions

export default FollowAndFans_Sclice.reducer
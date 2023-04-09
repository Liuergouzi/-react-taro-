import { createSlice } from '@reduxjs/toolkit'
import itemList from '../itemList'

/**
 * 轮子哥
 * 消息模块数据交互切片
 */

export const SysNotice_Sclice = createSlice({
    name: '系统模块全局状态传参管理',
    initialState: {
        sysNoticeList: [...itemList.SysNoticeList],
        pageIndex: 0,
    },
    reducers: {
        setSysNoticeList: (state: any, action) => {
            state.sysNoticeList = [...state.sysNoticeList, ...action.payload]
        },
        clearSysNoticeList: (state: any) => {
            state.sysNoticeList = [...itemList.SysNoticeList]
        },
        setSysNoticePageIndex: (state: any) => {
            state.pageIndex = state.pageIndex + 1
        },
        clearSysNoticePageIndex: (state: any) => {
            state.pageIndex = 0
        },
    }
})

export const { setSysNoticeList,clearSysNoticeList,setSysNoticePageIndex,clearSysNoticePageIndex} = SysNotice_Sclice.actions

export default SysNotice_Sclice.reducer
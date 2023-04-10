import { createSlice } from '@reduxjs/toolkit'
import itemList from '../itemList'

/**
 * 轮子哥
 * 动态交互模块数据交互切片
 */

export const Interaction_Sclice = createSlice({
    name: '系统模块全局状态传参管理',
    initialState: {
        interactionList: [...itemList.InteractionList],
        pageIndex: 0,
    },
    reducers: {
        setInteractionList: (state: any, action) => {
            state.interactionList = [...state.interactionList, ...action.payload]
        },
        clearInteractionList: (state: any) => {
            state.interactionList = [...itemList.InteractionList]
        },
        setInteractionPageIndex: (state: any) => {
            state.pageIndex = state.pageIndex + 1
        },
        clearInteractionPageIndex: (state: any) => {
            state.pageIndex = 0
        },
    }
})

export const { setInteractionList,clearInteractionList,setInteractionPageIndex,clearInteractionPageIndex} = Interaction_Sclice.actions

export default Interaction_Sclice.reducer
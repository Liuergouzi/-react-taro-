import { createSlice } from '@reduxjs/toolkit'
/**
 * 轮子哥
 * 动态交互模块数据交互切片
 */

export const Legwork_Sclice = createSlice({
    name: '跑腿订单全局状态传参管理',
    initialState: {
        legworkList: [],
        pageIndex: 0,
    },
    reducers: {
        setLegworkList: (state: any, action) => {
            state.legworkList = [...state.legworkList, ...action.payload]
        },
        clearLegworkList: (state: any) => {
            state.legworkList = []
        },
        setLegworkPageIndex: (state: any) => {
            state.pageIndex = state.pageIndex + 1
        },
        clearLegworkPageIndex: (state: any) => {
            state.pageIndex = 0
        },
        setLegworkListAll:(state: any, action) => {
            state.legworkList = [...action.payload]
        },
    }
})

export const { setLegworkList,clearLegworkList,setLegworkPageIndex,clearLegworkPageIndex,setLegworkListAll} = Legwork_Sclice.actions

export default Legwork_Sclice.reducer
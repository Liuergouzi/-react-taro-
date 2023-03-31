import { createSlice } from '@reduxjs/toolkit'

/**
 * 轮子哥
 * 首页数据交互切片
 */

export const Home_Sclice = createSlice({
    name: '首页全局状态传参管理',
    initialState: {
        article:[],
        pageIndex:0
    },
    reducers: {
        setData: (state: any, action) => {
            state.article.push(action.payload)
        },
        setPageIndex:(state: any)=>{
            state.pageIndex=state.pageIndex+1
        }
    }
})

export const { setData } = Home_Sclice.actions

export default Home_Sclice.reducer
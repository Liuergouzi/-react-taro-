import { createSlice } from '@reduxjs/toolkit'

/**
 * 轮子哥
 * 首页数据交互切片
 */

export const Home_Sclice = createSlice({
    name: '首页全局状态传参管理',
    initialState: {
        article:[],
        // {
        //     url:"",
        //     name:"",
        //     time:"",
        //     title:"",
        //     context:"",
        //     loveCount:"",
        //     commentCount:""
        // }
    },
    reducers: {
        setData: (state: any, action) => {
            state.article.push(action.payload)
        },
        // add: state => {
        //     state.value += 1
        // },
        // subtract: state => {
        //     state.value -= 1
        // },
        // reset: (state, action) => {
        //     state.value = action.payload
        // }
    }
})

export const { setData } = Home_Sclice.actions

export default Home_Sclice.reducer
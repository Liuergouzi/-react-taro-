import { configureStore } from '@reduxjs/toolkit'
import Home_Reducer from './Home_Sclice'
import Push_Sclice from './Push_Sclice'

/**
 * 轮子哥
 * 状态管理库
 */

export default configureStore({
  reducer: {
    Home_Reducer_State:Home_Reducer,
    Push_Sclice:Push_Sclice
  }
})
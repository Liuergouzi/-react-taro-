import { configureStore } from '@reduxjs/toolkit'
import Home_Reducer from './Home_Sclice'
import Push_Sclice from './Push_Sclice'
import Notice_Sclice from './Notice_Sclice'

/**
 * 轮子哥
 * 状态管理库
 */

export default configureStore({
  reducer: {
    Home_Reducer_State:Home_Reducer,
    Push_Sclice:Push_Sclice,
    Notice_Sclice_State:Notice_Sclice
  }
})
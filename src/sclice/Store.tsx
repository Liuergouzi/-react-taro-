import { configureStore } from '@reduxjs/toolkit'
import Home_Sclice from './Home_Sclice'
import Push_Sclice from './Push_Sclice'
import Notice_Sclice from './Notice_Sclice'
import SysNotice_Sclice from './SysNotice_Sclice'
import Interaction_Sclice from './Interaction_Sclice'
import NewFriend_Sclice from './NewFriend_Sclice'
/**
 * 轮子哥
 * 状态管理库
 */

export default configureStore({
  reducer: {
    Home_Reducer_State:Home_Sclice,
    Push_Sclice:Push_Sclice,
    Notice_Reducer:Notice_Sclice,
    SysNotice_Reducer:SysNotice_Sclice,
    Interaction_Reducer:Interaction_Sclice,
    NewFriend_Reducer:NewFriend_Sclice
  }
})
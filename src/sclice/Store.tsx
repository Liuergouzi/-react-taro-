import { configureStore } from '@reduxjs/toolkit'
import Article_Sclice from './Article_Sclice'
import Push_Sclice from './Push_Sclice'
import Notice_Sclice from './Notice_Sclice'
import SysNotice_Sclice from './SysNotice_Sclice'
import Interaction_Sclice from './Interaction_Sclice'
import NewFriend_Sclice from './NewFriend_Sclice'
import Comment_Sclice from './Comment_Sclice'
import MyComment_Sclice from './MyComment_Sclice'
import FollowAndFans_Sclice from './FollowAndFans_Sclice'
import Legwork_Sclice from './Legwork_Sclice'
/**
 * 轮子哥
 * 状态管理库
 */

export default configureStore({
  reducer: {
    Article_Reducer:Article_Sclice,
    Push_Sclice:Push_Sclice,
    Notice_Reducer:Notice_Sclice,
    SysNotice_Reducer:SysNotice_Sclice,
    Interaction_Reducer:Interaction_Sclice,
    NewFriend_Reducer:NewFriend_Sclice,
    Comment_Reducer:Comment_Sclice,
    MyComment_Reducer:MyComment_Sclice,
    FollowAndFans_Reducer:FollowAndFans_Sclice,
    Legwork_Reducer:Legwork_Sclice
  }
})
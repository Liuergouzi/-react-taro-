import React from 'react'
import { Navigate } from 'react-router-dom'
import images from '../resources';

/**
 * 轮子哥
 * 路由自定义配置
 * 微信小程序已经禁止动态加载，
 * 组件懒加载仅h5使用
 */

// import Error from './view/error/Error';
// import Home from '../view/home/Home';
// import My from '../view/my/My';
// import Notice from '../view/notice/Notice';
// import Push from '../view/push/Push';
// import Classify from '../view/classify/Classify';
// import ArticleLoadMore from '../component/ariticle/ArticleLoadMore';
// import Login from '../view/login/Login';
//import ArticleDetail from '../component/articledetail/ArticleDetail';
// import Chat from '../view/chat/Chat';
// import SysNotice from "../view/sysnotice/SysNotice";
// import Interaction from "../view/interaction/Interaction";
// import NewFriend from "../view/newfriend/NewFriend";
// import PersonalDetails from '../subPack1/personaldetails/PersonalDetails';
//import PersonalSetting from '../subPack1/personalSetting/PersonalSetting';
//import Search from '../view/search/SearchView';
//import MyPush from '../view/mypush/MyPush';
//import MyLike from '../view/mylike/MyLike';
//import MyComment from '../view/mycomment/MyComment';
//import FollowAndFans from '../view/followandfans/FollowAndFans';
// import LegWork from '../view/legwork/LegWork';
// import LegworkLoadMore from '../component/ariticle/LegworkLoadMore';
// import MyLegwork from '../view/myLegwork/MyLegwork';
// import MyReceiveLegwork from '../view/myLegwork/MyReceiveLegwork';

const Error = React.lazy(() => import("../view/error/Error"));
const Home = React.lazy(() => import("../view/home/Home"));
const My = React.lazy(() => import("../view/my/My"));
const Notice = React.lazy(() => import("../view/notice/Notice"));
const Push = React.lazy(() => import("../view/push/Push"));
const Classify = React.lazy(() => import('../view/classify/Classify'));
const ArticleLoadMore = React.lazy(() => import("../component/ariticle/ArticleLoadMore"))
const Login = React.lazy(() => import("../view/login/Login"))
const ArticleDetail = React.lazy(() => import("../view/articledetail/ArticleDetail"))
const Chat = React.lazy(() => import("../view/chat/Chat"));
const SysNotice = React.lazy(() => import("../view/sysnotice/SysNotice"));
const Interaction = React.lazy(() => import("../view/interaction/Interaction"));
const NewFriend = React.lazy(() => import("../view/newfriend/NewFriend"));
const PersonalDetails = React.lazy(() => import("../subPack1/personaldetails/PersonalDetails"));
const PersonalSetting = React.lazy(() => import("../subPack1/personalSetting/PersonalSetting"));
const Search =React.lazy(() => import("../view/search/SearchView"));
const MyPush =React.lazy(() => import("../view/mypush/MyPush"));
const MyLike=React.lazy(() => import("../view/mylike/MyLike"));
const MyComment=React.lazy(() => import("../view/mycomment/MyComment"));
const FollowAndFans=React.lazy(() => import("../view/followandfans/FollowAndFans"));
const LegWork =React.lazy(()=>import("../view/legwork/LegWork"))
const LegworkLoadMore =React.lazy(()=>import("../component/ariticle/LegworkLoadMore"))
const MyLegwork =React.lazy(()=>import("../view/myLegwork/MyLegwork"))
const MyReceiveLegwork=React.lazy(()=>import("../view/myLegwork/MyReceiveLegwork"))
/**
 * 轮子哥
 * 最新react-router-dom@6版本路由自定义配置
 */

const routes = [
  {
    path: "/home",
    title: "首页",
    isBottomTabbar: false,
    element: <Home />,
    children: [
      {
        index: true,
        path: "/home/*",
        element: <ArticleLoadMore />
      },
      {
        path: "/home/type1",
        element: <ArticleLoadMore />,
      },
      {
        path: "/home/type2",
        element: <LegworkLoadMore />,
      },
    ]
  },
  {
    path: "/home/type1",
    title: "首页",
    isBottomTabbar: true,
    isleft:true,
    imgUrlTrue: images.home_1,
    imgUrlFalse: images.home_2,
    element: <Home />,
  },
  {
    title: '分类',
    path: '/classify',
    isBottomTabbar: true,
    isleft:true,
    imgUrlTrue: images.classify_1,
    imgUrlFalse: images.classify_2,
    element: <Classify />,
  },
  {
    title: '发布',
    path: '/push',
    isBottomTabbar: false,
    element: <Push />,
  },
  {
    title: '消息',
    path: '/notice',
    isBottomTabbar: true,
    isleft:false,
    imgUrlTrue: images.notice_1,
    imgUrlFalse: images.notice_2,
    element: <Notice />,
  },
  {
    title: '我的',
    path: '/my',
    isleft:false,
    isBottomTabbar: true,
    imgUrlTrue: images.my_1,
    imgUrlFalse: images.my_2,
    element: <My />,
  },
  {
    title: '我的帖子',
    path: '/myPush',
    isBottomTabbar: false,
    element: <MyPush />,
  },
  {
    title: '我的点赞',
    path: '/myLike',
    isBottomTabbar: false,
    element: <MyLike />,
  },
  {
    title: '我的评论',
    path: '/myComment',
    isBottomTabbar: false,
    element: <MyComment />,
  },
  {
    title: '我的关注和粉丝',
    path: '/myFollowAndFans',
    isBottomTabbar: false,
    element: <FollowAndFans />,
  },
  {
    title: '我的订单',
    path: '/myLegwork',
    isBottomTabbar: false,
    element: <MyLegwork />,
  },
  {
    title: '已接订单',
    path: '/myReceiveLegwork',
    isBottomTabbar: false,
    element: <MyReceiveLegwork />,
  },
  {
    title: '登录',
    path: '/login',
    isBottomTabbar: false,
    element: <Login />,
  },
  {
    title: '帖子详情',
    path: '/articleDetail',
    isBottomTabbar: false,
    element: <ArticleDetail />,
  },
  {
    title: '跑腿悬赏发布页面',
    path: '/legwork',
    isBottomTabbar: false,
    element: <LegWork />,
  },
  {
    title: '聊天界面',
    path: '/chat',
    isBottomTabbar: false,
    element: <Chat />,
  },
  {
    title: '系统通知页面',
    path: '/sysNotice',
    isBottomTabbar: false,
    element: <SysNotice />,
  },
  {
    title: '消息互动提示页面',
    path: '/interaction',
    isBottomTabbar: false,
    element: <Interaction />,
  },
  {
    title: '新粉丝通知页面',
    path: '/newFriend',
    isBottomTabbar: false,
    element: <NewFriend />,
  },
  {
    title: '个人详情页面',
    path: '/personalDetails',
    isBottomTabbar: false,
    element: <PersonalDetails />,
  },
  {
    title: '个人详情设置页面',
    path: '/personalSetting',
    isBottomTabbar: false,
    element: <PersonalSetting />,
  },
  {
    title: '搜素页面',
    path: '/search',
    isBottomTabbar: false,
    element: <Search />,
  },
  {
    path: "/*",
    isBottomTabbar: false,
    element: <Navigate to="/home" />,
  },
  {
    title: '404',
    path: '/*',
    isBottomTabbar: false,
    element: <Error />,
  },
]


export default routes;

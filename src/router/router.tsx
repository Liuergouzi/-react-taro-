import React from 'react'
import { Navigate } from 'react-router-dom'
import images from '../resources';

/**
 * 轮子哥
 * 路由自定义配置
 * 微信小程序已经禁止动态加载，
 * 组件懒加载仅h5使用
 */

// import Error from '../view/Error';
// import Home from '../view/Home';
// import My from '../view/My';
// import Notice from '../view/Notice';
// import Push from '../view/Push';
// import Article from '../component/Article';
// import Classify from '../view/Classify';
// import ArticleLoadMore from '../component/ArticleLoadMore';
// import Login from '../view/Login';
//import ArticleDetail from '../component/ArticleDetail';
// import Chat from '../view/Chat';
// import SysNotice from "../view/sysnotice/SysNotice";
// import Interaction from "../view/interaction/Interaction";
// import NewFriend from "../view/newfriend/NewFriend";
// import PersonalDetails from '../view/personaldetails/PersonalDetails';
//import PersonalSetting from 'src/view/personalSetting/PersonalSetting';

const Error = React.lazy(() => import("../view/error/Error"));
const Home = React.lazy(() => import("../view/home/Home"));
const My = React.lazy(() => import("../view/my/My"));
const Notice = React.lazy(() => import("../view/notice/Notice"));
const Push = React.lazy(() => import("../view/push/Push"));
const Article = React.lazy(() => import("../component/ariticle/Article"));
const Classify = React.lazy(() => import('../view/classify/Classify'));
const ArticleLoadMore = React.lazy(() => import("../component/ariticle/ArticleLoadMore"))
const Login = React.lazy(() => import("../view/login/Login"))
const ArticleDetail = React.lazy(() => import("../component/ariticle/ArticleDetail"))
const Chat = React.lazy(() => import("../view/chat/Chat"));
const SysNotice = React.lazy(() => import("../view/sysnotice/SysNotice"));
const Interaction = React.lazy(() => import("../view/interaction/Interaction"));
const NewFriend = React.lazy(() => import("../view/newfriend/NewFriend"));
const PersonalDetails = React.lazy(() => import("../view/personalDetails/PersonalDetails"));
const PersonalSetting = React.lazy(() => import("../view/personalSetting/PersonalSetting"));
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
        element: <Article />
      },
      {
        path: "/home/type2",
        element: <ArticleLoadMore />,
      },
    ]
  },
  {
    path: "/home/type1",
    title: "首页",
    isBottomTabbar: true,
    imgUrlTrue: images.home_1,
    imgUrlFalse: images.home_2,
    element: <Home />,
  },
  {
    title: '分类',
    path: '/classify',
    isBottomTabbar: true,
    imgUrlTrue: images.classify_1,
    imgUrlFalse: images.classify_2,
    element: <Classify />,
  },
  {
    title: '发布',
    path: '/push',
    isBottomTabbar: true,
    imgUrlTrue: images.push_1,
    imgUrlFalse: images.push_2,
    element: <Push />,
  },
  {
    title: '消息',
    path: '/notice',
    isBottomTabbar: true,
    imgUrlTrue: images.notice_1,
    imgUrlFalse: images.notice_2,
    element: <Notice />,
  },
  {
    title: '我的',
    path: '/my',
    isBottomTabbar: true,
    imgUrlTrue: images.my_1,
    imgUrlFalse: images.my_2,
    element: <My />,
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

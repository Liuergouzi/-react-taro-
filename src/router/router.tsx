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
<<<<<<< HEAD
//import ArticleDetail from '../component/ArticleDetail';
=======
<<<<<<< HEAD
<<<<<<< HEAD
//import ArticleDetail from '../component/ArticleDetail';
=======
>>>>>>> 77d71f61220f48bfebdce9bc9f8881806eba1d0e
=======
>>>>>>> 77d71f61220f48bfebdce9bc9f8881806eba1d0e
>>>>>>> c9d95df691930cc6cc983ad4835cefd851fc86dc

const Error = React.lazy(() => import("../view/Error"));
const Home = React.lazy(() => import("../view/Home"));
const My = React.lazy(() => import("../view/My"));
const Notice = React.lazy(() => import("../view/Notice"));
const Push = React.lazy(() => import("../view/Push"));
const Article = React.lazy(() => import("../component/Article"));
const Classify = React.lazy(() => import('../view/Classify'));
const ArticleLoadMore = React.lazy(() => import("../component/ArticleLoadMore"))
const Login = React.lazy(() => import("../view/Login"))
<<<<<<< HEAD
const ArticleDetail = React.lazy(() => import("../component/ArticleDetail"))
=======
<<<<<<< HEAD
<<<<<<< HEAD
const ArticleDetail = React.lazy(() => import("../component/ArticleDetail"))
=======
>>>>>>> 77d71f61220f48bfebdce9bc9f8881806eba1d0e
=======
>>>>>>> 77d71f61220f48bfebdce9bc9f8881806eba1d0e
>>>>>>> c9d95df691930cc6cc983ad4835cefd851fc86dc
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> c9d95df691930cc6cc983ad4835cefd851fc86dc
    title: '帖子详情',
    path: '/articleDetail',
    isBottomTabbar: false,
    element: <ArticleDetail />,
  },
  {
<<<<<<< HEAD
=======
=======
>>>>>>> 77d71f61220f48bfebdce9bc9f8881806eba1d0e
=======
>>>>>>> 77d71f61220f48bfebdce9bc9f8881806eba1d0e
>>>>>>> c9d95df691930cc6cc983ad4835cefd851fc86dc
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

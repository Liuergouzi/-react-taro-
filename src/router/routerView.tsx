import { Suspense } from 'react'
import { BrowserRouter, useRoutes } from "react-router-dom";
import Loading from '../view/loading/Loading';
import routers from './router';
const GetRoutes = () => useRoutes(routers)


import { Provider } from 'react-redux';
import Store from '../sclice/Store';
import Appsocket from './Appsocket';
/**
 * 轮子哥
 * 路由主入口
 */


export default function routerView() {

  return (
    <BrowserRouter>
      <Suspense fallback={< Loading />}>
        <Provider store={Store}>
          <GetRoutes />
          <Appsocket/>
        </Provider>
      </Suspense>
    </BrowserRouter>
  )
}


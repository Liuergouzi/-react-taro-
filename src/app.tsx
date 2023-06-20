import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import './app.scss'
import { Suspense } from 'react'
import {HashRouter, useRoutes } from "react-router-dom";
import Loading from './view/loading/Loading';
import routers from './router/router';
const GetRoutes = () => useRoutes(routers)


import { Provider } from 'react-redux';
import Store from './sclice/Store';
import Appsocket from './router/Appsocket';


function App({ children }: PropsWithChildren) {

  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return (
    <HashRouter>
      <Suspense fallback={< Loading />}>
        <Provider store={Store}>
          <GetRoutes />
          {children}
          <Appsocket/>
        </Provider>
      </Suspense>
    </HashRouter>
  )
}

export default App

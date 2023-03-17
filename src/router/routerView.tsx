import { Component, PropsWithChildren, Suspense } from 'react'
import { BrowserRouter, useRoutes } from "react-router-dom";
import Loading from '../view/Loading';
import routers from './router';
const GetRoutes = () => useRoutes(routers)

/**
 * 轮子哥
 * 路由主入口
 */

export default class routerView extends Component<PropsWithChildren> {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={< Loading />}>
            <GetRoutes />
        </Suspense>
      </BrowserRouter>
    )
  }
}
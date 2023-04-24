import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './TopMostTaroNavigationBar.scss'
import images from '../../resources'
import { Sticky } from '@antmjs/vantui';

interface TopMostTaroNavigationBar {
    needBackIcon?: boolean,
    mainTitle?: string,
    children?: any,
    goTop?: boolean,
    id?: string
}

export default function TopMostTaroNavigationBar(props: TopMostTaroNavigationBar) {

    const navBarStora = Taro.getStorageSync('navBarHeight')

    const [navBarHeight, setNavBarHeight] = useState(navBarStora)
    const navigate = useNavigate();
    useEffect(() => {
        if (navBarHeight == "") {
            getNavHeight()
        }
    }, [])

    const getNavHeight = () => {
        let menuButtonObject = Taro.getMenuButtonBoundingClientRect();
        var sysinfo = Taro.getSystemInfoSync();
        let statusBarHeight: any = sysinfo.statusBarHeight;
        let menuBottonHeight = menuButtonObject.height;
        let menuBottonTop = menuButtonObject.top;
        let navBarHeight = statusBarHeight + menuBottonHeight + (menuBottonTop - statusBarHeight) * 2;
        Taro.setStorage({
            key: "navBarHeight",
            data: navBarHeight
        })
        setNavBarHeight(navBarHeight)
    }

    const goBackPage = () => {
        navigate(-1)
    }

    const scrollToTop = () => {
        Taro.createSelectorQuery().select('#top' + props.id).boundingClientRect(function (rect: any) {
            if (rect) {
                Taro.pageScrollTo({
                    scrollTop: rect.height
                })
                console.log("移动")
            }
        }).exec()
    }

    return (
        <Sticky>
            <div className='nav_custom_bar' style={{ height: navBarHeight + "px" }}>
                {
                    props.needBackIcon && <img src={images.back} className={`nav_custom_bar_back`} onClick={() => { goBackPage() }}></img>
                }
                {
                    props.mainTitle == '' ?
                        <div className='nav_custom_bar_title2'>{props.children}</div>
                        :
                        <div className='nav_custom_bar_title1'>{props.mainTitle}</div>
                }
                {
                    props.goTop && <img id="top" className='nav_custom_bar_goTop' src={images.goTop} onClick={() => { scrollToTop() }}></img>
                }
            </div>
        </Sticky>
    )
}

TopMostTaroNavigationBar.defaultProps = {
    needBackIcon: true,
    mainTitle: '',
    children: '',
    goTop: false,
    id: ''
}



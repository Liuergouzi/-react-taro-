import Taro from "@tarojs/taro";

interface TopMostTaroNavigationBar {
    title: string,
    frontColor: string,
    backgroundColor: string
}

export default function TopMostTaroNavigationBar(props: TopMostTaroNavigationBar) {
    //判断是否为小程序端
    if (process.env.TARO_ENV == 'weapp') {
        Taro.setNavigationBarTitle({
            title: props.title
        })
        Taro.setNavigationBarColor({
            frontColor: props.frontColor,
            backgroundColor: props.backgroundColor,
            animation: {
                duration: 400,
                timingFunc: 'easeIn'
            }
        })
    }
}

TopMostTaroNavigationBar.defaultProps = {
    title: "",
    frontColor: '#000000',
    backgroundColor: '#ffffff'
}
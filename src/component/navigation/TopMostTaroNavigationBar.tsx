import Taro from "@tarojs/taro";

interface TopMostTaroNavigationBar  {
    title :string,
    frontColor:string,
    backgroundColor :string
  }

export default function TopMostTaroNavigationBar(props:TopMostTaroNavigationBar) {
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

TopMostTaroNavigationBar.defaultProps ={
    title : "",
    frontColor:'#000000',
    backgroundColor :'#ffffff'
  }
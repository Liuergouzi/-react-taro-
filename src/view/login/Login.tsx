import style from './Login.module.scss'
import images from '../../resources'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar'
import { Button } from '@antmjs/vantui'
import netRequest from '../../http/http'

export default function Login() {

    const [isRegister, setIsRegister] = useState(false)
    const [account, setAccount] = useState("")
    const [password, setPassword] = useState("")
    const [chect, setChect] = useState(Math.ceil(Math.random() * 10000))
    const [chectInput, setchectInput] = useState()
    const navigate = useNavigate();
    const [isRequestFinsh, setIsRequestFinsh] = useState(true)

    useEffect(() => setChect(Math.ceil(Math.random() * 10000)), [isRegister])

    const login = () => {
        if (isRequestFinsh) {
            setIsRequestFinsh(false);
            if (!isRegister) {
                netRequest({
                    username: account,
                    password: password
                }, 'login', 'POST', 0)
                    .then((res) => {
                        Taro.setStorageSync("userId", res.data.data.loginId)
                        Taro.setStorageSync("token", res.data.data.tokenValue)
                        netRequest({}, 'info', 'GET', 0)
                            .then(() => {
                                Taro.setStorageSync("user", res.data.data)
                                navigate(-1)
                                setIsRequestFinsh(true)
                            })
                            .catch(() => {
                                setIsRequestFinsh(true)
                            })
                    })
                    .catch(() => {
                        setIsRequestFinsh(true)
                    })
            } else {
                if (chectInput == chect) {
                    netRequest({}, 'regist', 'POST', 1)
                        .then(() => {
                            Taro.showToast({
                                title: '注册成功',
                                icon: 'success',
                                duration: 1500
                            })
                            setIsRegister(!isRegister)
                            setIsRequestFinsh(true)
                        })
                        .catch(() => {
                            setIsRequestFinsh(true)
                        })
                } else {
                    setIsRequestFinsh(true);
                    Taro.showToast({
                        title: '验证码错误',
                        icon: 'error',
                        duration: 2000
                    })
                }
            }
        }
    }

    return (
        <div className={style.Login}>
            <TopMostTaroNavigationBar needBackIcon={true} mainTitle={"登录"} />

            <div className={style.loginTop}>
                <div className={style.left}>
                    <div className={style.loginTopText}>自从我用了</div>
                    <div className={style.loginTopText2}>广应科万事通</div>
                    <div className={style.loginTopText}>我成为了全村最靓的崽</div>
                </div>
                <div className={style.right}>
                    <img className={style.rightImg} src={images.close} onClick={() => { navigate(-1); }}></img>
                </div>
            </div>
            <div className={style.contain}>
                <div className={style.inputFlex}>
                    <div className={style.inputTop}>账号</div>
                    <input className={style.loginInput} placeholder={isRegister ? "请输入注册的账号" : "请输入登录的账号"} onChange={(e: any) => setAccount(e.detail.value)}></input>
                    <div className={style.line}></div>
                </div>
                <div className={style.inputFlex}>
                    <div className={style.inputTop}>密码</div>
                    <input className={style.loginInput} placeholder={isRegister ? "请输入注册的密码" : "请输入登录的密码"} onChange={(e: any) => setPassword(e.detail.value)}></input>
                    <div className={style.line}></div>
                </div>
                {
                    isRegister &&
                    <div className={style.inputFlex}>
                        <div className={style.inputTop}>验证码</div>
                        <div className={style.inputChect}>
                            <input className={style.loginInput} placeholder="请输入验证码" onChange={(e: any) => { setchectInput(e.detail.value) }}></input>
                            <div className={style.chect} onClick={() => setChect(Math.ceil(Math.random() * 10000))}>{chect}</div>
                        </div>
                        <div className={style.line}></div>
                    </div>
                }
                <Button className={style.loginButton} loading={!isRequestFinsh} type="info" loadingText="加载中..." onClick={() => login()}>{isRegister ? '注册' : '登录'}</Button>
                <div className={style.registerButton} onClick={() => setIsRegister(!isRegister)}>{isRegister ? '取消' : '注册'}</div>
                <div className={style.otherText}>------------第三方登录------------</div>
                <div className={style.other}>
                    <div className={style.otherItem}></div>
                    <div className={style.otherItem}>
                        <img className={style.otherImg} src={images.wx}></img>
                    </div>
                    <div className={style.otherItem}>
                        <img className={style.otherImg} src={images.qq}></img>
                    </div>
                    <div className={style.otherItem}></div>
                </div>
            </div>

        </div>
    )
}

import style from '../style/Login.module.scss'
import images from '../resources'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'

export default function Login() {

    const [isRegister, setIsRegister] = useState(false)
    const [account, setAccount] = useState("")
    const [password, setPassword] = useState("")
    const [chect, setChect] = useState(Math.ceil(Math.random() * 10000))
    const [chectInput, setchectInput] = useState("")
    const navigate = useNavigate();

    useEffect(() => setChect(Math.ceil(Math.random() * 10000)), [isRegister])

    const login = () => {
        if(isRegister){
            Taro.setStorage({
                key: "socketId",
                data: account
            })
            navigate(-1)
        }else{
            Taro.setStorage({
                key: "socketId",
                data: account
            })
            navigate(-1)
        }
        console.log(Taro.getStorageSync('account') + password)
    }

    return (
        <div className={style.Login}>
            <div className={style.loginTop}>
                <div className={style.left}>
                    <div className={style.loginTopText}>自从我用了</div>
                    <div className={style.loginTopText2}>广应科万事通</div>
                    <div className={style.loginTopText}>我成为了全村最靓的崽</div>
                </div>
                <div className={style.right}>
                    <img className={style.rightImg} src={images.close}  onClick={()=>{navigate(-1);}}></img>
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
                <div className={style.loginButton} onClick={() => login()}>{isRegister ? '注册' : '登录'}</div>
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

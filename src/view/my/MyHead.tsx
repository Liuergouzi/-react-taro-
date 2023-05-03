import React from 'react'
import style from './MyHead.module.scss'
import images from '../../resources';
import Taro from '@tarojs/taro';
import { useNavigate } from 'react-router-dom';

interface MyHead {
    data: {
        useLogin: Boolean,
        avatar: string,
        nickname: String,
        sex: string
    }
}

const MyHead = React.memo((props: MyHead) => {

    const navigate = useNavigate();
    return (
        <>
            {
                props.data.useLogin ?
                    <div className={style.myHead} onClick={() => { navigate("/personalSetting"); }}>
                        <div className={style.left}>
                            <img className={style.headImg} src={props.data.avatar != null ? props.data.avatar + '?' + Math.random() : ""}></img>
                            <div>
                                <div className={style.headDiv}>
                                    <div className={style.headname}>{props.data.nickname}</div>
                                    <div className={style.sex}>{props.data.sex}</div>
                                </div>
                                <div className={style.headId}>ID:182729{Taro.getStorageSync("userId")}</div>
                            </div>
                        </div>
                        <div className={style.right} >
                            <img className={style.row} src={images.row}></img>
                        </div>
                    </div>
                    :
                    <div className={style.myHead}>
                        <img className={style.headImg} src={images.boy}></img>
                        <div className={style.loginFalse}>
                            <div className={style.loginTip}>您还未登录，去登录？
                            </div>
                            <div className={style.loginButtom} onClick={() => { navigate("/login"); }}>登录/注册
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
)
export default MyHead
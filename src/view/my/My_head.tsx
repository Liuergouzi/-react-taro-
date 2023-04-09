import  { useState } from 'react'
import images from '../../resources'
import style from './MyHead.module.scss'
import { useNavigate } from 'react-router-dom'

/**
 * 轮子哥
 * 我的-顶部，css自定义大波浪
 */

export default function My_head() {

  const [useLogin] = useState(false)
  const navigate = useNavigate();

  return (
    <div>

      <div className={style.waveWrapper + " " + style.waveAnimation}>
        {
          useLogin ?
            <div className={style.myHead}>
              <img className={style.headImg} src={images.announcement}></img>
              <div className={style.headname}>
                轮子哥
              </div>
            </div>
            :
            <div className={style.myHead}>
              <img className={style.headImg} src={images.boy}></img>
              <div className={style.loginFalse}>
                <div className={style.loginTip}>您还未登录，去登录？</div>
                  <div className={style.loginButtom} onClick={()=>{navigate("/login");}}>登录/注册</div>
              </div>
            </div>
        }

        <div className={style.waveWrapperInner}>
          <div className={style.wave + " " + style.waveTop}></div>
        </div>
        <div className={style.waveWrapperInner}>
          <div className={style.wave + " " + style.waveMiddle}></div>
        </div>
      </div>

    </div>
  )
}

import style from  './Loading.module.scss'

export default function Loading() {
  return (
    <div className={style.loading}>
        <div className={style.title}>
          <span>轮子哥正在为你火速加载中</span>
        </div>
    </div>
  )
}

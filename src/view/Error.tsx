import style from  '../style/Error.module.scss'

export default function Error() {
    return (
        <div className={style.error}>
            <div className={style.title}>
                <div>404</div>
                <div>您访问的页面不存在~</div>
            </div>
        </div>
    )
}

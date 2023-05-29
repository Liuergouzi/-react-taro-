import { useDispatch, useSelector } from 'react-redux'
import style from './Push_textarea.module.scss'
import { setTitle,setContent } from '../../sclice/Push_Sclice'
import React from 'react'
/**
 * 轮子哥
 * 发布-自定义输入框
 */

 function Push_textarea() {
    const dispatch:any = useDispatch()
    const title: any = useSelector((state: any) => state.Push_Sclice.title)
    const content: any = useSelector((state: any) => state.Push_Sclice.content)
    const tMax=50
    const cMax=500
    
    const getTitle=(val: string) =>{
        dispatch(setTitle( {titleData:val.substring(0, tMax),titleLen:tMax-val.length}))
    }

    const getContent=(val: string)=> {
        dispatch(setContent({contentData:val.substring(0, cMax),contentLen:cMax-val.length}))
    }


    return (
        <div>

            <div className={style.inputDiv}>
                <input  className={style.inputDom} placeholder='请输入爱坤标题' maxLength={tMax}
                    value={title.titleData}
                    onInput={(e: any) => getTitle(e.target.value)}>
                </input>
                <div className={style.inputCount}>{tMax}/{title.titleLen}</div>
            </div>

            <div className={style.textDiv}>
                <textarea className={style.textArea} placeholder='尊敬的爱坤，发表您伟大的观点吧！' maxLength={cMax}
                    value={content.contentData}
                    onInput={(e: any) => getContent(e.target.value)}>
                </textarea>
                <div className={style.textCount}>{cMax}/{content.contentLen}</div>
            </div>

        </div>
    )
}

export default React.memo(Push_textarea)
import { Button, DatetimePicker, Popup, Radio, RadioGroup } from '@antmjs/vantui'
import { useCallback, useState } from 'react'
import netRequestTextCheck from '../../http/httpTextCheck'
import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar'
import style from './LegWork.module.scss'
import { useNavigate } from 'react-router-dom'
import netRequest from '../../http/http'
import Taro from '@tarojs/taro'
import time from '../../tool/time';

export default function LegWork() {

    const [moneyValue1, moneySetValue1] = useState('1')
    const [moneyValue2, moneySetValue2] = useState('1')
    const [dateShow, setDateShow] = useState(false)
    const [timePick, setTimePick] = useState("")
    const [isRequestFinsh, setIsRequestFinsh] = useState(true)
    const navigate = useNavigate();
    const [inputDate, setInputDate] = useState({
        userId: Taro.getStorageSync("userId"),
        pushTime:time,
        goods: "",
        start: "",
        end: "",
        money: "",
        time: "",
        contact: "",
        notes: ""
    })

    const formatter = useCallback(function (type: string, value: any) {
        if (type === 'year') {
            return `${value}年`
        }
        if (type === 'month') {
            return `${value}月`
        }
        if (type === 'day') {
            return `${value}日`
        }
        if (type === 'hour') {
            return `${value}点`
        }
        if (type === 'minute') {
            return `${value}分`
        }
        return value
    }, [])

    const preFixZero = useCallback((n) => {
        return n > 9 ? `${n}` : `0${n}`
    }, [])

    const formatDate = useCallback((date) => {
        const d = new Date(date)
        return `${d.getFullYear()}/${preFixZero(
            Number(d.getMonth() + 1),
        )}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
    }, [])

    const push = () => {
        if (inputDate.start == '' || inputDate.end == '' || inputDate.goods == '') {
            Taro.showToast({
                title: '存在必填项未填！',
                icon: 'none',
                duration: 1500
            })
        }
        else if (isRequestFinsh) {
            setIsRequestFinsh(false)
            console.log(JSON.stringify(inputDate))
            netRequestTextCheck(JSON.stringify(inputDate)).then(() => {
                netRequest(inputDate, 'insertLegwork', 'POST', 0)
                    .then(() => {
                        Taro.showToast({
                            title: '发布成功',
                            icon: 'success',
                            duration: 2000
                        })
                        setIsRequestFinsh(true)
                        navigate(-1)
                    })
                    .catch(() => {
                        setIsRequestFinsh(true)
                    })
            }).catch(() => {
                setIsRequestFinsh(true)
            })
        }
    }

    return (
        <div>
            <TopMostTaroNavigationBar needBackIcon={true} mainTitle={'发布跑腿'}></TopMostTaroNavigationBar>
            <div className={style.box}>

                <div className={style.line}></div>
                <div className={style.item}>
                    <div className={style.dot}>*</div>
                    <input className={style.inputs} placeholder='输入物品或者快递号'
                        onBlur={(e: any) => { let inputDates = inputDate; inputDates.goods = e.target.value; setInputDate(inputDates) }} />
                </div>
                <div className={style.line}></div>

                <div className={style.item}>
                    <div className={style.dot}>*</div>
                    <input className={style.inputs} placeholder='从哪里帮你拿'
                        onBlur={(e: any) => { let inputDates = inputDate; inputDates.start = e.target.value; setInputDate(inputDates) }} />
                </div>
                <div className={style.line}></div>
                <div className={style.item}>
                    <div className={style.dot}>*</div>
                    <input className={style.inputs} placeholder='帮你拿到哪里'
                        onBlur={(e: any) => { let inputDates = inputDate; inputDates.end = e.target.value; setInputDate(inputDates) }} />
                </div>
                <div className={style.line}></div>

                <div className={style.item}>
                    <div className={style.dot5}></div>
                    <div className={style.lefHit}>金额</div>
                    <RadioGroup
                        direction="horizontal"
                        value={moneyValue1}
                        className={style.RadioGroup}
                        onChange={(e) => {
                            moneySetValue1(e.detail);
                            let inputDates = inputDate; inputDates.money = ""; setInputDate(inputDates)
                        }}
                    >
                        <Radio iconSize="15px" name="1">无偿</Radio>
                        <Radio iconSize="15px" name="2">有偿</Radio>
                    </RadioGroup>
                </div>
                {
                    moneyValue1 == '2' &&
                    <>
                        <div className={style.item}>
                            <div className={style.dot}>*</div>
                            <input type="number" pattern="\d*" className={style.inputs} placeholder='悬赏金额(单位：元)'
                                onBlur={(e: any) => { let inputDates = inputDate; inputDates.money = e.target.value; setInputDate(inputDates) }} />
                        </div>
                        <div className={style.line}></div>
                        <div className={style.hitRed2}>*本小程序不参与资金交易，有偿请私下协商*</div>
                    </>
                }
                <div className={style.line}></div>
            </div>

            <div className={style.box}>

                <div className={style.item}>
                    <div className={style.dot2}></div>
                    <div className={style.lefHit}>截止时间</div>
                    <RadioGroup
                        direction="horizontal"
                        value={moneyValue2}
                        className={style.RadioGroup}
                        onChange={(e) => { moneySetValue2(e.detail); setTimePick("") }}
                    >
                        <Radio iconSize="15px" name="1">永久</Radio>
                        <Radio iconSize="15px" name="2">自定义</Radio>
                    </RadioGroup>
                </div>
                {
                    moneyValue2 == '2' &&
                    <div className={style.item}>
                        <div className={style.dot}>*</div>
                        <div className={style.lefHit} onClick={() => { setDateShow(true) }}>{timePick == "" ? '选择截止日期' : timePick}</div>
                    </div>
                }
                <div className={style.line}></div>


                <div className={style.item}>
                    <div className={style.dot3}></div>
                    <input className={style.inputs} placeholder='(选填)联系方式:电话、微信、QQ...'
                        onBlur={(e: any) => { let inputDates = inputDate; inputDates.contact = e.target.value; setInputDate(inputDates) }} />
                </div>
                <div className={style.line}></div>

                <div className={style.item}>
                    <div className={style.dot4}></div>
                    <input className={style.inputs} placeholder='(选填)备注'
                        onBlur={(e: any) => { let inputDates = inputDate; inputDates.notes = e.target.value; setInputDate(inputDates) }} />
                </div>
                <div className={style.line}></div>
            </div>

            <div className={style.box}>
                <div className={style.hitRed}>*请谨慎填写，为了保证他人接单一致性，一旦发布后不允许修改*</div>
                <Button className={style.loginButton} loading={!isRequestFinsh} type="info" loadingText="发布中..." onClick={() => { push() }}>发布</Button>
            </div>

            <Popup
                position="bottom"
                show={dateShow}
                onClose={() => setDateShow(false)}
            >
                <DatetimePicker
                    type="datetime"
                    onConfirm={(e) => {
                        setDateShow(false); setTimePick(formatDate(e.detail.value));
                        let inputDates = inputDate; inputDates.time = formatDate(e.detail.value); setInputDate(inputDates)
                    }}
                    onCancel={() => setDateShow(false)}
                    minDate={new Date().getTime()}
                    formatter={formatter}
                />
            </Popup>

        </div>
    )
}

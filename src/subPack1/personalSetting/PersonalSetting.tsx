import style from './PersonalSetting.module.scss'
import images from '../../resources'
import { ActionSheet, Cascader, Collapse, CollapseItem, Dialog, Icon, Switch } from '@antmjs/vantui'
import { useState } from 'react'
import { Input } from '@tarojs/components'
import { regionData, CodeToText } from 'element-china-area-data'
import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar'

export default function PersonalSetting() {

    const [value1, setValue1] = useState(false)
    const [value2, setValue2] = useState(false)
    const [value3, setValue3] = useState(false)
    const [name, setName] = useState('未命名用户')
    const [nameShow, setNameShow] = useState(false)
    const [sex, setSex] = useState('沃尔玛购物袋')
    const [sexShow, setSexShow] = useState(false)
    const [year, setYear] = useState(2019)
    const [yearShow, setYearShow] = useState(false)
    const [areaVisible, setAreaVisible] = useState(false)
    const [area, setArea] = useState([])
    const [areaTitle, setAreaTitle] = useState([] as any[])
    const [introduction, setIntroduction] = useState('简单地介绍一下你自己吧')
    const [introductionShow, setIntroductionShow] = useState(false)
    const areaChange = (areas) => {
        setArea(areas)
        setAreaTitle([CodeToText[areas[0]], CodeToText[areas[1]], CodeToText[areas[2]]])
    }
    const [sexActions] = useState([
        {
            name: '未知',
        },
        {
            name: '男',
        },
        {
            name: '女',
        },
        {
            name: '沃尔玛购物袋',
            subname: '如果你纠结于你的性别，那么这是一个完美的选择'
        },
    ])
    const [yearActions] = useState([
        { name: 2023 }, { name: 2022 }, { name: 2021 }, { name: 2020 }, { name: 2019 }, { name: 2018 }, { name: 2017 },
        { name: 2016 }, { name: 2015 }, { name: 2014 }, { name: 2013 }, { name: 2012 }, { name: 2011 }, { name: 2010 },
        { name: 2009 }, { name: 2008 }, { name: 2007 }, { name: 2006 }, { name: 2005 }, { name: 2004 }
    ])

    return (
        <div>
            <TopMostTaroNavigationBar needBackIcon={true} mainTitle={'个人设置'} />
            <ActionSheet
                show={sexShow}
                actions={sexActions}
                description="请选择你的性别"
                onClose={() => setSexShow(false)}
                onSelect={(e) => { setSex(e.detail.name) }}
            />
            <ActionSheet
                show={yearShow}
                actions={yearActions}
                description="请选择你的入学届数"
                onClose={() => setYearShow(false)}
                onSelect={(e) => { setYear(e.detail.name) }}
            />
            <Dialog
                id="vanDialog1"
                title="修改昵称"
                showCancelButton
                confirmButtonOpenType="getUserInfo"
                show={nameShow}
                onConfirm={(value) => { console.log(value) }}
                onClose={() => setNameShow(false)}>
                <input className={style.dialogInput} placeholder="请输入你的昵称" value={name} onChange={(e: any) => { setName(e.detail.value) }} />
            </Dialog>
            <Dialog
                id="vanDialog2"
                title="修改简介"
                showCancelButton
                confirmButtonOpenType="getUserInfo"
                show={introductionShow}
                onConfirm={(value) => { console.log(value) }}
                onClose={() => setIntroductionShow(false)}>
                <input className={style.dialogInput} placeholder="请输入你的介绍" value={introduction} onChange={(e: any) => { setIntroduction(e.detail.value) }} />
            </Dialog>
            <Cascader
                // scrollIntoView={false}
                childrenKey="children"
                visible={areaVisible}
                value={area}
                textKey="label"
                title="地址选择"
                options={regionData}
                closeable
                onClose={() => {
                    setAreaVisible(false)
                }}
                onChange={areaChange}
            />

            <div className={style.contain}>
                <div className={style.lines1}>
                    <div className={style.left1}>头像</div>
                    <div className={style.right1}>
                        <img className={style.headImg} src={images.testH1}></img>
                    </div>
                </div>
                <div className={style.lines}>
                    <div className={style.left}>昵称</div>

                    <div className={style.right} onClick={() => setNameShow(true)}>{name}&nbsp;{'>'}&nbsp;</div>
                </div>
                <div className={style.lines}>
                    <div className={style.left}>年级</div>
                    <div className={style.right} onClick={() => setYearShow(true)}>{year}年&nbsp;{'>'}&nbsp;</div>
                </div>
                <div className={style.lines}>
                    <div className={style.left}>性别</div>
                    <div className={style.right} onClick={() => setSexShow(true)}>{sex}&nbsp;{'>'}&nbsp;</div>
                </div>
                <div className={style.lines}>
                    <div className={style.left}>地区</div>
                    <div className={style.right} onClick={() => { setAreaVisible(true) }}>{areaTitle.length ? areaTitle.join('-') : '请选择地址'}&nbsp;{'>'}&nbsp;</div>
                </div>
                <div className={style.lines}>
                    <div className={style.left}>简介</div>
                    <div className={style.right} onClick={() => setIntroductionShow(true)}>{introduction}&nbsp;{'>'}&nbsp;</div>
                </div>
            </div>
            <div className={style.lines}>
                <Collapse value={"1"}>
                    <CollapseItem renderTitle={<div> 个人隐私<Icon name="question-o" /></div>} name="1">
                        <div className={style.collapseItems}>
                            <div className={style.collapseItem}>
                                <div className={style.left}>隐藏个人发帖信息</div>
                                <div className={style.right}>
                                    <Switch
                                        size="20px"
                                        activeColor="#8BD1AE"
                                        inactiveColor="#a5a5a5"
                                        checked={value1}
                                        onChange={(e) => setValue1(e.detail)} />
                                </div>
                            </div>
                            <div className={style.collapseItem}>
                                <div className={style.left}>禁止陌生人私聊</div>
                                <div className={style.right}>
                                    <Switch
                                        size="20px"
                                        activeColor="#8BD1AE"
                                        inactiveColor="#a5a5a5"
                                        checked={value2}
                                        onChange={(e) => setValue2(e.detail)} /></div>
                            </div>
                            <div className={style.collapseItem}>
                                <div className={style.left}>发帖时匿名</div>
                                <div className={style.right}>
                                    <Switch
                                        size="20px"
                                        activeColor="#8BD1AE"
                                        inactiveColor="#a5a5a5"
                                        checked={value3}
                                        onChange={(e) => setValue3(e.detail)} /></div>
                            </div>
                        </div>
                    </CollapseItem>
                    <CollapseItem renderTitle={<div> 账号</div>} name="2">
                        <div className={style.collapseItems}>
                            <div className={style.collapseItem}>
                                <div className={style.left}>修改密码</div>
                                <div className={style.right}>修改密码&nbsp;{'>'}&nbsp;</div>
                            </div>
                        </div>
                    </CollapseItem>
                    <CollapseItem renderTitle={<div> 隐私政策{"&&"}用户协议<Icon name="question-o" /></div>} name="3">
                        <div className={style.collapseItems}>
                            我们不会泄露你的任何信息，禁止黄赌毒一切非法内容......
                        </div>
                    </CollapseItem>
                </Collapse>

            </div>
        </div>
    )
}

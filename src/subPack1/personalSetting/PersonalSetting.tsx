import style from './PersonalSetting.module.scss'
import { ActionSheet, Button, Cascader, Collapse, CollapseItem, Dialog, Icon, Switch, Toast } from '@antmjs/vantui'
import { useEffect, useState } from 'react'
import { regionData, CodeToText } from 'element-china-area-data'
import TopMostTaroNavigationBar from '../../component/navigation/TopMostTaroNavigationBar'
import Taro from '@tarojs/taro'
import { useNavigate } from 'react-router-dom'
import netRequest from '../../http/http'
import re from '../../requestUrl'

export default function PersonalSetting() {

    const [nameShow, setNameShow] = useState(false)
    const [sexShow, setSexShow] = useState(false)
    const [yearShow, setYearShow] = useState(false)
    const [areaVisible, setAreaVisible] = useState(false)
    const [introductionShow, setIntroductionShow] = useState(false)
    const [value1, setValue1] = useState(false)
    const [value2, setValue2] = useState(false)
    const [value3, setValue3] = useState(false)
    const [nicknameLength, setNicknameLength] = useState(8)
    const [descriptionLength, setDescriptionLength] = useState(50)
    const [area, setArea] = useState([])
    const [randoms,setRandoms]=useState(Math.random())
    const navigate = useNavigate();
    const [user, setUser] = useState(
        {
            "avatar": "",
            "nickname": "", "grade": "", "sex": "男",
            "address": "", "description": "", "isInfo": "false"
        }
    )
    const [isRequestFinsh, setIsRequestFinsh] = useState(true)

    useEffect(() => {
        if (Taro.getStorageSync("user") != "") {
            let userTemp = JSON.parse(JSON.stringify(user));
            const useStore = Taro.getStorageSync("user")
            if (useStore.avatar != null)
                userTemp.avatar = useStore.avatar
            if (useStore.nickname != null)
                userTemp.nickname = useStore.nickname
            if (useStore.grade != null)
                userTemp.grade = useStore.grade
            if (useStore.sex != null)
                userTemp.sex = useStore.sex
            if (useStore.address != null)
                userTemp.address = useStore.address
            if (useStore.description != null)
                userTemp.description = useStore.description
            if (useStore.isInfo == false || useStore.isInfo == true)
                userTemp.isInfo = String(useStore.isInfo)
            setUser(userTemp)
            setValue1(useStore.isInfo)
        }
    }, [])

    const updateUser = (userInfo, id, bool) => {
        let userTemp = JSON.parse(JSON.stringify(user));
        switch (id) {
            case 'avatar': userTemp.avatar = userInfo;setRandoms(Math.random()); break;
            case 'nickname': userTemp.nickname = userInfo.substring(0, 8); setNicknameLength(8 - userInfo.length); break;
            case 'grade': userTemp.grade = userInfo; break;
            case 'sex': userTemp.sex = userInfo; break;
            case 'address': userTemp.address = [CodeToText[userInfo[0]], CodeToText[userInfo[1]], CodeToText[userInfo[2]]].join("-"); setArea(userInfo); break;
            case 'description': userTemp.description = userInfo.substring(0, 50); setDescriptionLength(50 - userInfo.length); break;
            case 'isInfo': userTemp.isInfo = String(userInfo); setValue1(userInfo); break;
        }
        setUser(userTemp)
        if (isRequestFinsh && bool) {
            if (id == 'address') {
                if (userInfo.length == 3) {
                    updateUserRequest(userTemp)
                }
            } else {
                updateUserRequest(userTemp)
            }
        }
    }

    const logout = () => {
        if (isRequestFinsh) {
            setIsRequestFinsh(false);
            netRequest({}, 'logout', 'POST', 1)
                .then(() => {
                    navigate('/login')
                    //清除所有缓存
                    Taro.getStorageInfo({
                        success: function (res) {
                            res.keys.forEach(element => {
                                Taro.removeStorageSync(element)
                            });
                        }
                    })
                    setIsRequestFinsh(true)
                })
                .catch(() => {
                    setIsRequestFinsh(true)
                })
        }
    }

    const updateUserRequest = (data) => {
        if (isRequestFinsh) {
            setIsRequestFinsh(false);
            netRequest(data, 'user', 'PUT', 1)
                .then((res) => {
                    Taro.setStorageSync("user", res.data.data)
                    setIsRequestFinsh(true)
                })
                .catch(() => {
                    setIsRequestFinsh(true)
                })
        }
    }

    //更换头像
    const  openImg=()=> {
        Taro.chooseImage({
            count: 1,
            success(ress) {
                Taro.showLoading({ title: '图片上传中...' })
                const tempFilePaths = ress.tempFilePaths
                console.log(ress.tempFilePaths[0])
                Taro.uploadFile({
                    url: re('chatUploadImg'),
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                        'imgUrlName': "userHead/" + "userId=" + Taro.getStorageSync("userId") + ".png"
                    },
                    success(res:any) {
                        Taro.hideLoading()
                        const returns=JSON.parse(res.data)
                        if(returns.hasOwnProperty("code")){
                            if(returns.code==200){
                                updateUser(returns.url,"avatar",true)
                                Toast.show("更换成功");
                            }
                        }
                    },
                    fail() {
                        Taro.hideLoading()
                        Toast.show("上传失败");
                    }
                })
            }
        })
    }

    const [sexActions] = useState([
        { name: '保密' },
        { name: '男' },
        { name: '女' },
        { name: '沃尔玛购物袋', subname: '如果你纠结于你的性别，那么这是一个完美的选择' },
    ])
    const [yearActions] = useState([
        { name: 2023 }, { name: 2022 }, { name: 2021 }, { name: 2020 }, { name: 2019 }, { name: 2018 }, { name: 2017 },
        { name: 2016 }, { name: 2015 }, { name: 2014 }, { name: 2013 }, { name: 2012 }, { name: 2011 }, { name: 2010 },
        { name: 2009 }, { name: 2008 }, { name: 2007 }, { name: 2006 }, { name: 2005 }, { name: 2004 }
    ])

    return (
        <div>
            <TopMostTaroNavigationBar needBackIcon={true} mainTitle={'个人设置'} />
            <Dialog
                id="vanDialog1"
                title="修改昵称"
                showCancelButton
                confirmButtonOpenType="getUserInfo"
                show={nameShow}
                onConfirm={() => { updateUserRequest(user) }}
                onClose={() => setNameShow(false)}>
                <div>
                    <input className={style.dialogInput} placeholder="请输入你的昵称"
                        maxLength={nicknameLength}
                        onInput={(e: any) => { updateUser(e.detail.value, "nickname", false) }} />
                    <div className={style.inputCount}>{8}/{user.nickname.length}</div>
                </div>
            </Dialog>
            <Dialog
                id="vanDialog2"
                title="修改简介"
                showCancelButton
                confirmButtonOpenType="getUserInfo"
                show={introductionShow}
                onConfirm={() => { updateUserRequest(user) }}
                onClose={() => setIntroductionShow(false)}>
                <div>
                    <textarea className={style.dialogInput} placeholder="请输入你的介绍"
                        maxLength={descriptionLength}
                        onInput={(e: any) => { updateUser(e.detail.value, "description", false) }} />
                    <div className={style.inputCount}>{50}/{user.description.length}</div>
                </div>
            </Dialog>
            <ActionSheet
                show={sexShow}
                actions={sexActions}
                description="请选择你的性别"
                onClose={() => { setSexShow(false) }}
                onSelect={(e) => { updateUser(e.detail.name, "sex", true) }}
            />
            <ActionSheet
                show={yearShow}
                actions={yearActions}
                description="请选择你的入学届数"
                onClose={() => { setYearShow(false) }}
                onSelect={(e) => { updateUser(e.detail.name, "grade", true) }}
            />

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
                onChange={(e) => { updateUser(e, "address", true) }}
            />
            <div className={style.contain}>
                <div className={style.lines1}>
                    <div className={style.left1}>头像</div>
                    <div className={style.right1} onClick={()=>openImg()}>
                        <img className={style.headImg} src={user.avatar != null ? user.avatar+ '?' + randoms : ""}></img>
                    </div>
                </div>
                <div className={style.lines} onClick={() => setNameShow(true)}>
                    <div className={style.left}>昵称</div>
                    <div className={style.right}>{user.nickname}&nbsp;{'>'}&nbsp;</div>
                </div>
                <div className={style.lines} onClick={() => setYearShow(true)}>
                    <div className={style.left}>年级</div>
                    <div className={style.right}>{user.grade}&nbsp;{'>'}&nbsp;</div>
                </div>
                <div className={style.lines} onClick={() => setSexShow(true)}>
                    <div className={style.left}>性别</div>
                    <div className={style.right}>{user.sex}&nbsp;{'>'}&nbsp;</div>
                </div>
                <div className={style.lines} onClick={() => { setAreaVisible(true) }}>
                    <div className={style.left}>地区</div>
                    <div className={style.right}>{user.address}&nbsp;{'>'}&nbsp;</div>
                </div>
                <div className={style.lines} onClick={() => setIntroductionShow(true)}>
                    <div className={style.left}>简介</div>
                    <div className={style.right}>{user.description}&nbsp;{'>'}&nbsp;</div>
                </div>
            </div>
            <div className={style.lines}>
                <Collapse value={"1"}>
                    <CollapseItem renderTitle={<div> 个人隐私<Icon name="question-o" /></div>} name="1">
                        <div className={style.collapseItems}>
                            <div className={style.collapseItem}>
                                <div className={style.left}>隐藏个人信息</div>
                                <div className={style.right}>
                                    <Switch
                                        size="20px"
                                        activeColor="#8BD1AE"
                                        inactiveColor="#a5a5a5"
                                        checked={value1}
                                        onChange={(e) => updateUser(e.detail, "isInfo", true)} />
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
                <Button className={style.loginButton} type="info" onClick={() => { logout() }}>退出登录</Button>
            </div>
            <Toast />
        </div>
    )
}


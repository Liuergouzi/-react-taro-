/**
 * 轮子哥
 * 全局列表数据管理
 */

import images from './resources'
const itemList = {
    Home_bottom_list: [
        { id: 1, name: "关注", path: "/home/type1" },
        { id: 2, name: "求助", path: "/home/type2" },
        { id: 3, name: "日常分享", path: "/home/type3" },
        { id: 4, name: "视频", path: "/home/type4" },
        { id: 5, name: "大歌手", path: "/home/type5" },
        { id: 6, name: "表白", path: "/home/type6" },
        { id: 7, name: "吐槽", path: "/home/type7" },
        { id: 8, name: "救命啊", path: "/home/type8" },
        { id: 9, name: "谁懂啊", path: "/home/type9" }
    ],
    Home_center_list: [
        { id: 1, name: "快递帮拿", url: images.expressDelivery },
        { id: 2, name: "快递帮拿", url: images.expressDelivery },
        { id: 3, name: "快递帮拿", url: images.expressDelivery },
        { id: 4, name: "快递帮拿", url: images.expressDelivery }
    ],
    Notice_List: [
        { head: images.sys_notice, name: "系统通知", message: "暂无相关信息", time: "公元前202年",redCount:0 },
        { head: images.interaction, name: "互动消息", message: "暂无相关信息", time: "公元前318年/3/5",redCount:0 },
        { head: images.friend, name: "新粉丝", message: "想什么呢，没人会关注你", time: "永乐22年",redCount:0 }
    ],
    My_head_buttom_list: [
        { id: 1, name: "关注", count: 0 },
        { id: 2, name: "粉丝", count: 9999 },
        { id: 3, name: "获赞", count: 8848 },
        { id: 4, name: "爱坤指数", count: "99999999+" }
    ],
    My_bottom_list: [
        {
            id: 1, type: 1, title: "我的发布",
            data: [
                { id: 1, name: "我的发布", url: images.announcement },
                { id: 2, name: "我的发布", url: images.announcement },
                { id: 3, name: "我的发布", url: images.announcement },
                { id: 4, name: "我的发布", url: images.announcement },
                { id: 5, name: "我的发布", url: images.announcement },
                { id: 6, name: "我的发布", url: images.announcement },
            ]
        },
        {
            id: 2, type: 2, title: "其它",
            data: [
                { id: 1, name: "我的发布", url: images.announcement },
                { id: 2, name: "我的发布", url: images.announcement },
                { id: 3, name: "我的发布", url: images.announcement },
                { id: 4, name: "我的发布", url: images.announcement },
                { id: 5, name: "我的发布", url: images.announcement },
                { id: 6, name: "我的发布", url: images.announcement },
            ]
        },
    ]

}

export default itemList

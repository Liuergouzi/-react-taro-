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
        { otherId: -27333, head: images.sys_notice, name: "系统通知", message: "暂无相关信息", time: "公元前202年", redCount: 0 },
        { otherId: -28333, head: images.interaction, name: "互动消息", message: "暂无相关信息", time: "公元前318年/3/5", redCount: 0 },
        { otherId: -29333, head: images.friend, name: "新粉丝", message: "想什么呢，没人会关注你", time: "永乐22年", redCount: 0 }
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
    ],
    SysNoticeList: [
        {
            id: -1, title: "轮子哥", time: "2023/4/8 20:00", content: "轮子哥测试，轮子哥测试，轮子哥好好测试，轮子哥测试，轮子哥测试，轮子哥测试，轮子哥测试，轮子哥测试，轮子哥测试，轮子哥测试轮子哥测试，轮子哥测试"
        }
    ],
    InteractionList: [
        {
            "_id": "-112",
            "receiveId": "1",
            "otherId": "-32823",
            "type": "love",
            "otherHead": "https://img1.baidu.com/it/u=822964690,2883123715&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
            "otherName": "天下轮子唯我坤坤",
            "title": "lunzi哥",
            "time": "2023-03-29:17:46",
            "content": "点赞实ll哈哈的侧测试s"
        },
        {
            "_id": "-112",
            "receiveId": "1",
            "otherId": "-32823",
            "type": "comment",
            "otherHead": "https://img1.baidu.com/it/u=822964690,2883123715&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
            "otherName": "最好的轮子",
            "title": "lunzi哥",
            "time": "2023-03-29:17:46",
            "content": "评论测试ll哈哈的侧测试s"
        }
    ]

}

export default itemList

/**
 * 轮子哥
 * 全局列表数据管理
 */

import images from './resources'
const itemList = {
  Home_bottom_list: [
    { id: 1, name: "日常分享", path: "/home/type1" },
    { id: 2, name: "求助", path: "/home/type2" },
    { id: 3, name: "快递跑腿", path: "/home/type3" },
    { id: 4, name: "视频", path: "/home/type4" },
    { id: 5, name: "大歌手", path: "/home/type5" },
    { id: 6, name: "表白", path: "/home/type6" },
    { id: 7, name: "吐槽", path: "/home/type7" },
    // { id: 8, name: "救命啊", path: "/home/type8" },
    // { id: 9, name: "谁懂啊", path: "/home/type9" }
  ],
  Home_center_list: [
    { id: 1, name: "快递帮拿", url: images.expressDelivery },
    { id: 2, name: "后续更新", url: images.expressDelivery },
    { id: 3, name: "快递帮拿", url: images.expressDelivery },
    { id: 4, name: "后续更新", url: images.expressDelivery }
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
    { id: 4, name: "帖子", count: "99999999+" }
  ],
  My_bottom_list_left: [
    { id: 1, title: "发布", url: images.myArticle },
    { id: 2, title: "点赞", url: images.myLove },
    { id: 3, title: "评论", url: images.myComment }
  ],
  My_bottom_list_right: [
    { id: 1, title: "关注", url: images.myFollow },
    { id: 2, title: "粉丝", url: images.myFans }
  ],
  My_bottom_list: [
    {
      id: 1, type: 1, title: "其它",
      data: [
        { id: 1, name: "申请认证", url: images.announcement },
        { id: 2, name: "联系客服", url: images.announcement },
        { id: 3, name: "留言反馈", url: images.announcement },
        { id: 4, name: "我的举报", url: images.announcement },
        { id: 5, name: "浏览历史", url: images.announcement },
        { id: 6, name: "使用须知", url: images.announcement },
      ]
    },
    {
      id: 2, type: 2, title: "其它的",
      data: [
        { id: 1, name: "我再想想", url: images.other },
        { id: 2, name: "容我想想", url: images.other },
        { id: 3, name: "再想一想", url: images.other },
      ]
    },
  ],
  SysNoticeList: [
    {
      id: -1, title: "轮子哥", time: "2023/4/8 20:00", content: "轮子哥测试，轮子哥测试，轮子哥好好测试，轮子哥测试，轮子哥测试，轮子哥测试，轮子哥测试，轮子哥测试，轮子哥测试，轮子哥测试轮子哥测试，轮子哥测试"
    }
  ],
  articleDeatilInit: {
    "id": "",
    "userId": "",
    "name": "",
    "head": "",
    "title": "",
    "content": "",
    "time": "",
    "state": 0,
    "loveCount": 0,
    "commentCount": 0,
    "shareCount": 0,
    "type": "",
    "imageList": []
  },
  InteractionList: [
    {
      "id": "-112",
      "receiveId": "1",
      "otherId": "-32823",
      "type": "love",
      "otherHead": "https://img1.baidu.com/it/u=3101011520,1386319874&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=500",
      "otherName": "好轮子测试1",
      "title": "lunzi哥",
      "time": "2023/03/29 17:46",
      "content": "点赞测试:小黑子赞了你"
    },
    {
      "id": "-112",
      "receiveId": "1",
      "otherId": "-32823",
      "type": "comment",
      "otherHead": "https://img2.baidu.com/it/u=3104826290,3642077997&fm=253&fmt=auto&app=120&f=JPEG?w=720&h=450",
      "otherName": "好轮子测试2",
      "title": "lunzi哥",
      "time": "1089/03/27 17:46",
      "content": "评论测试：测试",
      "contentType": "text"
    },
    {
      "id": "-11212",
      "receiveId": "1",
      "otherId": "-3282323",
      "type": "replay",
      "otherHead": "http://t15.baidu.com/it/u=3091143640,3588711309&fm=224&app=112&f=JPEG?w=500&h=500",
      "otherName": "好轮子测试3",
      "title": "lunzi哥",
      "time": "2023/03/26 17:46",
      "content": "https://img2.baidu.com/it/u=2921273524,629295701&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=500",
      "contentType": "image"
    }
  ],
  NewFriendList: [
    {
      "receiveId": "1",
      "otherId": "-212323",
      "type": "follow",
      "otherHead": "https://img0.baidu.com/it/u=464957137,1127465915&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667",
      "otherName": "好轮子测试",
      "title": "轮子测试",
      "time": "2023/04/11 11:14",
      "content": "轮子测试关注了你"
    },
  ],
  personalDetailsTabList: [
    { id: 1, title: "帖子", name: "1" },
    { id: 2, title: "闲置", name: "2" },
    { id: 3, title: "求助", name: "3" },
    { id: 4, title: "评论", name: "4" }
  ],
  articleAttribute: [
    { id: 1, image: images.love_2, name: "点赞" },
    { id: 2, image: images.comment, name: "评论" },
    { id: 3, image: images.share, name: "转发" }
  ]
}

export default itemList
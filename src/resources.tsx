/**
 * 轮子哥
 * 全局静态资源管理
 */

const images = {
    test : 'https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/test.png',
    testH1 : 'https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/testH1.png',
    testH2 : 'https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/testH2.png',
    home_1 : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/home_1.svg",
    home_2 : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/home_2.svg",
    classify_1 : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/classify_1.svg",
    classify_2 : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/classify_2.svg",
    push_1 : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/push_1.svg",
    push_2 : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/push_2.svg",
    notice_1 : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/notice_1.svg",
    notice_2 : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/notice_2.svg",
    my_1 : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/my_1.svg",
    my_2 : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/my_2.svg",
    add:"https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/add.png",
    back : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/back.png",
    announcement : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/announcement.svg",
    expressDelivery : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/expressDelivery.svg",
    sell_bg : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/sell_bg.svg",
    lost_bg : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/lost_bg.svg",
    f404_bg : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/f404_bg.svg",
    boy : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/boy.svg",
    girl : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/girl.svg",
    more : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/more.svg",
    love_1 : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/love_1.svg",
    love_2 : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/love_2.svg",
    comment : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/comment.svg",
    sys_notice : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/sys_notice.svg",
    qq : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/qq.png",
    wx : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/wx.png",
    close : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/close.png",
    emote : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/emote.png",
    picture : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/picture.png",
    friend : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/friend.png",
    interaction : "https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/interaction.png",
    address:"https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/address.png",
    search:"https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/search.png",
    goTop:"https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/goTop.png",
    share:"https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/share.png",
    boyHead:"https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/boyHead.png",
    girlHead:"https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/girlHead.png",
    row:"https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/row.png",
    myArticle:"https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/myArticle.png",
    myLove:"https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/myLove.png",
    myComment:"https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/myComment.png",
    myFollow:"https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/myFollow.png",
    myFans:"https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/myFans.png",
    other:"https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/other.png",
    interactionLove:"https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/interactionLove.png",
    interactionComment:"https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/interactionComment.png",
    interactionReplay:"https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/interactionReplay.png",
    legwork1:"https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/legwork1.png",
    legwork2:"https://gykxytimage.oss-cn-heyuan.aliyuncs.com/gyk/public/images/legwork2.png"
}

export default images

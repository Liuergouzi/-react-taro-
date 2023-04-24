/**
 * 轮子哥
 * 全局网络路径管理
 */
const baseChat = 'http://localhost:9090/ws/'
const baseMoveMent = 'http://localhost:9999'
const baseUser = 'http://47.115.202.73:9999/user/'

const re = (url) => {
    var returnUrl = ''
    switch (url) {
        //消息模块
        case "chatWebSocket": returnUrl = 'ws://localhost:9090/ws/WebSocket/'; break;
        case "chatInsert": returnUrl = baseChat + 'insertMessage'; break;
        case "chatUploadImg": returnUrl = baseChat + 'saveImg'; break;
        case "getChatList": returnUrl = baseChat + 'getChatList2'; break;
        case "redReset": returnUrl = baseChat + 'redReset'; break;
        case "getMessage": returnUrl = baseChat + 'getMessage'; break;
        case "getSysNotice": returnUrl = baseChat + 'getSystemNoticeUserAll'; break;
        case "getInteraction": returnUrl = baseChat + 'getInteraction'; break;
        case "getInteractionAll": returnUrl = baseChat + 'getInteractionAll'; break;
        case "getNoticeMonById": returnUrl = baseChat + 'getNoticeMonById'; break;
        case "updateMonRedCount": returnUrl = baseChat + 'updateMonRedCount'; break;
        //帖子模块
        case "getArticleDislayListAll": returnUrl = baseMoveMent + '/movement/getArticleDislayListAll'; break;
        case "loveArticleDislay": returnUrl = baseMoveMent + '/movement/loveArticleDislay'; break;
        //用户模块
        case "login": returnUrl = baseUser + 'login'; break;
        case "regist": returnUrl = baseUser + 'regist'; break;
        case "info": returnUrl = baseUser + 'info'; break;
        case "user": returnUrl = baseUser; break;
        case "logout": returnUrl = baseUser + 'logout'; break;
    }
    return returnUrl;
}

export default re

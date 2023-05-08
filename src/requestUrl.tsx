/**
 * 轮子哥
 * 全局网络路径管理
 */
const baseUser = 'http://localhost:9090/user/'
const baseChat = 'http://localhost:9090/ws/'
const baseMoveMent = 'http://localhost:9090/movement/'

const re = (url) => {
    var returnUrl = ''
    switch (url) {
        //消息模块
        case "chatWebSocket": returnUrl = 'ws://localhost:9092/ws/WebSocket/'; break;
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
        case "getAnnouncement": returnUrl = baseChat + 'getAnnouncement'; break;
        case "textCheck" : returnUrl = baseChat + 'textCheck'; break;
        case "imageCheck" :returnUrl = baseChat + 'imageCheck'; break;
        case "saveImg" :returnUrl = baseChat + 'saveImg'; break;
        case "updateUser":returnUrl = baseChat + 'updateUser'; break;
        //帖子模块
        case "insertArticleDisplayList": returnUrl = baseMoveMent + 'insertArticleDisplayList'; break;
        case "getArticleDisplayListAll": returnUrl = baseMoveMent + 'getArticleDisplayListAll'; break;
        case "getArticleDisplayListById": returnUrl = baseMoveMent + 'getArticleDisplayListById'; break;
        case "loveArticleDisplayList": returnUrl = baseMoveMent + 'loveArticleDisplayList'; break;
        case "cancelLoveArticleDisplayList": returnUrl = baseMoveMent + 'cancelLoveArticleDisplayList'; break;
        case "insertArticleComment": returnUrl = baseMoveMent + 'insertArticleComment'; break;
        case "replyArticleComment": returnUrl = baseMoveMent + 'replyArticleComment'; break;
        case "getArticleCommentAll": returnUrl = baseMoveMent + 'getArticleCommentAll'; break;
        case "getSubCommentList": returnUrl = baseMoveMent + 'getSubCommentList'; break;
        case "deleteArticleComment": returnUrl = baseMoveMent + 'deleteArticleComment'; break;
        case "loveArticleComment": returnUrl = baseMoveMent + 'loveArticleComment'; break;
        case "cancelLoveArticleComment": returnUrl = baseMoveMent + 'cancelLoveArticleComment'; break;
        case "getArticleTotal": returnUrl = baseMoveMent + 'getArticleTotal'; break;
        case "updateArticleDisplayList": returnUrl = baseMoveMent + 'updateArticleDisplayList'; break;
        case "deleteArticleDisplayList": returnUrl = baseMoveMent + 'deleteArticleDisplayList'; break;
        case "searchArticleDisplay": returnUrl = baseMoveMent + 'searchArticleDisplay'; break;
        case "getArticleDisplayListLove": returnUrl = baseMoveMent + 'getArticleDisplayListLove'; break;
        case "getArticleCommentByUser": returnUrl = baseMoveMent + 'getArticleCommentByUser'; break;
        case "getArticleDisplayListByMainId":returnUrl = baseMoveMent + 'getArticleDisplayListByMainId'; break;
        //用户模块
        case "login": returnUrl = baseUser + 'login'; break;
        case "regist": returnUrl = baseUser + 'regist'; break;
        case "info": returnUrl = baseUser + 'info'; break;
        case "user": returnUrl = baseUser; break;
        case "logout": returnUrl = baseUser + 'logout'; break;
        case "getFollow":returnUrl=baseUser+'getFollow';break;
        case "getFans":returnUrl=baseUser+'getFans';break;
        case "follow":returnUrl=baseUser+'follow';break;
    }
    return returnUrl;
}

export default re

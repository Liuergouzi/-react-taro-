/**
 * 轮子哥
 * 全局网络路径管理
 */
const host = 'https://ctrlc.cc'
// const local ='http://localhost:9094/'
const hostWs = 'wss://ctrlc.cc'

const baseUser = host + '/gyt_service/user/'
const baseChat = host + '/gyt_service/ws/'
const baseMoveMent = host + '/gyt_service/movement/'
const baseLegwork =host + '/gyt_service/legwork/'
const baseWs = hostWs + '/gyt_service/ws/WebSocket/'
//"ws://localhost:9090/ws/WebSocket/11"
const re = (url) => {
    var returnUrl = ''
    switch (url) {
        //消息模块
        case "chatWebSocket": returnUrl = baseWs; break;
        case "chatInsert": returnUrl = baseChat + 'insertMessage'; break;
        case "chatUploadImg": returnUrl = baseChat + 'saveImg'; break;
        case "getChatList": returnUrl = baseChat + 'getChatList2'; break;
        case "redReset": returnUrl = baseChat + 'redReset'; break;
        case "getMessage": returnUrl = baseChat + 'getMessage'; break;
        case "getSysNotice": returnUrl = baseChat + 'getSystemNoticeUserAll'; break;
        case "getInteraction": returnUrl = baseChat + 'getInteraction'; break;
        case "getInteractionAll": returnUrl = baseChat + 'getInteractionAll'; break;
        case "updateMonRedCount": returnUrl = baseChat + 'updateMonRedCount'; break;
        case "getAnnouncement": returnUrl = baseChat + 'getAnnouncement'; break;
        case "textCheck": returnUrl = baseChat + 'textCheck'; break;
        case "imageCheck": returnUrl = baseChat + 'imageCheck'; break;
        case "saveImg": returnUrl = baseChat + 'saveImg'; break;
        //订单
        case "insertLegwork":returnUrl=baseLegwork+'insertLegwork';break;
        case "getLegworkListById":returnUrl=baseLegwork+'getLegworkListById';break;
        case "myReceiveLegwork":returnUrl=baseLegwork+'myReceiveLegwork';break;
        case "getLegworkListAll":returnUrl=baseLegwork+'getLegworkListAll';break;
        case "deleteLegwork":returnUrl=baseLegwork+'deleteLegwork';break;   //###
        case "joinLegwork":returnUrl=baseLegwork+'joinLegwork';break;
        case "applyLegwork":returnUrl=baseLegwork+'applyLegwork';break;
        case "refuseLegwork":returnUrl=baseLegwork+'refuseLegwork';break;
        //帖子模块
        case "insertArticleDisplayList": returnUrl = baseMoveMent + 'insertArticleDisplayList'; break;
        case "updateArticleDisplayList": returnUrl = baseMoveMent + 'updateArticleDisplayList'; break;
        case "getArticleDisplayListAll": returnUrl = baseMoveMent + 'getArticleDisplayListAll'; break;
        case "getArticleDisplayListById": returnUrl = baseMoveMent + 'getArticleDisplayListById'; break;
        case "loveArticleDisplayList": returnUrl = baseMoveMent + 'loveArticleDisplayList'; break;  //###
        case "cancelLoveArticleDisplayList": returnUrl = baseMoveMent + 'cancelLoveArticleDisplayList'; break;
        case "insertArticleComment": returnUrl = baseMoveMent + 'insertArticleComment'; break;
        case "replyArticleComment": returnUrl = baseMoveMent + 'replyArticleComment'; break;
        case "getArticleCommentAll": returnUrl = baseMoveMent + 'getArticleCommentAll'; break;
        case "getSubCommentList": returnUrl = baseMoveMent + 'getSubCommentList'; break;
        case "deleteArticleComment": returnUrl = baseMoveMent + 'deleteArticleComment'; break;      //###
        case "loveArticleComment": returnUrl = baseMoveMent + 'loveArticleComment'; break;              //###
        case "cancelLoveArticleComment": returnUrl = baseMoveMent + 'cancelLoveArticleComment'; break;   //###
        case "getArticleTotal": returnUrl = baseMoveMent + 'getArticleTotal'; break;
        case "deleteArticleDisplayList": returnUrl = baseMoveMent + 'deleteArticleDisplayList'; break;
        case "searchArticleDisplay": returnUrl = baseMoveMent + 'searchArticleDisplay'; break;
        case "getArticleDisplayListLove": returnUrl = baseMoveMent + 'getArticleDisplayListLove'; break;
        case "getArticleCommentByUser": returnUrl = baseMoveMent + 'getArticleCommentByUser'; break;
        case "getArticleDisplayListByMainId": returnUrl = baseMoveMent + 'getArticleDisplayListByMainId'; break;
        //用户模块
        case "login": returnUrl = baseUser + 'login'; break;
        case "regist": returnUrl = baseUser + 'regist'; break;
        case "info": returnUrl = baseUser + 'info'; break;
        case "user": returnUrl = baseUser; break;
        case "logout": returnUrl = baseUser + 'logout'; break;
        case "getFollow": returnUrl = baseUser + 'getFollow'; break;
        case "getFans": returnUrl = baseUser + 'getFans'; break;
        case "follow": returnUrl = baseUser + 'follow'; break;
    }
    return returnUrl;
}

export default re

/**
 * 轮子哥
 * 全局网络路径管理
 */
const baseUrl='http://localhost:9090'

 const reUrl = {
     chatWebSocket: 'ws://localhost:9090/ws/WebSocket/',
     chatInsert:baseUrl+'/ws/insertMessage',
     chatUploadImg:baseUrl+'/ws/sendImg',
     getChatList:baseUrl+'/ws/getChatList2',
     redReset:baseUrl+'/ws/redReset',
     getMessage:baseUrl+'/ws/getMessage',
     getSysNotice:baseUrl+'/ws/getSystemNoticeUserAll',
     getInteraction:baseUrl+'/ws/getInteraction',
     getInteractionAll:baseUrl+'/ws/getInteractionAll',
     getNoticeMonById:baseUrl+'/ws/getNoticeMonById',
     updateMonRedCount:baseUrl+'/ws/updateMonRedCount'
 }
 
 export default reUrl
 
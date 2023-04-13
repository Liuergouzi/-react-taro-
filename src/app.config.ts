export default defineAppConfig({
  pages: [
    // 'view/personaldetails/PersonalDetails'
    'router/routerView',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  // "subpackages": [
  //   // {
  //   //   "root": "view",
  //   //   "pages": [
  //   //     // "/chat/Chat",
  //   //     // "/sysnotice/SysNotice",
  //   //     // "/interaction/Interaction",
  //   //     // "/newfriend/NewFriend",
  //   //   ]
  //   // }, 
  //   {
  //     "root": "view",
  //     "pages": [
  //       "/personaldetails/PersonalDetails",
  //       "/personalSetting/PersonalSetting"
  //     ],
  //   }
  // ]
})

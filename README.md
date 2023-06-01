#基于react+taro开发的校园论坛服务，目前适配微信小程序，h5尚存在一些适配问题

-------------------------------------------------------------------------------------------------
 * 1.实现功能：
	+   --帖子发布、点赞、评论--
	+   --查看我的帖子发布、点赞、评论--
	+   --订单跑腿发布、抢单申请、同意&拒绝--
	+   --查看我的订单发布、已抢订单--
	+   --图片、文字输入安全校验--
	+   --用户个人信息修改、隐私设置--
	+   --消息实时聊天、历史消息加载--
	+   --全局点赞、评论、抢单等消息监听并显示红点--	
	+   --搜索--	
	+   --更多功能细节自己去探究~--	
 * 2.主要使用到的技术&&依赖：  
	+   --react-redux@8，状态管理，切片版本
	+   --react-router-dom@6 ，路由管理，使用统一配置文件配置路由
	+   --vantui@3，官网地址：https://antm-js.gitee.io/vantui/main/#/home
	+   --原始html语法，使用scss+ts，大部分都是使用函数式组件，部分涉及taro适配后的微信小程序api 
 * 3.一些说明：	
	+   --更多功能不一一累赘了，自己看--
	+   --这个是前端，后端因为含有账号密码配置的记录后续会公开，后端采用微服务	
-------------------------------------------------------------------------------------------------


-------------------------------------------------------------------------------------------------
 * 2.部分实现截图预览;  
![1](https://47image.oss-cn-heyuan.aliyuncs.com/github/TaroGyk/1.png)

![2](https://47image.oss-cn-heyuan.aliyuncs.com/github/TaroGyk/2.png)

![3](https://47image.oss-cn-heyuan.aliyuncs.com/github/TaroGyk/3.png)

![4](https://47image.oss-cn-heyuan.aliyuncs.com/github/TaroGyk/4.png)

![5](https://47image.oss-cn-heyuan.aliyuncs.com/github/TaroGyk/5.png)

![5](https://47image.oss-cn-heyuan.aliyuncs.com/github/TaroGyk/6.png)

![5](https://47image.oss-cn-heyuan.aliyuncs.com/github/TaroGyk/7.png)

![5](https://47image.oss-cn-heyuan.aliyuncs.com/github/TaroGyk/8.png)

-------------------------------------------------------------------------------------------------


-------------------------------------------------------------------------------------------------
 * 3.本地部署说明：  
	+	环境说明：使用的是Taro+React框架，React版本为18，React Router版本为6。node环境版本最低为16，如果依赖安装好之后编译失败请用指定的node版本：v16.13.2。webpack版本为5.78.0，Taro版本为：v3.6.5-alpha.2，非必要情况下不要修改webpack及Taro版本，可能会发生不可预料的错误。
	+	（1）cd进入文件夹
	+	（2）cd 进入主文件
	+	（3）微信小程序运行编译：npm run dev:weapp
	+	（4）微信小程序打包编译：npm run build:weapp
	+	（5）H5端运行编译：npm run dev:h5
	+	（6）H5端打包编译：npm run build:h5

-------------------------------------------------------------------------------------------------


import Taro from '@tarojs/taro';
import { useSelector } from 'react-redux';
import time from '../../tool/time';
import LoadMore from '../../component/loadmore/LoadMore'
import style from './MyCommentLoadMore.module.scss'
import images from '../../resources';
import { useNavigate } from 'react-router-dom';

export default function MyCommentLoadMore() {

  const myCommentList: any = useSelector((state: any) => state.MyComment_Reducer.myCommentList)
  const pageIndex: number = useSelector((state: any) => state.MyComment_Reducer.pageIndex);
  const user = Taro.getStorageSync("user")
  const pageSize = 15;
  const navigate = useNavigate();

  const getTime = (t) => {
    var nowTime = time;
    var year1 = parseInt(nowTime.split(" ")[0].split("/")[0])
    var month1 = parseInt(nowTime.split(" ")[0].split("/")[1])
    var day1 = parseInt(nowTime.split(" ")[0].split("/")[2])
    var hour1 = parseInt(nowTime.split(" ")[1].split(":")[0])
    var minute1 = parseInt(nowTime.split(" ")[1].split(":")[1])

    var year2 = parseInt(t.split(" ")[0].split("/")[0])
    var month2 = parseInt(t.split(" ")[0].split("/")[1])
    var day2 = parseInt(t.split(" ")[0].split("/")[2])
    var hour2 = parseInt(t.split(" ")[1].split(":")[0])
    var minute2 = parseInt(t.split(" ")[1].split(":")[1])

    if (year1 - year2 != 0) { return "前" + (year1 - year2) + "年" }
    if (month1 - month2 != 0) { return "前" + (month1 - month2) + "月" }
    if (day1 - day2 != 0) { return "前" + (day1 - day2) + "天" }
    if (hour1 - hour2 != 0) { return "前" + (hour1 - hour2) + "小时" }
    if (minute1 - minute2 != 0) { return "前" + (minute1 - minute2) + "分钟" }
  }

  const goTo = (item) => {
    Taro.setStorageSync("articleDetailDataId", item.movementId)
    navigate("/articleDetail")
  }

  return (
    <div className={style.newFriend}>

      <LoadMore
        requesUrl={'getArticleCommentByUser'}
        viewId={'MyComment'}
        ListCount={myCommentList.length}
        defaultListCount={0}
        requestData={{
          userId: Taro.getStorageSync("userId"),
          pageIndex: pageIndex,
          pageSize: pageSize
        }}>

        {
          myCommentList.map((item,index) => (
            <div key={index} className={style.contain} onClick={() => { goTo(item) }}>
              <div className={style.left}>
                <img className={style.leftImg} src={user.avatar != null ? user.avatar : images.boyHead}></img>
              </div>
              <div className={style.center}>
                <div className={style.name}>{user.nickname != null ? user.nickname : "我"}</div>
                <div className={style.content}><div className={style.time}>{getTime(item.time)}&ensp;</div></div>
              </div>
              <div className={style.centerLeft}>
                {
                  item.type == 'text' ?
                      item.comment
                    :
                    <img className={style.leftMinImg} src={item.comment}></img>
                }
              </div>
              <div className={style.right}>
                <img className={style.rightImg} src={images.row}></img>
              </div>
            </div>
          ))
        }
      </LoadMore>
    </div>
  )
}

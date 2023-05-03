import { Toast, Uploader } from '@antmjs/vantui'
import Taro from '@tarojs/taro'
import { useDispatch, useSelector } from 'react-redux'
import re from '../../requestUrl'
import time2 from '../../tool/time2'
import { setImageList, setImageListAll } from '../../sclice/Push_Sclice'
/**
 * 轮子哥
 * 图片上传组件
 */
export default function Push_UploadImg() {
  const value = useSelector((state: any) => state.Push_Sclice.imageList.thisList)
  const dispatch: any = useDispatch()
  console.log(value)
  const afterRead = (event) => {
    const { file } = event.detail
    // 上传
    upLoadImg(file)
  }

  const deleteAction = (event) => {
    const { index } = event.detail
    const valueNew = JSON.parse(JSON.stringify(value))
    valueNew.splice(index, 1)
    let upListNew: any = []
    valueNew.forEach(element => {
      upListNew = [...upListNew, element.url]
    });
    dispatch(setImageListAll({ upList: upListNew, thisList: valueNew }))
  }

  const upLoadImg = async (file: any) => {
    const imageLen = file.length
    for (var i = 1; i <= imageLen; i++) {
      Taro.showLoading({ title: '正在上传第' + i + '张图片中...' })
      await Taro.uploadFile({
        url: re('chatUploadImg'),
        filePath: file[i - 1].url,
        name: 'file',
        formData: {
          'imgUrlName': "movement/" + "userId=" + Taro.getStorageSync("userId") + "/" + "image" + i + "-" + time2 + ".png"
        },
        success(res: any) {
          const returns = JSON.parse(res.data)
          var isOk = false
          if (returns.hasOwnProperty("code")) {
            if (returns.code == 200) {
              isOk = true
              dispatch(setImageList({ upList: returns.url, thisList: { url: returns.url } }))
            }
          }
          if (!isOk) {
            i = 99
            Toast.show("网络异常");
          }
          Taro.hideLoading()
        },
        fail() {
          Taro.hideLoading()
          Toast.show("上传失败");
        }
      })
    }
  }

  return (
    <Uploader
      fileList={value}
      multiple={true}
      onAfterRead={afterRead}
      onDelete={deleteAction}
      maxCount={8}
      style={{ marginLeft: '15px' }}
      deletable
    />
  )
}
